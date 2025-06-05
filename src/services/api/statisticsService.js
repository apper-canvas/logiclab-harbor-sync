import statisticsData from '../mockData/statistics.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const statisticsService = {
  async getAll() {
    await delay(300)
    return [...statisticsData]
  },

  async getById(id) {
    await delay(200)
    const stats = statisticsData.find(s => s.id === id)
    if (!stats) {
      throw new Error('Statistics not found')
    }
    return { ...stats }
  },

  async getByType(puzzleType, difficulty = null) {
    await delay(250)
    let filtered = statisticsData.filter(s => s.puzzleType === puzzleType)
    
    if (difficulty) {
      filtered = filtered.filter(s => s.difficulty === difficulty)
    }
    
    return filtered.map(stats => ({ ...stats }))
  },

  async updateStats(puzzleType, difficulty, gameData) {
    await delay(300)
    
    const existingIndex = statisticsData.findIndex(
      s => s.puzzleType === puzzleType && s.difficulty === difficulty
    )
    
    if (existingIndex !== -1) {
      const existing = statisticsData[existingIndex]
      const totalTime = (existing.averageTime * existing.gamesPlayed) + gameData.completionTime
      const newGamesPlayed = existing.gamesPlayed + 1
      
      const updated = {
        ...existing,
        gamesPlayed: newGamesPlayed,
        bestTime: Math.min(existing.bestTime, gameData.completionTime),
        averageTime: Math.round(totalTime / newGamesPlayed),
        currentStreak: gameData.isCompleted ? existing.currentStreak + 1 : 0,
        longestStreak: Math.max(existing.longestStreak, gameData.isCompleted ? existing.currentStreak + 1 : existing.currentStreak)
      }
      
      statisticsData[existingIndex] = updated
      return { ...updated }
    } else {
      const newStats = {
        id: Date.now().toString(),
        puzzleType,
        difficulty,
        gamesPlayed: 1,
        bestTime: gameData.completionTime,
        averageTime: gameData.completionTime,
        currentStreak: gameData.isCompleted ? 1 : 0,
        longestStreak: gameData.isCompleted ? 1 : 0
      }
      
      statisticsData.push(newStats)
      return { ...newStats }
    }
  },

  async create(statistics) {
    await delay(300)
    const newStats = {
      ...statistics,
      id: Date.now().toString()
    }
    statisticsData.push(newStats)
    return { ...newStats }
  },

  async update(id, data) {
    await delay(250)
    const index = statisticsData.findIndex(s => s.id === id)
    if (index === -1) {
      throw new Error('Statistics not found')
    }
    statisticsData[index] = { ...statisticsData[index], ...data }
    return { ...statisticsData[index] }
  },

  async delete(id) {
    await delay(200)
    const index = statisticsData.findIndex(s => s.id === id)
    if (index === -1) {
      throw new Error('Statistics not found')
    }
    const deleted = statisticsData.splice(index, 1)[0]
    return { ...deleted }
  }
}

export default statisticsService