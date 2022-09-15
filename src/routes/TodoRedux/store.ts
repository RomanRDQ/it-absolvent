import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './TodoAppSlice'

//inspired by https://redux-toolkit.js.org/tutorials/typescript

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
