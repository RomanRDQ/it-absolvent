import { Container, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { theme, themeMUI } from '../theme'
import { urls } from '../urls'
import GitHubIcon from '@mui/icons-material/GitHub'
import blog from '../assets/img/blog.png'
import hackertyper from '../assets/img/hackertyper.png'
import memorygame from '../assets/img/memorygame.png'
import mortgage from '../assets/img/mortgage.png'
import styled from 'styled-components'
import todolist from '../assets/img/todolist-try.png'

export const Projects = () => {
  return (
    <ThemeProvider theme={themeMUI}>
      <Container>
        <Typography variant='h2' color='primary' sx={{ textAlign: 'center', marginBottom: '2rem' }}>
          Projects
        </Typography>
        <Flex_Container>
          <Flex_Item>
            <Card_Header>
              <Typography variant='h5' color='primary' sx={{ textAlign: 'left' }}>
                Blog
              </Typography>
              <Div_Actions>
                <Link to={urls.blog.home}>Demo</Link>
                <GitHubIcon fontSize='large' />
              </Div_Actions>
            </Card_Header>
            <Card_Image>
              <img src={blog} />
            </Card_Image>
          </Flex_Item>
          <Flex_Item>
            <Card_Header>
              <Typography variant='h5' color='primary' sx={{ textAlign: 'left' }}>
                Mortgage
              </Typography>
              <Div_Actions>
                <Link to={urls.mortgageCalculator}>Demo</Link>
                <GitHubIcon fontSize='large' />
              </Div_Actions>
            </Card_Header>
            <Card_Image>
              <img src={mortgage} />
            </Card_Image>
          </Flex_Item>
        </Flex_Container>
        <Flex_Container>
          <Flex_Item>
            <Card_Header>
              <Typography variant='h5' color='primary' sx={{ textAlign: 'left' }}>
                Memory Game
              </Typography>
              <Div_Actions>
                <Link to={urls.memoryGame}>Demo</Link>
                <GitHubIcon fontSize='large' />
              </Div_Actions>
            </Card_Header>
            <Card_Image>
              <img src={memorygame} />
            </Card_Image>
          </Flex_Item>
          <Flex_Item>
            <Card_Header>
              <Typography variant='h5' color='primary' sx={{ textAlign: 'left' }}>
                Hacker Typer
              </Typography>
              <Div_Actions>
                <Link to={urls.hackerTyper}>Demo</Link>
                <GitHubIcon fontSize='large' />
              </Div_Actions>
            </Card_Header>
            <Card_Image>
              <img src={hackertyper} />
            </Card_Image>
          </Flex_Item>
        </Flex_Container>
        <Flex_Container>
          <Flex_Item>
            <Card_Header>
              <Typography variant='h5' color='primary' sx={{ textAlign: 'left' }}>
                Todos (Context)
              </Typography>
              <Div_Actions>
                <Link to={urls.todolist}>Demo</Link>
                <GitHubIcon fontSize='large' />
              </Div_Actions>
            </Card_Header>
            <Card_Image>
              <img src={todolist} />
            </Card_Image>
          </Flex_Item>
          <Flex_Item>
            <Card_Header>
              <Typography variant='h5' color='primary' sx={{ textAlign: 'left' }}>
                Todos (Redux)
              </Typography>
              <Div_Actions>
                <Link to={urls.todoRedux}>Demo</Link>
                <GitHubIcon fontSize='large' />
              </Div_Actions>
            </Card_Header>
            <Card_Image>
              <img src={todolist} />
            </Card_Image>
          </Flex_Item>
        </Flex_Container>
      </Container>
    </ThemeProvider>
  )
}

const Flex_Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  margin: 0 10px 3rem 10px;
  ${theme.breakpoint.minWidth.tablet} {
    flex-direction: row;
  }
`

const Flex_Item = styled.div`
  flex: 0 1 50%;
  border: 1px solid white;
  border-radius: 20px;
  max-width: 420px;
  background-color: #292929;
`

const Card_Image = styled.div`
  img {
    display: block;
  }
  width: 360px;
  height: 190px;
  display: flex;
  flex-direction: center;
  margin: 2rem auto;
`

const Div_Actions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  a {
    color: ${theme.colors.white};
    &:hover {
      text-decoration: none;
    }
  }
`
const Card_Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem;
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
`
