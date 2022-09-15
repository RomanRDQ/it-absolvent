import { Button } from '@mui/material'
import { TodoContext } from './TodoListApp'
import { theme } from '../../theme'
import { todoAppBreakpoint } from './TodoList'
import { useContext } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import styled from 'styled-components'

export const AddTodoForm = () => {
  const todoLogic = useContext(TodoContext)

  return (
    <Div_Form
      onSubmit={e => {
        e.preventDefault()
        todoLogic.addTodo(todoLogic.text)
        todoLogic.setText('')
        todoLogic.setfilterStatus('ALL')
      }}
    >
      <Div_Input
        type='text'
        value={todoLogic.text}
        placeholder='Enter your next task'
        onChange={e => todoLogic.setText(e.target.value)}
        required
      />
      <Button
        sx={{ fontSize: '16px' }}
        type='submit'
        variant='outlined'
        endIcon={<AddCircleIcon />}
      >
        Add Todo
      </Button>
    </Div_Form>
  )
}

const Div_Form = styled.form`
  display: flex;
  border-bottom: 2px solid ${theme.colors.lightGray};
  padding: 0.5rem;
  ${todoAppBreakpoint} {
    flex-direction: column;
  }
`
const Div_Input = styled.input`
  font-size: ${theme.fontSize.small};
  border: none;
  background-color: ${theme.colors.lightGray};
  &:enabled {
    outline: none;
  }
  ${todoAppBreakpoint} {
    padding: 1rem 0;
  }
`
