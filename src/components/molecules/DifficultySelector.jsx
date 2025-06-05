import React from 'react';

      const DifficultySelector = ({ difficulty, onChange, disabled }) => {
        return (
          <select
            value={difficulty}
            onChange={onChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            disabled={disabled}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
            <option value="expert">Expert</option>
          </select>
        );
      };

      export default DifficultySelector;