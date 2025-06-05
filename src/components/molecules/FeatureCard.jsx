import React from 'react';
      import Icon from '@/components/atoms/Icon';
      import Title from '@/components/atoms/Title';
      import Text from '@/components/atoms/Text';

      const FeatureCard = ({ iconName, iconColorClass, title, description, children }) => {
        return (
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-soft">
            <div className="flex items-center space-x-3 mb-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconColorClass}/10`}>
                <Icon name={iconName} className={`w-5 h-5 ${iconColorClass}`} />
              </div>
              <div>
                <Title>{title}</Title>
                <Text className="text-sm text-gray-600">{description}</Text>
              </div>
            </div>
            {children}
          </div>
        );
      };

      export default FeatureCard;