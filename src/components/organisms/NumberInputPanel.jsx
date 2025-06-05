import React from 'react';
      import Button from '@/components/atoms/Button';
      import Icon from '@/components/atoms/Icon';
      import Text from '@/components/atoms/Text';
      import NumberInputButton from '@/components/molecules/NumberInputButton';
      import Card from '@/components/molecules/Card';

      const NumberInputPanel = ({ selectedCell, gameState, hintsUsed, maxHints, onNumberInput, onClearCell, onHint, getNumberCount }) => {
        return (
          <Card>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 sm:gap-3 mb-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                <NumberInputButton
                  key={number}
                  number={number}
                  count={getNumberCount(number)}
                  onClick={onNumberInput}
                  disabled={!selectedCell || gameState === 'completed'}
                />
              ))}
              
              <Button
                onClick={onClearCell}
                disabled={!selectedCell || gameState === 'completed'}
                className="w-12 h-12 bg-gray-50 hover:bg-red-100 hover:text-red-600 rounded-lg shadow-sm flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Icon name="Eraser" className="w-5 h-5" />
              </Button>
            </div>

            {/* Bottom Controls */}
            <div className="flex items-center justify-between">
              <Button
                onClick={onHint}
                disabled={!selectedCell || hintsUsed >= maxHints || gameState === 'completed'}
                className="flex items-center space-x-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Icon name="Lightbulb" className="w-4 h-4" />
                <span>Hint ({maxHints - hintsUsed} left)</span>
              </Button>

              <Text as="div" className="text-sm text-gray-500">
                {selectedCell ? (
                  <span>Selected: Row {selectedCell.row + 1}, Col {selectedCell.col + 1}</span>
                ) : (
                  <span>Click a cell to select</span>
                )}
              </Text>
            </div>
          </Card>
        );
      };

      export default NumberInputPanel;