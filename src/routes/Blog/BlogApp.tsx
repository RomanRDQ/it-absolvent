import { Card } from '@mui/material'
import { Helmet } from 'react-helmet'
import { Link, Route, Routes } from 'react-router-dom'
import { MemoryGame } from '../MemoryGame/MemoryGame'
import { PostList } from './PostList/PostList'
import { PostListContextProvider } from '../Blog/PostList/PostListContext'
import { PostManager } from './PostManager/PostManager'
import { PostManagerContextProvider } from '../Blog/PostManager/PostManagerContext'
import { PostPage } from './PostPage/PostPage'
import { PostPageContextProvider } from '../Blog/PostPage/PostPageContext'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../../theme'
import { themeMUI } from '../../theme'
import { urls } from '../../urls'
import styled from 'styled-components'

export const BlogApp = () => {
  return (
    <ThemeProvider theme={themeMUI}>
      <CustomisedCard>
        <Helmet>
          <title>Blog App - Rudakevych Roman</title>
          <link rel='canonical' href='http://rudakevych.site/blog' />
        </Helmet>
        <Div_Nav>
          <Styled_Link to={urls.blog.post.listAsLink()}>Posts</Styled_Link>
          <Styled_Link to={urls.blog.post.newAsLink()}>New Post +</Styled_Link>
        </Div_Nav>
        <Routes>
          <Route
            path={urls.blog.post.list}
            element={
              <PostListContextProvider>
                <PostList />
              </PostListContextProvider>
            }
          />
          <Route
            path={urls.blog.post.newAsRoute}
            element={
              <PostManagerContextProvider>
                <PostManager />
              </PostManagerContextProvider>
            }
          />
          <Route
            path={urls.blog.post.edit}
            element={
              <PostManagerContextProvider>
                <PostManager />
              </PostManagerContextProvider>
            }
          />
          <Route
            path={urls.blog.post.page}
            element={
              <PostPageContextProvider>
                <PostPage />
              </PostPageContextProvider>
            }
          />
        </Routes>
      </CustomisedCard>
    </ThemeProvider>
  )
}

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
const Div_Nav = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  gap: 5rem;
  a {
    text-decoration: none;
    color: ${theme.colors.white};
    font-size: ${theme.fontSize.small};
    font-family: ${theme.fontFamily.main};
    ${theme.breakpoint.maxWidth.tablet} {
      font-size: ${theme.fontSize.medium};
    }
    &:hover {
      color: ${theme.colors.gold};
    }
  }
`

const Styled_Link = styled(Link)`
  text-decoration: none;
`
