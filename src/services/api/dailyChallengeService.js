import dailyChallengesData from '../mockData/dailyChallenges.json'
import puzzleService from './puzzleService'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Local storage keys
const STORAGE_KEYS = {
  DAILY_STREAK: 'logiclab_daily_streak',
  LAST_COMPLETION: 'logiclab_last_completion',
  CHALLENGES_DATA: 'logiclab_daily_challenges'
}

// Get today's date in YYYY-MM-DD format
const getTodayDate = () => {
  const now = new Date()
  return now.toISOString().split('T')[0]
}

// Get yesterday's date in YYYY-MM-DD format
const getYesterdayDate = () => {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return yesterday.toISOString().split('T')[0]
}

// Initialize local storage data
const initializeLocalStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.DAILY_STREAK)) {
    localStorage.setItem(STORAGE_KEYS.DAILY_STREAK, '0')
  }
  if (!localStorage.getItem(STORAGE_KEYS.CHALLENGES_DATA)) {
    localStorage.setItem(STORAGE_KEYS.CHALLENGES_DATA, JSON.stringify(dailyChallengesData))
  }
}

// Get stored challenges data
const getStoredChallenges = () => {
  const stored = localStorage.getItem(STORAGE_KEYS.CHALLENGES_DATA)
  return stored ? JSON.parse(stored) : [...dailyChallengesData]
}

// Save challenges data to storage
const saveStoredChallenges = (challenges) => {
  localStorage.setItem(STORAGE_KEYS.CHALLENGES_DATA, JSON.stringify(challenges))
}

// Get current streak from storage
const getCurrentStreak = () => {
  const stored = localStorage.getItem(STORAGE_KEYS.DAILY_STREAK)
  return parseInt(stored) || 0
}

// Update streak in storage
const updateStreak = (newStreak) => {
  localStorage.setItem(STORAGE_KEYS.DAILY_STREAK, newStreak.toString())
}

// Get last completion date
const getLastCompletionDate = () => {
  return localStorage.getItem(STORAGE_KEYS.LAST_COMPLETION)
}

// Update last completion date
const updateLastCompletionDate = (date) => {
  localStorage.setItem(STORAGE_KEYS.LAST_COMPLETION, date)
}

// Check if streak should be reset
const shouldResetStreak = () => {
  const lastCompletion = getLastCompletionDate()
  if (!lastCompletion) return false
  
  const today = getTodayDate()
  const yesterday = getYesterdayDate()
  
  // If last completion was not yesterday and not today, reset streak
  return lastCompletion !== yesterday && lastCompletion !== today
}

// Generate today's challenge
const generateTodaysChallenge = async () => {
  const today = getTodayDate()
  const challengeId = `daily-${today}`
  
  // Difficulty based on day of week (0 = Sunday, 6 = Saturday)
  const dayOfWeek = new Date().getDay()
  const difficultyMap = {
    0: 'easy',    // Sunday - relaxed
    1: 'medium',  // Monday - moderate start
    2: 'easy',    // Tuesday - keep momentum
    3: 'hard',    // Wednesday - mid-week challenge
    4: 'medium',  // Thursday - steady
    5: 'hard',    // Friday - end week strong
    6: 'easy'     // Saturday - weekend ease
  }
  
  const difficulty = difficultyMap[dayOfWeek]
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const dayName = dayNames[dayOfWeek]
  
  try {
    const puzzle = await puzzleService.generatePuzzle(difficulty)
    
    return {
      id: challengeId,
      date: today,
      puzzleId: puzzle.id,
      puzzleType: puzzle.type,
      difficulty: puzzle.difficulty,
      title: `${dayName} ${puzzle.type.charAt(0).toUpperCase() + puzzle.type.slice(1)} Challenge`,
      description: `${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} ${puzzle.type} puzzle for ${dayName}`,
      isCompleted: false,
      completionTime: null,
      completedAt: null,
      puzzle: puzzle
    }
  } catch (error) {
    console.error('Error generating daily challenge:', error)
    throw new Error('Failed to generate daily challenge')
  }
}

const dailyChallengeService = {
  async getTodaysChallenge() {
    await delay(300)
    initializeLocalStorage()
    
    const today = getTodayDate()
    const challengeId = `daily-${today}`
    const challenges = getStoredChallenges()
    
    // Check if today's challenge already exists
    let todaysChallenge = challenges.find(c => c.id === challengeId)
    
    if (!todaysChallenge) {
      // Generate new challenge for today
      todaysChallenge = await generateTodaysChallenge()
      challenges.push(todaysChallenge)
      saveStoredChallenges(challenges)
    } else {
      // Load the associated puzzle data if not already included
      if (!todaysChallenge.puzzle) {
        try {
          const puzzle = await puzzleService.getById(todaysChallenge.puzzleId)
          todaysChallenge.puzzle = puzzle
        } catch (error) {
          console.error('Error loading puzzle for daily challenge:', error)
          // Generate new puzzle if the old one is not found
          const newPuzzle = await puzzleService.generatePuzzle(todaysChallenge.difficulty)
          todaysChallenge.puzzle = newPuzzle
          todaysChallenge.puzzleId = newPuzzle.id
        }
      }
    }
    
    return { ...todaysChallenge }
  },

  async getStreakInfo() {
    await delay(200)
    initializeLocalStorage()
    
    const currentStreak = getCurrentStreak()
    const lastCompletion = getLastCompletionDate()
    const shouldReset = shouldResetStreak()
    
    if (shouldReset && currentStreak > 0) {
      updateStreak(0)
      return {
        currentStreak: 0,
        lastCompletionDate: lastCompletion,
        streakReset: true,
        maxPossibleStreak: 7 // Weekly cycle
      }
    }
    
    return {
      currentStreak,
      lastCompletionDate: lastCompletion,
      streakReset: false,
      maxPossibleStreak: 7 // Weekly cycle
    }
  },

  async completeChallenge(challengeId, completionTime) {
    await delay(300)
    initializeLocalStorage()
    
    const challenges = getStoredChallenges()
    const challengeIndex = challenges.findIndex(c => c.id === challengeId)
    
    if (challengeIndex === -1) {
      throw new Error('Challenge not found')
    }
    
    const challenge = challenges[challengeIndex]
    
    if (challenge.isCompleted) {
      throw new Error('Challenge already completed')
    }
    
    // Update challenge completion
    const completedChallenge = {
      ...challenge,
      isCompleted: true,
      completionTime,
      completedAt: new Date().toISOString()
    }
    
    challenges[challengeIndex] = completedChallenge
    saveStoredChallenges(challenges)
    
    // Update streak
    const today = getTodayDate()
    const currentStreak = getCurrentStreak()
    const lastCompletion = getLastCompletionDate()
    const yesterday = getYesterdayDate()
    
    let newStreak = currentStreak
    
    if (!lastCompletion || lastCompletion === yesterday) {
      // Continue or start streak
      newStreak = currentStreak + 1
    } else if (lastCompletion !== today) {
      // Streak was broken, start new one
      newStreak = 1
    }
    
    updateStreak(newStreak)
    updateLastCompletionDate(today)
    
    return {
      challenge: { ...completedChallenge },
      newStreak,
      streakIncreased: newStreak > currentStreak
    }
  },

  async getChallengeHistory(limit = 30) {
    await delay(250)
    initializeLocalStorage()
    
    const challenges = getStoredChallenges()
    
    // Sort by date descending and limit results
    const sortedChallenges = challenges
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit)
    
    return sortedChallenges.map(challenge => ({ ...challenge }))
  },

  async getAll() {
    await delay(300)
    return this.getChallengeHistory()
  },

  async getById(id) {
    await delay(200)
    initializeLocalStorage()
    
    const challenges = getStoredChallenges()
    const challenge = challenges.find(c => c.id === id)
    
    if (!challenge) {
      throw new Error('Challenge not found')
    }
    
    return { ...challenge }
  },

  async create(challenge) {
    await delay(300)
    initializeLocalStorage()
    
    const challenges = getStoredChallenges()
    const newChallenge = {
      ...challenge,
      id: challenge.id || `daily-${Date.now()}`,
      date: challenge.date || getTodayDate(),
      isCompleted: false,
      completionTime: null,
      completedAt: null
    }
    
    challenges.push(newChallenge)
    saveStoredChallenges(challenges)
    
    return { ...newChallenge }
  },

  async update(id, data) {
    await delay(250)
    initializeLocalStorage()
    
    const challenges = getStoredChallenges()
    const index = challenges.findIndex(c => c.id === id)
    
    if (index === -1) {
      throw new Error('Challenge not found')
    }
    
    challenges[index] = { ...challenges[index], ...data }
    saveStoredChallenges(challenges)
    
    return { ...challenges[index] }
  },

  async delete(id) {
    await delay(200)
    initializeLocalStorage()
    
    const challenges = getStoredChallenges()
    const index = challenges.findIndex(c => c.id === id)
    
    if (index === -1) {
      throw new Error('Challenge not found')
    }
    
    const deleted = challenges.splice(index, 1)[0]
    saveStoredChallenges(challenges)
    
    return { ...deleted }
  }
}

export default dailyChallengeService