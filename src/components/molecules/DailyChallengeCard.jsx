import React from 'react';
      import Icon from '@/components/atoms/Icon';
      import Title from '@/components/atoms/Title';
      import Text from '@/components/atoms/Text';
      import Button from '@/components/atoms/Button';

      const DailyChallengeCard = () => {
        return (
          <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-6 border border-primary/10">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Calendar" className="w-5 h-5 text-primary" />
              </div>
              <div>
                <Title>Daily Challenge</Title>
                <Text className="text-sm text-gray-600">Complete today's puzzle!</Text>
              </div>
            </div>
            <Button
              className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors"
              disabled
            >
              <Icon name="Lock" className="w-4 h-4 inline mr-2" />
              Coming Soon
            </Button>
          </div>
        );
      };

      export default DailyChallengeCard;