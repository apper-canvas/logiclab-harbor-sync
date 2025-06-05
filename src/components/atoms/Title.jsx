import React from 'react';
      import Text from '@/components/atoms/Text';

      const Title = ({ children, className = '', as = 'h3' }) => {
        return (
          <Text as={as} className={`font-heading font-semibold text-gray-900 ${className}`}>
            {children}
          </Text>
        );
      };

      export default Title;