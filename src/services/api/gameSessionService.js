import gameSessionData from '../mockData/gameSessions.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const gameSessionService = {
  async getAll() {
    await delay(300)
    return [...gameSessionData]
  },

  async getById(id) {
    await delay(200)
    const session = gameSessionData.find(s => s.id === id)
    if (!session) {
      throw new Error('Game session not found')
    }
    return { ...session }
  },

  async getByPuzzleId(puzzleId) {
    await delay(250)
    const sessions = gameSessionData.filter(s => s.puzzleId === puzzleId)
    return sessions.map(session => ({ ...session }))
  },

  async create(session) {
    await delay(300)
    const newSession = {
      ...session,
      id: Date.now().toString(),
      startTime: new Date().toISOString(),
      moves: [],
      hintsUsed: 0,
      isCompleted: false
    }
    gameSessionData.push(newSession)
    return { ...newSession }
  },

  async update(id, data) {
    await delay(250)
    const index = gameSessionData.findIndex(s => s.id === id)
    if (index === -1) {
      throw new Error('Game session not found')
    }
    gameSessionData[index] = { ...gameSessionData[index], ...data }
    return { ...gameSessionData[index] }
  },

  async complete(id, completionData) {
    await delay(300)
    const index = gameSessionData.findIndex(s => s.id === id)
    if (index === -1) {
      throw new Error('Game session not found')
    }
    
    const updatedSession = {
      ...gameSessionData[index],
      ...completionData,
      endTime: new Date().toISOString(),
      isCompleted: true
    }
    
    gameSessionData[index] = updatedSession
    return { ...updatedSession }
  },

  async delete(id) {
    await delay(200)
    const index = gameSessionData.findIndex(s => s.id === id)
    if (index === -1) {
      throw new Error('Game session not found')
    }
    const deleted = gameSessionData.splice(index, 1)[0]
    return { ...deleted }
  }
}

export default gameSessionService