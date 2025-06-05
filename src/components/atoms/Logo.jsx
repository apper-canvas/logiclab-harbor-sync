import React from 'react';
      import Icon from '@/components/atoms/Icon';
      import Text from '@/components/atoms/Text';

      const Logo = ({ iconName, title, iconBgClass, iconClass, titleClass }) => {
        return (
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconBgClass}`}>
              <Icon name={iconName} className={`w-5 h-5 text-white ${iconClass}`} />
            </div>
            <Text as="h1" className={`text-xl font-heading font-bold text-gray-900 ${titleClass}`}>
              {title}
            </Text>
          </div>
        );
      };

      export default Logo;