import React from 'react';
      import LeaderboardPreview from '@/components/molecules/LeaderboardPreview';
      import TipCard from '@/components/molecules/TipCard';

      const RightSidebar = () => {
        return (
          <aside className="hidden xl:block w-80 bg-white border-l border-gray-200 overflow-y-auto">
            <div className="p-6 space-y-6">
              <LeaderboardPreview />
              <TipCard />
            </div>
          </aside>
        );
      };

      export default RightSidebar;