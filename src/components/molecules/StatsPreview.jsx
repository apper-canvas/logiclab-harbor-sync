import React from 'react';
      import FeatureCard from '@/components/molecules/FeatureCard';
      import Text from '@/components/atoms/Text';

      const StatsPreview = () => {
        return (
          <FeatureCard
            iconName="BarChart3"
            iconColorClass="text-secondary"
            title="Statistics"
            description="Track your progress"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <Text as="span" className="text-sm text-gray-600">Games Played</Text>
                <Text as="span" className="font-mono-nums font-semibold">-</Text>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <Text as="span" className="text-sm text-gray-600">Best Time</Text>
                <Text as="span" className="font-mono-nums font-semibold">--:--</Text>
              </div>
              <div className="flex justify-between items-center py-2">
                <Text as="span" className="text-sm text-gray-600">Current Streak</Text>
                <Text as="span" className="font-mono-nums font-semibold">0</Text>
              </div>
            </div>
            <Text className="text-xs text-gray-500 mt-4 text-center">Coming soon!</Text>
          </FeatureCard>
        );
      };

      export default StatsPreview;