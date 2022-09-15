import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'
import { getRandomId } from '../../utils/getRandomId'

//inspired by https://github.com/reduxjs/cra-template-redux-typescript/blob/master/template/src/features/counter/counterSlice.ts

export type Todo = {
  id: string
  text: string
  complete: boolean
}

type Filter = 'ALL' | 'COMPLETED' | 'ACTIVE'

export interface TodoAppState {
  todos: Todo[]
  filterStatus: Filter
  dragItemId: string
  dropItemId: string
}

const keyLocalStorage = 'tasks:list'

const getInitialStateFromLocalStorage = (key: string): Todo[] | [] => {
  try {
    const data = window.localStorage.getItem(key)
    return data ? JSON.parse(data) : []
  } catch {
    console.error
    return []
  }
}

const setStateToLocalStorage = (key: string, state: Todo[]) => {
  try {
    const data = JSON.stringify(state)
    window.localStorage.setItem(key, data)
  } catch {
    console.error
  }
}

const initialState: TodoAppState = {
  todos: getInitialStateFromLocalStorage(keyLocalStorage),
  filterStatus: 'ALL',
  dragItemId: '',
  dropItemId: '',
}

export const todoAppSlice = createSlice({
  name: 'todoApp',
  initialState,
  reducers: {
    addTodo: {
      // Redux Toolkit allows us to write immutable logic in reducers and "mutating" logic as well. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      reducer: (state, action: PayloadAction<Todo>) => {
        state.todos.push(action.payload)
        setStateToLocalStorage(keyLocalStorage, state.todos)
      },
      prepare: (text: string) => {
        const id = getRandomId()
        return { payload: { id, text, complete: false } as Todo }
      },
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        todos: [...state.todos].filter(todo => todo.id !== action.payload),
      }
    },
    toggleTodo: (state, action: PayloadAction<Todo>) => {
      const selectedTodoIndex = state.todos.findIndex(el => el.id === action.payload.id)
      state.todos.splice(selectedTodoIndex, 1, {
        ...action.payload,
        complete: !action.payload.complete,
      })
    },
    toggleFilter: (state, action: PayloadAction<Filter>) => {
      state.filterStatus = action.payload
    },
    changeOrder: state => {
      const draggedItemIndex = state.todos.findIndex(todo => todo.id === state.dragItemId)
      const droppedItemIndex = state.todos.findIndex(todo => todo.id === state.dropItemId)
      const dragItemContent = state.todos[draggedItemIndex]
      state.todos.splice(draggedItemIndex, 1)
      state.todos.splice(droppedItemIndex, 0, dragItemContent)
      setStateToLocalStorage(keyLocalStorage, state.todos)
    },
    updateDragItem: (state, action: PayloadAction<string>) => {
      state.dragItemId = action.payload
    },
    updateDropItem: (state, action: PayloadAction<string>) => {
      state.dropItemId = action.payload
    },
  },
})

export const todoActions = todoAppSlice.actions

export const selectTodos = (state: RootState) => state.todo.todos as Todo[]
export const selectFilterStatus = (state: RootState) => state.todo.filterStatus as Filter

export default todoAppSlice.reducer
