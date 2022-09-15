import { Box } from '@mui/material'
import { FilterButtons } from './FilterButtons'
import { TodoContext } from './TodoListApp'
import { TodoListItem } from './TodoListItem'
import { theme } from '../../theme'
import { useContext } from 'react'
import styled from 'styled-components'

export const TodoList = () => {
  const todoLogic = useContext(TodoContext)

  return (
    <>
      <Ul_styled>
        {todoLogic.todos
          .filter(todo => {
            return todoLogic.filterStatus === 'ALL'
              ? true
              : todoLogic.filterStatus === 'ACTIVE'
              ? !todo.complete
              : todo.complete
          })
          .map(todo => (
            <TodoListItem key={todo.id} todo={todo} />
          ))}
      </Ul_styled>
      <CustomisedFooter>
        <Div_Count>{todoLogic.todos.filter(todo => !todo.complete).length} items left</Div_Count>
        <FilterButtons />
      </CustomisedFooter>
    </>
  )
}

export const todoAppBreakpoint = '@media (max-width: 666.66px)'

const Div_Count = styled.div`
  font-family: ${theme.fontFamily.main};
  color: ${theme.colors.white};
  ${todoAppBreakpoint} {
    font-size: ${theme.fontSize.extraSmall};
  }
`

const CustomisedFooter = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;
  ${todoAppBreakpoint} {
    flex-direction: column;
    gap: 0.3rem;
  }
`

const Ul_styled = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  list-style-type: none;
  padding-left: 0;
  color: ${theme.colors.white};
  word-break: break-all;
`
