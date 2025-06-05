import { useState, useEffect, useCallback } from 'react';
      import { motion, AnimatePresence } from 'framer-motion';
      import { toast } from 'react-toastify';
      import Icon from '@/components/atoms/Icon';
      import Text from '@/components/atoms/Text';
      import Title from '@/components/atoms/Title';
      import Button from '@/components/atoms/Button';
      import SudokuGrid from '@/components/molecules/SudokuGrid';
      import GameControls from '@/components/organisms/GameControls';
      import NumberInputPanel from '@/components/organisms/NumberInputPanel';
      import puzzleService from '@/services/api/puzzleService';

      const PuzzleGame = () => {
        const [puzzle, setPuzzle] = useState(null);
        const [grid, setGrid] = useState(Array(9).fill().map(() => Array(9).fill(null)));
        const [selectedCell, setSelectedCell] = useState(null);
        const [difficulty, setDifficulty] = useState('easy');
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);
        const [timer, setTimer] = useState(0);
        const [isRunning, setIsRunning] = useState(false);
        const [isPaused, setIsPaused] = useState(false);
        const [hintsUsed, setHintsUsed] = useState(0);
        const [maxHints] = useState(3);
        const [gameState, setGameState] = useState('playing'); // playing, completed
        const [errors, setErrors] = useState(new Set());
        const [animatingCells, setAnimatingCells] = useState(new Set());
        const [showCompletion, setShowCompletion] = useState(false);

        // Timer effect
        useEffect(() => {
          let interval = null;
          if (isRunning && !isPaused) {
            interval = setInterval(() => {
              setTimer(prev => prev + 1);
            }, 1000);
          }
          return () => clearInterval(interval);
        }, [isRunning, isPaused]);

        // Load initial puzzle
        useEffect(() => {
          loadNewPuzzle();
        }, [difficulty]);

        const formatTime = (seconds) => {
          const mins = Math.floor(seconds / 60);
          const secs = seconds % 60;
          return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        };

        const validateMove = (row, col, value) => {
          if (!puzzle) return true;

          // Check row
          for (let c = 0; c < 9; c++) {
            if (c !== col && grid[row][c] === value) return false;
          }

          // Check column
          for (let r = 0; r < 9; r++) {
            if (r !== row && grid[r][col] === value) return false;
          }

          // Check 3x3 box
          const boxRow = Math.floor(row / 3) * 3;
          const boxCol = Math.floor(col / 3) * 3;
          for (let r = boxRow; r < boxRow + 3; r++) {
            for (let c = boxCol; c < boxCol + 3; c++) {
              if ((r !== row || c !== col) && grid[r][c] === value) return false;
            }
          }

          return true;
        };

        const loadNewPuzzle = async () => {
          setLoading(true);
          setError(null);
          try {
            const newPuzzle = await puzzleService.generatePuzzle(difficulty);
            setPuzzle(newPuzzle);
            setGrid(newPuzzle.grid.map(row => [...row]));
            setSelectedCell(null);
            setTimer(0);
            setIsRunning(true);
            setIsPaused(false);
            setHintsUsed(0);
            setGameState('playing');
            setErrors(new Set());
            setAnimatingCells(new Set());
            setShowCompletion(false);
          } catch (err) {
            setError(err.message);
            toast.error("Failed to load puzzle");
          } finally {
            setLoading(false);
          }
        };

        const handleCellClick = (row, col) => {
          if (!puzzle || gameState === 'completed') return;
          if (puzzle.grid[row][col] !== null) return; // Can't select given cells

          setSelectedCell({ row, col });
        };

        const handleNumberInput = (number) => {
          if (!selectedCell || !puzzle || gameState === 'completed') return;
          
          const { row, col } = selectedCell;
          if (puzzle.grid[row][col] !== null) return; // Can't modify given cells

          const newGrid = grid.map(r => [...r]);
          const currentValue = newGrid[row][col];
          
          // If same number, clear the cell
          if (currentValue === number) {
            newGrid[row][col] = null;
          } else {
            newGrid[row][col] = number;
          }

          // Animate cell
          setAnimatingCells(prev => new Set(prev).add(`${row}-${col}`));
          setTimeout(() => {
            setAnimatingCells(prev => {
              const newSet = new Set(prev);
              newSet.delete(`${row}-${col}`);
              return newSet;
            });
          }, 200);

          // Validate move and update errors
          const newErrors = new Set();
          if (newGrid[row][col] !== null && !validateMove(row, col, newGrid[row][col])) {
            newErrors.add(`${row}-${col}`);
            // Add shake animation
            setTimeout(() => {
              const cell = document.querySelector(`[data-cell="${row}-${col}"]`);
              if (cell) cell.classList.add('shake');
              setTimeout(() => cell?.classList.remove('shake'), 300);
            }, 50);
          }

          setGrid(newGrid);
          setErrors(newErrors);

          // Check for completion
          checkCompletion(newGrid);
        };

        const checkCompletion = (currentGrid) => {
          if (!puzzle) return;

          // Check if grid is completely filled
          const isFilled = currentGrid.every(row => row.every(cell => cell !== null));
          if (!isFilled) return;

          // Check if solution is correct
          const isCorrect = currentGrid.every((row, r) => 
            row.every((cell, c) => cell === puzzle.solution[r][c])
          );

          if (isCorrect) {
            setGameState('completed');
            setIsRunning(false);
            setShowCompletion(true);
            toast.success(`Puzzle completed in ${formatTime(timer)}!`);
          }
        };

        const handleClearCell = () => {
          if (!selectedCell || !puzzle || gameState === 'completed') return;
          
          const { row, col } = selectedCell;
          if (puzzle.grid[row][col] !== null) return;

          const newGrid = grid.map(r => [...r]);
          newGrid[row][col] = null;
          setGrid(newGrid);
          
          // Remove from errors
          setErrors(prev => {
            const newSet = new Set(prev);
            newSet.delete(`${row}-${col}`);
            return newSet;
          });
        };

        const handleHint = () => {
          if (!puzzle || !selectedCell || hintsUsed >= maxHints || gameState === 'completed') return;

          const { row, col } = selectedCell;
          if (puzzle.grid[row][col] !== null) return; // Can't hint given cells

          const newGrid = grid.map(r => [...r]);
          newGrid[row][col] = puzzle.solution[row][col];
          setGrid(newGrid);
          setHintsUsed(prev => prev + 1);

          // Add hint glow animation
          const cell = document.querySelector(`[data-cell="${row}-${col}"]`);
          if (cell) {
            cell.classList.add('hint-glow');
            setTimeout(() => cell?.classList.remove('hint-glow'), 600);
          }

          // Remove from errors
          setErrors(prev => {
            const newSet = new Set(prev);
            newSet.delete(`${row}-${col}`);
            return newSet;
          });

          checkCompletion(newGrid);
          toast.info("Hint used!");
        };

        const togglePause = () => {
          setIsPaused(prev => !prev);
        };

        const getNumberCount = (number) => {
          if (!puzzle) return 0;
          let count = 0;
          grid.forEach(row => {
            row.forEach(cell => {
              if (cell === number) count++;
            });
          });
          return count;
        };

        const getCellClassName = useCallback((row, col) => {
          let className = "w-12 h-12 border border-gray-300 flex items-center justify-center text-lg font-mono-nums cursor-pointer transition-all duration-150 ";
          
          // Thick borders for 3x3 boxes
          if (row % 3 === 0) className += "border-t-2 border-t-gray-800 ";
          if (col % 3 === 0) className += "border-l-2 border-l-gray-800 ";
          if (row === 8) className += "border-b-2 border-b-gray-800 ";
          if (col === 8) className += "border-r-2 border-r-gray-800 ";

          // Cell states
          const cellKey = `${row}-${col}`;
          const isSelected = selectedCell && selectedCell.row === row && selectedCell.col === col;
          const isGiven = puzzle?.grid[row][col] !== null;
          const hasError = errors.has(cellKey);
          const isRelated = selectedCell && (
            selectedCell.row === row || 
            selectedCell.col === col || 
            (Math.floor(selectedCell.row / 3) === Math.floor(row / 3) && 
             Math.floor(selectedCell.col / 3) === Math.floor(col / 3))
          );
          const isAnimating = animatingCells.has(cellKey);

          if (isSelected) {
            className += "bg-primary bg-opacity-10 border-primary ";
          } else if (isRelated) {
            className += "bg-gray-100 ";
          } else {
            className += "bg-white ";
          }

          if (isGiven) {
            className += "font-bold text-gray-900 ";
          } else {
            className += "text-primary hover:bg-gray-50 ";
          }

          if (hasError) {
            className += "text-red-500 bg-red-50 ";
          }

          if (isAnimating) {
            className += "cell-animation ";
          }

          return className;
        }, [selectedCell, puzzle, errors, animatingCells]);

        if (loading) {
          return (
            <div className="max-w-md mx-auto bg-white rounded-2xl shadow-soft p-8">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <Text className="text-gray-600">Generating puzzle...</Text>
              </div>
            </div>
          );
        }

        if (error) {
          return (
            <div className="max-w-md mx-auto bg-white rounded-2xl shadow-soft p-8">
              <div className="text-center">
                <Icon name="AlertCircle" className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <Text className="text-red-600 mb-4">{error}</Text>
                <Button
                  onClick={loadNewPuzzle}
                  className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark"
                >
                  Try Again
                </Button>
              </div>
            </div>
          );
        }

        return (
          <div className="max-w-2xl mx-auto">
            <GameControls
              difficulty={difficulty}
              onDifficultyChange={(e) => setDifficulty(e.target.value)}
              onNewGame={loadNewPuzzle}
              timer={formatTime(timer)}
              isPaused={isPaused}
              onTogglePause={togglePause}
              gameState={gameState}
              loading={loading}
            />

            <div className="bg-white rounded-2xl shadow-soft p-4 sm:p-8 mb-6 paper-texture">
              <SudokuGrid
                grid={grid}
                puzzle={puzzle}
                selectedCell={selectedCell}
                errors={errors}
                animatingCells={animatingCells}
                onCellClick={handleCellClick}
                getCellClassName={getCellClassName}
              />
            </div>

            <NumberInputPanel
              selectedCell={selectedCell}
              gameState={gameState}
              hintsUsed={hintsUsed}
              maxHints={maxHints}
              onNumberInput={handleNumberInput}
              onClearCell={handleClearCell}
              onHint={handleHint}
              getNumberCount={getNumberCount}
            />

            {/* Completion Modal */}
            <AnimatePresence>
              {showCompletion && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                  onClick={() => setShowCompletion(false)}
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="bg-white rounded-2xl p-8 max-w-md w-full text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-secondary to-secondary-dark rounded-full flex items-center justify-center mx-auto mb-4 confetti">
                        <Icon name="Trophy" className="w-10 h-10 text-white" />
                      </div>
                      <Title as="h2" className="text-2xl mb-2">Puzzle Completed!</Title>
                      <Text className="text-gray-600">Congratulations on solving this {difficulty} puzzle</Text>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 mb-6">
                      <Text as="div" className="text-3xl font-mono-nums font-bold text-primary mb-1">
                        {formatTime(timer)}
                      </Text>
                      <Text as="div" className="text-sm text-gray-600">
                        Hints used: {hintsUsed}/{maxHints}
                      </Text>
                    </div>

                    <div className="flex space-x-3">
                      <Button
                        onClick={loadNewPuzzle}
                        className="flex-1 bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary-dark"
                      >
                        Play Again
                      </Button>
                      <Button
                        onClick={() => setShowCompletion(false)}
                        className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        <Icon name="X" className="w-5 h-5" />
                      </Button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      };

      export default PuzzleGame;