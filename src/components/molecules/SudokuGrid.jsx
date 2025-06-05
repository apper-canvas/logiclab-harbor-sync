import React from 'react';
      import PuzzleCell from '@/components/molecules/PuzzleCell';

      const SudokuGrid = ({ grid, puzzle, selectedCell, errors, animatingCells, onCellClick, getCellClassName }) => {
        return (
          <div className="grid grid-cols-9 gap-0 mx-auto grid-shadow rounded-lg overflow-hidden" style={{ width: 'fit-content' }}>
            {grid.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <PuzzleCell
                  key={`${rowIndex}-${colIndex}`}
                  cellKey={`${rowIndex}-${colIndex}`}
                  value={cell}
                  isGiven={puzzle?.grid[rowIndex][colIndex] !== null}
                  className={getCellClassName(rowIndex, colIndex)}
                  onClick={() => onCellClick(rowIndex, colIndex)}
                />
              ))
            )}
          </div>
        );
      };

      export default SudokuGrid;