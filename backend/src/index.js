import express from 'express'
import cors from 'cors'

let todoLists = {
  '0000000001': {
    id: '0000000001',
    title: 'First List',
    todos: [{ task: 'First todo of first list!', completed: false }],
  },
  '0000000002': {
    id: '0000000002',
    title: 'Second List',
    todos: [{ task: 'First todo of second list!', completed: false }],
  },
}

const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3001

// Get all lists
app.get('/api/lists', async (req, res) => {
  try {
    res.json(todoLists)
  } catch (error) {
    res.status(500).send('Something went wrong while getting todo lists')
  }
})

// Save a list
app.put('/api/list/:id', async (req, res) => {
  try {
    const listId = req.params.id
    const { todos } = req.body

    if (!todoLists[listId]) {
      return res.status(404).send('List not found')
    }

    const listToUpdate = todoLists[listId]
    todoLists = {
      ...todoLists,
      [listId]: { ...listToUpdate, todos },
    }
    console.log(`Changes in list ${listId} saved`)
    res.json(todoLists[listId])
  } catch (error) {
    res.status(500).send('Something went wrong while saving todo list')
  }
})

//Delete a todo
app.delete('/api/list/todo/:index', (req, res) => {
  try {
    const todoIndex = req.params.index
    const { listId, todos } = req.body

    if (!todoIndex) {
      return res.status(400).send('Todo index required')
    }
    const listToUpdate = todoLists[listId]
    todoLists = {
      ...todoLists,
      [listId]: {
        ...listToUpdate,
        todos: [...todos.slice(0, todoIndex), ...todos.slice(todoIndex + 1)],
      },
    }
    return res.status(204).send('Todo deleted')
  } catch (error) {
    res.status(500).send('Something went wrong while deleting todo')
  }
})

app.listen(PORT, () => console.log(`app listening on port ${PORT}!`))
