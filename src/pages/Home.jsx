import { useState, useEffect } from 'react'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

function Home() {
  const [currentTab, setCurrentTab] = useState('sudoku')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true)
      } else {
        setSidebarOpen(false)
      }
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const tabs = [
    { id: 'sudoku', name: 'Sudoku', active: true },
    { id: 'kenken', name: 'KenKen', active: false, comingSoon: true },
    { id: 'kakuro', name: 'Kakuro', active: false, comingSoon: true }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center">
                  <ApperIcon name="Brain" className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-heading font-bold text-gray-900">LogicLab</h1>
              </div>
              
              {/* Navigation Tabs */}
              <nav className="hidden md:flex space-x-1">
                {tabs.map((tab) => (
                  <div key={tab.id} className="relative">
                    <button
                      onClick={() => tab.active && setCurrentTab(tab.id)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        tab.active && currentTab === tab.id
                          ? 'bg-primary text-white shadow-lg'
                          : tab.comingSoon
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                      disabled={tab.comingSoon}
                      title={tab.comingSoon ? "Coming Soon!" : undefined}
                    >
                      {tab.name}
                      {tab.comingSoon && (
                        <span className="ml-2 text-xs bg-gray-200 px-2 py-1 rounded-full">
                          Soon
                        </span>
                      )}
                    </button>
                  </div>
                ))}
              </nav>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <ApperIcon name="Menu" className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed lg:relative lg:translate-x-0 z-40 w-80 h-screen bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out overflow-y-auto`}>
          <div className="p-6 space-y-6">
            {/* Daily Challenge */}
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-6 border border-primary/10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <ApperIcon name="Calendar" className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-gray-900">Daily Challenge</h3>
                  <p className="text-sm text-gray-600">Complete today's puzzle!</p>
                </div>
              </div>
              <button className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors">
                <ApperIcon name="Lock" className="w-4 h-4 inline mr-2" />
                Coming Soon
              </button>
            </div>

            {/* Statistics Preview */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-soft">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <ApperIcon name="BarChart3" className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-gray-900">Statistics</h3>
                  <p className="text-sm text-gray-600">Track your progress</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Games Played</span>
                  <span className="font-mono-nums font-semibold">-</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Best Time</span>
                  <span className="font-mono-nums font-semibold">--:--</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-600">Current Streak</span>
                  <span className="font-mono-nums font-semibold">0</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4 text-center">Coming soon!</p>
            </div>

            {/* Achievements Teaser */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-soft">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <ApperIcon name="Trophy" className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-gray-900">Achievements</h3>
                  <p className="text-sm text-gray-600">Unlock rewards</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center opacity-50">
                    <ApperIcon name="Award" className="w-6 h-6 text-gray-400" />
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-4 text-center">Coming soon!</p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:max-w-none max-w-full overflow-hidden">
          <div className="p-4 sm:p-6 lg:p-8">
            <MainFeature />
          </div>
        </main>

        {/* Right Panel - Desktop Only */}
        <aside className="hidden xl:block w-80 bg-white border-l border-gray-200 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Leaderboard Preview */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-soft">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <ApperIcon name="Users" className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-gray-900">Leaderboard</h3>
                  <p className="text-sm text-gray-600">Global rankings</p>
                </div>
              </div>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((rank) => (
                  <div key={rank} className="flex items-center space-x-3 py-2">
                    <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-semibold">
                      {rank}
                    </span>
                    <div className="flex-1">
                      <div className="w-20 h-2 bg-gray-200 rounded-full"></div>
                    </div>
                    <span className="text-xs text-gray-500 font-mono-nums">--:--</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-4 text-center">Launching soon!</p>
            </div>

            {/* Tips Section */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-soft">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <ApperIcon name="Lightbulb" className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-gray-900">Solving Tips</h3>
                  <p className="text-sm text-gray-600">Improve your skills</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-900 mb-1">Start with singles</h4>
                  <p className="text-xs text-gray-600">Look for cells with only one possible number.</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-900 mb-1">Check constraints</h4>
                  <p className="text-xs text-gray-600">Each row, column, and box must contain all digits 1-9.</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-900 mb-1">Use elimination</h4>
                  <p className="text-xs text-gray-600">Remove impossible numbers to narrow down options.</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

export default Home