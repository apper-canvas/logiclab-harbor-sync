import React from 'react';
      import { motion } from 'framer-motion';

      const PuzzleCell = ({ value, onClick, className, cellKey, isGiven }) => {
        return (
          <div
            data-cell={cellKey}
            className={className}
            onClick={onClick}
          >
            {value && (
              <motion.span
                key={value} // Key for re-rendering animation
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.15 }}
                className={isGiven ? 'font-bold' : ''}
              >
                {value}
              </motion.span>
            )}
          </div>
        );
      };

      export default PuzzleCell;