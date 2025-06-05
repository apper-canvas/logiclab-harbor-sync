import React from 'react';

      const Button = ({ children, onClick, className = '', disabled = false, title, type = 'button' }) => {
        return (
          <button
            type={type}
            onClick={onClick}
            className={`transition-all duration-200 ${className}`}
            disabled={disabled}
            title={title}
          >
            {children}
          </button>
        );
      };

      export default Button;