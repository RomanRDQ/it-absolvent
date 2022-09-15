import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from './store'
import type { TypedUseSelectorHook } from 'react-redux'

//inspired by https://redux-toolkit.js.org/tutorials/typescript

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
