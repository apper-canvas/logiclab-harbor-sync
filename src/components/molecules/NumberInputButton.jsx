import React from 'react';
      import Button from '@/components/atoms/Button';
      import Text from '@/components/atoms/Text';

      const NumberInputButton = ({ number, count, onClick, disabled }) => {
        const isComplete = count >= 9;
        return (
          <Button
            onClick={() => onClick(number)}
            disabled={disabled || isComplete}
            className={`relative w-12 h-12 rounded-lg font-bold text-lg ${
              isComplete
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-50 hover:bg-primary hover:text-white hover:scale-105 shadow-sm'
            }`}
          >
            {number}
            {count > 0 && (
              <Text as="span" className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-white text-xs rounded-full flex items-center justify-center">
                {count}
              </Text>
            )}
          </Button>
        );
      };

      export default NumberInputButton;