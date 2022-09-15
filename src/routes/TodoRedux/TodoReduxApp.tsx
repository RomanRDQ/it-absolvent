import { Box, Button, Card, Checkbox, FormControlLabel, FormGroup, Tab, Tabs } from '@mui/material'
import { Helmet } from 'react-helmet'
import { ThemeProvider } from '@mui/material/styles'
import { Todo } from './TodoAppSlice'
import { selectFilterStatus, selectTodos } from './TodoAppSlice'
import { theme } from '../../theme'
import { themeMUI } from '../../theme'
import { todoActions } from './TodoAppSlice'
import { useAppDispatch, useAppSelector } from './typedHooksRedux'
import { useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import CloseIcon from '@mui/icons-material/Close'
import React from 'react'
import styled from 'styled-components'

type Props = {
  todo: Todo
}

export const TodoReduxApp = () => {
  const todos = useAppSelector(selectTodos)
  const filterStatus = useAppSelector(selectFilterStatus)
  const dispatch = useAppDispatch()
  const [input, setInput] = useState('')

  return (
    <ThemeProvider theme={themeMUI}>
      <CustomisedCard>
        <Helmet>
          <title>TodoRedux App - Rudakevych Roman</title>
          <link rel='canonical' href='http://rudakevych.site/todolist' />
        </Helmet>
        <Div_Form
          onSubmit={e => {
            e.preventDefault()
            dispatch(todoActions.addTodo(input))
            setInput('')
            dispatch(todoActions.toggleFilter('ALL'))
          }}
        >
          <Div_Input
            type='text'
            value={input}
            placeholder='Enter your next task'
            onChange={e => setInput(e.target.value)}
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
        <Ul_styled>
          {todos
            .filter(todo => {
              return filterStatus === 'ALL'
                ? true
                : filterStatus === 'ACTIVE'
                ? !todo.complete
                : todo.complete
            })
            .map(todo => (
              <TodoListItem key={todo.id} todo={todo} />
            ))}
        </Ul_styled>
        <CustomisedFooter>
          <Div_Count>{todos.filter(todo => !todo.complete).length} items left</Div_Count>
          <Tabs
            value={filterStatus}
            textColor='primary'
            indicatorColor='secondary'
            aria-label='controls'
          >
            <Tab
              value='ALL'
              label='All'
              onClick={() => dispatch(todoActions.toggleFilter('ALL'))}
            />
            <Tab
              value='ACTIVE'
              label='Active'
              onClick={() => dispatch(todoActions.toggleFilter('ACTIVE'))}
            />
            <Tab
              value='COMPLETED'
              label='Completed'
              onClick={() => dispatch(todoActions.toggleFilter('COMPLETED'))}
            />
          </Tabs>
        </CustomisedFooter>
      </CustomisedCard>
    </ThemeProvider>
  )
}

const TodoListItem = (props: Props) => {
  const dispatch = useAppDispatch()

  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    dispatch(todoActions.updateDragItem(id))
  }

  const dragEnterHandler = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    dispatch(todoActions.updateDropItem(id))
  }

  const dragDropHandler = () => {
    dispatch(todoActions.changeOrder())
    dispatch(todoActions.toggleFilter('ALL'))
  }

  return (
    <div>
      <FormGroup>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '20fr 1fr',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          key={props.todo.id}
          draggable
          onDragStart={e => {
            dragStartHandler(e, props.todo.id)
          }}
          onDragEnter={e => {
            dragEnterHandler(e, props.todo.id)
          }}
          onDragEnd={dragDropHandler}
        >
          <FormControlLabel
            control={<Checkbox />}
            label={props.todo.text}
            checked={props.todo.complete}
            onClick={() => dispatch(todoActions.toggleTodo(props.todo))}
          />
          <CustomisedCloseIcon
            fontSize='small'
            onClick={() => dispatch(todoActions.removeTodo(props.todo.id))}
          />
        </Box>
      </FormGroup>
      {props.todo.complete}
    </div>
  )
}

const todoAppBreakpoint = '@media (max-width: 666.66px)'

const CustomisedCloseIcon = styled(CloseIcon)`
  display: block;
  &:hover {
    color: ${theme.colors.gold};
  }
`

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

const Div_Count = styled.div`
  font-family: ${theme.fontFamily.main};
  color: ${theme.colors.gray};
  ${todoAppBreakpoint} {
    font-size: ${theme.fontSize.extraSmall};
  }
  color: ${theme.colors.white};
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
  color: ${theme.colors.gray};
  word-break: break-all;
  color: ${theme.colors.white};
`

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
