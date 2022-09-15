import { Tab, Tabs } from '@mui/material'
import { TodoContext } from './TodoListApp'
import { useContext } from 'react'

export const FilterButtons = () => {
  const todoLogic = useContext(TodoContext)
  return (
    <Tabs
      value={todoLogic.filterStatus}
      textColor='primary'
      indicatorColor='secondary'
      aria-label='controls'
    >
      <Tab value='ALL' label='All' onClick={() => todoLogic.setfilterStatus('ALL')} />
      <Tab value='ACTIVE' label='Active' onClick={() => todoLogic.setfilterStatus('ACTIVE')} />
      <Tab
        value='COMPLETED'
        label='Completed'
        onClick={() => todoLogic.setfilterStatus('COMPLETED')}
      />
    </Tabs>
  )
}
