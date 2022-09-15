import { AddTodoForm } from './AddTodoForm'
import { Card } from '@mui/material'
import { Helmet } from 'react-helmet'
import { ThemeProvider } from '@mui/material/styles'
import { Todo } from './TodoListItem'
import { TodoList } from './TodoList'
import { genericHookContextBuilder } from '../../utils/genericHookContextBuilder'
import { getRandomId } from '../../utils/getRandomId'
import { theme } from '../../theme'
import { themeMUI } from '../../theme'
import { useLocalStorage } from '../../utils/useLocalStorage'
import { useState } from 'react'
import styled from 'styled-components'

export type Filter = 'ALL' | 'COMPLETED' | 'ACTIVE'

const useLogicState = () => {
  const [todos, setTodos] = useLocalStorage('tasks:list', [] as Todo[])
  const [filterStatus, setfilterStatus] = useLocalStorage('tasks:filter', 'ALL' as Filter)
  const [text, setText] = useState('')

  const addTodo = (text: string) => {
    setTodos([...todos, { id: getRandomId(), text, complete: false }])
  }

  const toggleTodo = (selectedTodo: Todo) => {
    setTodos(
      todos.map(todo => ({
        ...todo,
        complete: todo === selectedTodo ? !todo.complete : todo.complete,
      }))
    )
  }

  const deleteTodo = (selectedTodo: Todo) => {
    setTodos(todos.filter(todoToUpdate => todoToUpdate.id !== selectedTodo.id))
  }

  return {
    todos,
    setTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    filterStatus,
    setfilterStatus,
    text,
    setText,
  }
}

export const { ContextProvider: TodoContextProvider, Context: TodoContext } =
  genericHookContextBuilder(useLogicState)

export const TodoListApp = () => {
  return (
    <TodoContextProvider>
      <ThemeProvider theme={themeMUI}>
        <CustomisedCard>
          <Helmet>
            <title>Todo App - Rudakevych Roman</title>
            <link rel='canonical' href='http://rudakevych.site/todolist' />
          </Helmet>
          <AddTodoForm />
          <TodoList />
        </CustomisedCard>
      </ThemeProvider>
    </TodoContextProvider>
  )
}

const CustomisedCard = styled(Card)`
  max-width: 550px;
  margin 2rem auto;
  padding: 1rem 3rem 1rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid white;
  ${theme.breakpoint.maxWidth.mobileSmall} {
    margin: 0.5rem auto;
    padding: 0.5rem 1.5rem 0.5rem 1.5rem;

  }
`
