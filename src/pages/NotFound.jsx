import { Link } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'

function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-slate-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ApperIcon name="PuzzlePiece" className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-6xl font-heading font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-heading font-semibold text-gray-700 mb-2">Puzzle Not Found</h2>
          <p className="text-gray-600 mb-8">
            Looks like this page got scrambled! Let's get you back to solving puzzles.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors shadow-lg"
          >
            <ApperIcon name="Home" className="w-5 h-5 mr-2" />
            Back to LogicLab
          </Link>
          
          <div className="text-sm text-gray-500">
            <p>Need help? Try refreshing the page or check your connection.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound