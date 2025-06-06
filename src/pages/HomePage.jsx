import { useState, useEffect } from 'react';
import PageLayout from '../components/templates/PageLayout';
import PuzzleTemplate from '../components/templates/PuzzleTemplate';
    function HomePage() {
      const [currentTab, setCurrentTab] = useState('sudoku');
      const [sidebarOpen, setSidebarOpen] = useState(false);

      useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth >= 1024) {
            setSidebarOpen(true);
          } else {
            setSidebarOpen(false);
          }
        };
        
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

      const handleTabChange = (tabId) => {
        setCurrentTab(tabId);
        // Add logic to switch content based on tabId if needed
      };

      const handleMobileMenuToggle = () => {
        setSidebarOpen(!sidebarOpen);
      };

      const handleOverlayClick = () => {
        setSidebarOpen(false);
      };

      return (
        <PageLayout
          currentTab={currentTab}
          onTabChange={handleTabChange}
          sidebarOpen={sidebarOpen}
          onMobileMenuToggle={handleMobileMenuToggle}
          onOverlayClick={handleOverlayClick}
          mainContent={<PuzzleTemplate />}
        />
      );
    }

    export default HomePage;