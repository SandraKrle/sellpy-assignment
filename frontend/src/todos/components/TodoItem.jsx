import React from 'react'
import { TextField, Button, Typography, Checkbox } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

export const TodoItem = ({ index, todo, editTodo, deleteTodo, toggleTodoCompleted }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Typography sx={{ margin: '8px' }} variant='h6'>
        {index + 1}
      </Typography>
      <TextField
        id={`task-${index}`}
        sx={{ flexGrow: 1, marginTop: '1rem' }}
        label='What to do?'
        value={todo.task}
        onChange={(e) => editTodo(e, index)}
      />
      <Checkbox
        id={`completed-${index}`}
        checked={todo.completed}
        onChange={() => toggleTodoCompleted(index)}
        inputProps={{ 'aria-label': 'Mark item as completed' }}
      />
      <Button
        sx={{ margin: '8px' }}
        size='small'
        color='secondary'
        onClick={() => deleteTodo(index)}
        title='Delete this item'
      >
        <DeleteIcon />
      </Button>
    </div>
  )
}
