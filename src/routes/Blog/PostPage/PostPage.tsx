import { Button, Card, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { PostPageContext } from './PostPageContext'
import { Preloader } from '../../../components//Preloader/Preloader'
import { theme } from '../../../theme'
import { urls } from '../../../urls'
import { useContext } from 'react'
import Markdown from 'marked-react'
import styled from 'styled-components'

export const PostPage = () => {
  const logic = useContext(PostPageContext)

  return (
    <div>
      {logic.post ? (
        logic.loading ? (
          <Preloader />
        ) : (
          <CustomisedCard>
            <Typography
              variant='h6'
              color='primary'
              sx={{ textAlign: 'center', marginBottom: '1rem' }}
            >
              {logic.error}
            </Typography>
            <Styled_Link to={urls.blog.page}>
              <Button onClick={logic.removePostHandler}>Remove post</Button>
            </Styled_Link>
            <Styled_Link to={urls.blog.post.editUsing(logic.slug!)}>
              <Button onClick={logic.editPostHandler}>Edit post</Button>
            </Styled_Link>
            <Typography
              variant='h3'
              color='primary'
              sx={{ textAlign: 'center', marginBottom: '1rem' }}
            >
              {logic.post?.body.title}
            </Typography>

            <Typography
              variant='subtitle2'
              color='primary'
              sx={{ textAlign: 'center', marginBottom: '1rem' }}
            >
              written by {logic.post?.body.author}
            </Typography>

            {logic.post?.body.text !== '' ? (
              <Markdown>{logic.post?.body.text}</Markdown>
            ) : (
              <CustomisedP>This post has no content</CustomisedP>
            )}
          </CustomisedCard>
        )
      ) : (
        <span>404: Not Found</span>
      )}
    </div>
  )
}

const CustomisedP = styled.p`
  color: ${theme.colors.white};
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
const Styled_Link = styled(Link)`
  text-decoration: none;
`
