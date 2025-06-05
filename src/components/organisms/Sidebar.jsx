import React from 'react';
      import DailyChallengeCard from '@/components/molecules/DailyChallengeCard';
      import StatsPreview from '@/components/molecules/StatsPreview';
      import AchievementTeaser from '@/components/molecules/AchievementTeaser';

      const Sidebar = ({ isOpen }) => {
        return (
          <aside className={`${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed lg:relative lg:translate-x-0 z-40 w-80 h-screen bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out overflow-y-auto`}>
            <div className="p-6 space-y-6">
              <DailyChallengeCard />
              <StatsPreview />
              <AchievementTeaser />
            </div>
          </aside>
        );
      };

      export default Sidebar;