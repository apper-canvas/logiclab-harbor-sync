import React from 'react';
      import FeatureCard from '@/components/molecules/FeatureCard';
      import Text from '@/components/atoms/Text';
      import Title from '@/components/atoms/Title';

      const TipCard = () => {
        const tips = [
          { title: 'Start with singles', description: 'Look for cells with only one possible number.' },
          { title: 'Check constraints', description: 'Each row, column, and box must contain all digits 1-9.' },
          { title: 'Use elimination', description: 'Remove impossible numbers to narrow down options.' },
        ];

        return (
          <FeatureCard
            iconName="Lightbulb"
            iconColorClass="text-accent"
            title="Solving Tips"
            description="Improve your skills"
          >
            <div className="space-y-4">
              {tips.map((tip, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <Title as="h4" className="text-sm font-medium mb-1">{tip.title}</Title>
                  <Text className="text-xs text-gray-600">{tip.description}</Text>
                </div>
              ))}
            </div>
          </FeatureCard>
        );
      };

      export default TipCard;