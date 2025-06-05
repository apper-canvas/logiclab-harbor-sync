import puzzleData from '../mockData/puzzles.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Sudoku generator helper functions
const isValid = (grid, row, col, num) => {
  // Check row
  for (let x = 0; x < 9; x++) {
    if (grid[row][x] === num) return false
  }
  
  // Check column
  for (let x = 0; x < 9; x++) {
    if (grid[x][col] === num) return false
  }
  
  // Check 3x3 box
  const startRow = row - (row % 3)
  const startCol = col - (col % 3)
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i + startRow][j + startCol] === num) return false
    }
  }
  
  return true
}

const solveSudoku = (grid) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === null) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(grid, row, col, num)) {
            grid[row][col] = num
            
            if (solveSudoku(grid)) {
              return true
            }
            
            grid[row][col] = null
          }
        }
        return false
      }
    }
  }
  return true
}

const generateCompletedGrid = () => {
  const grid = Array(9).fill().map(() => Array(9).fill(null))
  
  // Fill diagonal boxes first
  for (let i = 0; i < 9; i += 3) {
    fillBox(grid, i, i)
  }
  
  // Solve the rest
  solveSudoku(grid)
  return grid
}

const fillBox = (grid, row, col) => {
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const randomIndex = Math.floor(Math.random() * nums.length)
      grid[row + i][col + j] = nums[randomIndex]
      nums.splice(randomIndex, 1)
    }
  }
}

const removeCells = (grid, difficulty) => {
  const cellsToRemove = {
    easy: 40,
    medium: 50,
    hard: 60,
    expert: 70
  }
  
  const puzzleGrid = grid.map(row => [...row])
  let removed = 0
  const target = cellsToRemove[difficulty] || 40
  
  while (removed < target) {
    const row = Math.floor(Math.random() * 9)
    const col = Math.floor(Math.random() * 9)
    
    if (puzzleGrid[row][col] !== null) {
      puzzleGrid[row][col] = null
      removed++
    }
  }
  
  return puzzleGrid
}

const puzzleService = {
  async getAll() {
    await delay(300)
    return [...puzzleData]
  },

  async getById(id) {
    await delay(200)
    const puzzle = puzzleData.find(p => p.id === id)
    if (!puzzle) {
      throw new Error('Puzzle not found')
    }
    return { ...puzzle }
  },

  async generatePuzzle(difficulty = 'easy') {
    await delay(400)
    
    try {
      // Generate a complete solution
      const solution = generateCompletedGrid()
      
      // Create puzzle by removing cells
      const grid = removeCells(solution, difficulty)
      
      const puzzle = {
        id: Date.now().toString(),
        type: 'sudoku',
        difficulty,
        grid: grid.map(row => [...row]),
        solution: solution.map(row => [...row]),
        createdAt: new Date().toISOString()
      }
      
      return puzzle
    } catch (error) {
      console.error('Error generating puzzle:', error)
      // Fallback to predefined puzzle
      const fallbackPuzzles = puzzleData.filter(p => p.difficulty === difficulty)
      if (fallbackPuzzles.length > 0) {
        const randomPuzzle = fallbackPuzzles[Math.floor(Math.random() * fallbackPuzzles.length)]
        return { ...randomPuzzle }
      }
      throw new Error('Failed to generate puzzle')
    }
  },

  async create(puzzle) {
    await delay(300)
    const newPuzzle = {
      ...puzzle,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    puzzleData.push(newPuzzle)
    return { ...newPuzzle }
  },

  async update(id, data) {
    await delay(250)
    const index = puzzleData.findIndex(p => p.id === id)
    if (index === -1) {
      throw new Error('Puzzle not found')
    }
    puzzleData[index] = { ...puzzleData[index], ...data }
    return { ...puzzleData[index] }
  },

  async delete(id) {
    await delay(200)
    const index = puzzleData.findIndex(p => p.id === id)
    if (index === -1) {
      throw new Error('Puzzle not found')
    }
    const deleted = puzzleData.splice(index, 1)[0]
    return { ...deleted }
  }
}

export default puzzleService