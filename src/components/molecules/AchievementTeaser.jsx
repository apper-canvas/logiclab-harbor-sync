import React from 'react';
      import Card from '@/components/molecules/Card';
      import Icon from '@/components/atoms/Icon';
      import Title from '@/components/atoms/Title';
      import Text from '@/components/atoms/Text';

      const AchievementTeaser = () => {
        return (
          <Card>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Icon name="Trophy" className="w-5 h-5 text-accent" />
              </div>
              <div>
                <Title>Achievements</Title>
                <Text className="text-sm text-gray-600">Unlock rewards</Text>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center opacity-50">
                  <Icon name="Award" className="w-6 h-6 text-gray-400" />
                </div>
              ))}
            </div>
            <Text className="text-xs text-gray-500 mt-4 text-center">Coming soon!</Text>
          </Card>
        );
      };

      export default AchievementTeaser;