import React from 'react';
      import Text from '@/components/atoms/Text';
      import Button from '@/components/atoms/Button';
      import Icon from '@/components/atoms/Icon';

      const TimerDisplay = ({ time, isPaused, onTogglePause, isDisabled }) => {
        return (
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <Text as="div" className="text-2xl font-mono-nums font-bold text-gray-900">
                {time}
              </Text>
              <Text as="div" className="text-xs text-gray-500">
                {isPaused ? 'Paused' : 'Running'}
              </Text>
            </div>
            
            <Button
              onClick={onTogglePause}
              className="p-2 rounded-lg hover:bg-gray-100"
              disabled={isDisabled}
            >
              <Icon name={isPaused ? "Play" : "Pause"} className="w-5 h-5" />
            </Button>
          </div>
        );
      };

      export default TimerDisplay;