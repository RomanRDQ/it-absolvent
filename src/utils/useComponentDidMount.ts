import { useEffect } from 'react'

export const useComponentDidMount = (fn: () => void) => {
  useEffect(() => {
    fn()
  }, [])
}
