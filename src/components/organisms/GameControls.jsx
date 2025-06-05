import React from 'react';
      import Button from '@/components/atoms/Button';
      import Icon from '@/components/atoms/Icon';
      import DifficultySelector from '@/components/molecules/DifficultySelector';
      import TimerDisplay from '@/components/molecules/TimerDisplay';
      import Card from '@/components/molecules/Card';

      const GameControls = ({ difficulty, onDifficultyChange, onNewGame, timer, isPaused, onTogglePause, gameState, loading }) => {
        return (
          <Card className="mb-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <DifficultySelector
                  difficulty={difficulty}
                  onChange={onDifficultyChange}
                  disabled={gameState === 'completed'}
                />
                
                <Button
                  onClick={onNewGame}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
                  disabled={loading}
                >
                  <Icon name="RotateCcw" className="w-4 h-4" />
                  <span className="hidden sm:inline">New Game</span>
                </Button>
              </div>

              <TimerDisplay
                time={timer}
                isPaused={isPaused}
                onTogglePause={onTogglePause}
                isDisabled={gameState === 'completed'}
              />
            </div>
          </Card>
        );
      };

      export default GameControls;