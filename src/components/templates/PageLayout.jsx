import React from 'react';
      import Header from '@/components/organisms/Header';
      import Sidebar from '@/components/organisms/Sidebar';
      import RightSidebar from '@/components/organisms/RightSidebar';

      const PageLayout = ({ currentTab, onTabChange, sidebarOpen, onMobileMenuToggle, onOverlayClick, mainContent }) => {
        return (
          <div className="min-h-screen bg-gradient-to-br from-stone-50 via-slate-50 to-blue-50">
            <Header
              currentTab={currentTab}
              onTabChange={onTabChange}
              onMobileMenuToggle={onMobileMenuToggle}
            />

            <div className="flex">
              <Sidebar isOpen={sidebarOpen} />

              <main className="flex-1 lg:max-w-none max-w-full overflow-hidden">
                <div className="p-4 sm:p-6 lg:p-8">
                  {mainContent}
                </div>
              </main>

              <RightSidebar />
            </div>

            {/* Mobile overlay */}
            {sidebarOpen && (
              <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                onClick={onOverlayClick}
              />
            )}
          </div>
        );
      };

      export default PageLayout;