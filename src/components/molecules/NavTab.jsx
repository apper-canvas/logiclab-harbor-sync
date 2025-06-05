import React from 'react';
      import Button from '@/components/atoms/Button';
      import Text from '@/components/atoms/Text';

      const NavTab = ({ id, name, active, comingSoon, currentTab, onClick }) => {
        const isActive = active && currentTab === id;
        return (
          <div className="relative">
            <Button
              onClick={() => active && onClick(id)}
              className={`px-4 py-2 rounded-lg font-medium ${
                isActive
                  ? 'bg-primary text-white shadow-lg'
                  : comingSoon
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
              disabled={comingSoon}
              title={comingSoon ? "Coming Soon!" : undefined}
            >
              {name}
              {comingSoon && (
                <Text as="span" className="ml-2 text-xs bg-gray-200 px-2 py-1 rounded-full">
                  Soon
                </Text>
              )}
            </Button>
          </div>
        );
      };

      export default NavTab;