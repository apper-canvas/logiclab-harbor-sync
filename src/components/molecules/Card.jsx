import React from 'react';

      const Card = ({ children, className = '' }) => {
        return (
          <div className={`bg-white rounded-xl p-6 border border-gray-200 shadow-soft ${className}`}>
            {children}
          </div>
        );
      };

      export default Card;