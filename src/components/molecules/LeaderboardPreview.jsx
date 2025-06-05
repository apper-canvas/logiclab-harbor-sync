import React from 'react';
      import FeatureCard from '@/components/molecules/FeatureCard';
      import Text from '@/components/atoms/Text';

      const LeaderboardPreview = () => {
        return (
          <FeatureCard
            iconName="Users"
            iconColorClass="text-primary"
            title="Leaderboard"
            description="Global rankings"
          >
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((rank) => (
                <div key={rank} className="flex items-center space-x-3 py-2">
                  <Text as="span" className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-semibold">
                    {rank}
                  </Text>
                  <div className="flex-1">
                    <div className="w-20 h-2 bg-gray-200 rounded-full"></div>
                  </div>
                  <Text as="span" className="text-xs text-gray-500 font-mono-nums">--:--</Text>
                </div>
              ))}
            </div>
            <Text className="text-xs text-gray-500 mt-4 text-center">Launching soon!</Text>
          </FeatureCard>
        );
      };

      export default LeaderboardPreview;