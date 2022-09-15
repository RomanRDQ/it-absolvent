import { Card, Typography } from '@mui/material'
import { Input } from '@mui/material'
import { Link } from 'react-router-dom'
import { PostListContext } from './PostListContext'
import { Preloader } from '../../../components/Preloader/Preloader'
import { theme } from '../../../theme'
import { urls } from '../../../urls'
import { useContext } from 'react'
import styled from 'styled-components'

export type PostType = {
  id: string
  slug: string
  body: {
    title: string
    text: string
    author: string
  }
}

export const PostList = () => {
  const logic = useContext(PostListContext)
  return (
    <PostList_Div>
      <Input
        type='text'
        value={logic.input}
        placeholder='Find your post'
        onChange={e => logic.searchInputHandler(e.target.value)}
      />
      <Typography
        variant='subtitle2'
        sx={{ textAlign: 'center', marginBottom: '1rem', color: 'red' }}
      >
        {logic.error}
      </Typography>
      {logic.loading ? (
        <Preloader />
      ) : (
        (logic.filterPosts.length === 0 && logic.input.length === 0
          ? logic.postData
          : logic.filterPosts
        ).map(post => <PostMini key={post.id} post={post} />)
      )}
    </PostList_Div>
  )
}

const PostMini = (props: { post: PostType }) => {
  return (
    <Styled_Link to={urls.blog.post.detail(props.post.slug)}>
      <CustomisedCard>
        <Typography variant='h4' color='primary' sx={{ textAlign: 'center' }}>
          {props.post.body.title}
        </Typography>
        <Typography variant='subtitle1' color='primary' sx={{ textAlign: 'center' }}>
          by {props.post.body.author}
        </Typography>
      </CustomisedCard>
    </Styled_Link>
  )
}

const Styled_Link = styled(Link)`
  text-decoration: none;
`

const CustomisedCard = styled(Card)`
  max-width: 550px;
  margin 2rem auto;
  padding: 1rem 3rem 1rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${theme.breakpoint.maxWidth.mobileSmall} {
    margin: 0.5rem auto;
    padding: 0.5rem 1.5rem 0.5rem 1.5rem;

  }
`
const PostList_Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  input {
    text-align: center;
    color: ${theme.colors.white};
  }
`
