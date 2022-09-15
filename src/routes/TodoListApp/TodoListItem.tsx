import { Box, Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import { TodoContext } from './TodoListApp'
import { theme } from '../../theme'
import { useContext } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import styled from 'styled-components'

export type Todo = {
  id: string
  text: string
  complete: boolean
}

type Props = {
  todo: Todo
}

export const TodoListItem = (props: Props) => {
  const todoLogic = useContext(TodoContext)
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
        >
          <FormControlLabel
            control={<Checkbox />}
            label={props.todo.text}
            checked={props.todo.complete}
            onClick={() => todoLogic.toggleTodo(props.todo)}
          />
          <CustomisedCloseIcon fontSize='small' onClick={() => todoLogic.deleteTodo(props.todo)} />
        </Box>
      </FormGroup>
    </div>
  )
}

const CustomisedCloseIcon = styled(CloseIcon)`
  display: block;
  &:hover {
    color: ${theme.colors.gold};
  }
`
