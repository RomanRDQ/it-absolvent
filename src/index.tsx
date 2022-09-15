import { App } from './App'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { themeMUI } from './theme'
import CssBaseline from '@mui/material/CssBaseline'
import ReactDOM from 'react-dom/client'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <BrowserRouter>
    <ThemeProvider theme={themeMUI}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </BrowserRouter>
)
