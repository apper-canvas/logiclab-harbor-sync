import React from 'react';

      const Text = ({ as = 'p', children, className = '' }) => {
        const Tag = as;
        return <Tag className={className}>{children}</Tag>;
      };

      export default Text;