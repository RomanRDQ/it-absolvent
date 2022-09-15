import { BlogApp } from './routes/Blog/BlogApp'
import { CV } from './routes/CV'
import { HackerTyper } from './routes/HackerTyper/HackerTyper'
import { Home } from './routes/Home'
import { Link, Route, Routes } from 'react-router-dom'
import { MemoryGame } from './routes/MemoryGame/MemoryGame'
import { MortgageCalculator } from './routes/MortgageCalculator/MortgageCalculator'
import { Projects } from './routes/Projects'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'
import { TodoListApp } from './routes/TodoListApp/TodoListApp'
import { TodoReduxApp } from './routes/TodoRedux/TodoReduxApp'
import { store } from './routes/TodoRedux/store'
import { theme } from './theme'
import { themeMUI } from './theme'
import { urls } from './urls'
import homelogo from './assets/img/homelogo.png'
import styled from 'styled-components'

export function App() {
  return (
    <ThemeProvider theme={themeMUI}>
      <Div_Nav>
        <Link
          to={urls.projects}
          style={{
            flex: '0 1 33%',
            display: 'flex',
            justifyContent: 'flex-end',
            paddingRight: '0',
          }}
        >
          Projects
        </Link>
        <Link to={urls.home} style={{ flex: '0 1 33%', display: 'flex', justifyContent: 'center' }}>
          <Styled_Img src={homelogo} alt='Home' />
        </Link>
        <Link to={urls.cv} style={{ flex: '0 1 33%' }}>
          CV
        </Link>
      </Div_Nav>
      <Routes>
        <Route path={urls.home} element={<Home />} />
        <Route path={urls.projects} element={<Projects />} />
        <Route path={urls.cv} element={<CV />} />
        <Route path={urls.todolist} element={<TodoListApp />} />
        <Route path={urls.hackerTyper} element={<HackerTyper />} />
        <Route path={urls.mortgageCalculator} element={<MortgageCalculator />} />
        <Route path={urls.memoryGame} element={<MemoryGame />} />
        <Route path={urls.blog.home} element={<BlogApp />} />

        <Route
          path={urls.todoRedux}
          element={
            <Provider store={store}>
              <TodoReduxApp />
            </Provider>
          }
        />
      </Routes>
    </ThemeProvider>
  )
}

const Styled_Img = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
`
const Div_Nav = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  padding: 1rem;
  margin: 1rem auto 3rem auto;
  a {
    text-decoration: none;
    color: ${theme.colors.white};
    font-size: ${theme.fontSize.medium};
    font-family: ${theme.fontFamily.alt};
    padding: 10px;
    border-bottom: 1px solid transparent;
    opacity: 0.8;
    &:hover {
      opacity: 1;
    }
    ${theme.breakpoint.maxWidth.tablet} {
      font-size: ${theme.fontSize.medium};
    }
    &:not(:nth-child(2n)) {
      &:hover {
        border-bottom: 1px solid transparent;
        border-image: linear-gradient(
          to bottom right,
          #b827fc 0%,
          #2c90fc 25%,
          #b8fd33 50%,
          #fec837 75%,
          #fd1892 100%
        );
        border-image-slice: 1;
        -webkit-transition: border-bottom 0.3s ease 0s;
      }
    }
  }
`
