import React, { useState } from 'react'
import { Card, CardContent, CardActions, Button, Typography, Snackbar } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { TodoItem } from './TodoItem'
import { deleteTodoRequest } from '../../lib/api'

export const TodoListForm = ({ todoList, saveTodoList }) => {
  const [todos, setTodos] = useState(todoList.todos)
  const [open, setOpen] = React.useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    saveTodoList(todoList.id, { todos })
    setOpen(true)
  }

  function editTodo(e, todoIndex) {
    const editedTodoList = todos.map((todo, index) => {
      if (todoIndex === index) {
        return { ...todo, task: e.target.value }
      }
      return todo
    })
    setTodos(editedTodoList)
  }

  function toggleTodoCompleted(todoIndex) {
    const updatedTodos = todos.map((todo, index) => {
      if (todoIndex === index) {
        return { ...todo, completed: !todo.completed }
      }
      return todo
    })

    setTodos(updatedTodos)
  }

  const deleteTodo = async (todoIndex) => {
    deleteTodoRequest(todoIndex, todoList.id, todos)
    const remainingTodos = todos.filter((todo, index) => todoIndex !== index)
    setTodos(remainingTodos)
  }

  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography component='h2'>{todoList.title}</Typography>
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
        >
          {todos.map((todo, index) => (
            <TodoItem
              key={index}
              index={index}
              todo={todo}
              editTodo={editTodo}
              deleteTodo={deleteTodo}
              toggleTodoCompleted={toggleTodoCompleted}
            />
          ))}
          <CardActions>
            <Button
              type='button'
              color='primary'
              onClick={() => {
                setTodos([...todos, { task: '', completed: false }])
              }}
            >
              Add Todo <AddIcon />
            </Button>
            <Button type='submit' variant='contained' color='primary'>
              Save
            </Button>
          </CardActions>
        </form>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={open}
          message='Todo list saved!'
          autoHideDuration={3000}
          onClose={() => setOpen(false)}
        />
      </CardContent>
    </Card>
  )
}
