import React from 'react';
      import Logo from '@/components/atoms/Logo';
      import NavTab from '@/components/molecules/NavTab';
      import Button from '@/components/atoms/Button';
      import Icon from '@/components/atoms/Icon';

      const Header = ({ currentTab, onTabChange, onMobileMenuToggle }) => {
        const tabs = [
          { id: 'sudoku', name: 'Sudoku', active: true },
          { id: 'kenken', name: 'KenKen', active: false, comingSoon: true },
          { id: 'kakuro', name: 'Kakuro', active: false, comingSoon: true }
        ];

        return (
          <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center space-x-8">
                  <Logo
                    iconName="Brain"
                    title="LogicLab"
                    iconBgClass="bg-gradient-to-br from-primary to-primary-dark"
                  />
                  
                  {/* Navigation Tabs */}
                  <nav className="hidden md:flex space-x-1">
                    {tabs.map((tab) => (
                      <NavTab
                        key={tab.id}
                        id={tab.id}
                        name={tab.name}
                        active={tab.active}
                        comingSoon={tab.comingSoon}
                        currentTab={currentTab}
                        onClick={onTabChange}
                      />
                    ))}
                  </nav>
                </div>

                {/* Mobile menu button */}
                <Button
                  onClick={onMobileMenuToggle}
                  className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                >
                  <Icon name="Menu" className="w-6 h-6" />
                </Button>
              </div>
            </div>
          </header>
        );
      };

      export default Header;