import {
  Button,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Input,
  TextareaAutosize,
  Typography,
} from '@mui/material'
import { PostManagerContext } from '../PostManager/PostManagerContext'
import { Preloader } from '../../../components/Preloader/Preloader'
import { theme } from '../../../theme'
import { useContext } from 'react'
import styled from 'styled-components'

export const PostManager = () => {
  const logic = useContext(PostManagerContext)

  return (
    <div>
      {logic.loading ? (
        <Preloader />
      ) : (
        <Div_PostManager>
          <FormGroup>
            <Div_FormControlLabel>
              <CustomisedFormControlLabel
                control={
                  <CustomisedInput
                    required
                    error={logic.title.length === 0}
                    type='text'
                    value={logic.title}
                    onChange={e => logic.setTitle(e.target.value.trim())}
                    placeholder='Enter title name'
                  />
                }
                label={''}
              />
              {logic.title.length === 0 && (
                <FormHelperText
                  sx={{ display: 'flex', alignSelf: 'center', color: theme.colors.error }}
                >
                  Title length must be bigger than 0
                </FormHelperText>
              )}
            </Div_FormControlLabel>

            <Div_FormControlLabel>
              <CustomisedFormControlLabel
                control={
                  <CustomisedInput
                    required
                    type='text'
                    value={logic.author}
                    onChange={e => logic.setAuthor(e.target.value.trim())}
                    error={logic.author.length === 0}
                    placeholder='Enter author name'
                  />
                }
                label={''}
              />
              {logic.author.length === 0 && (
                <FormHelperText
                  sx={{ display: 'flex', alignSelf: 'center', color: theme.colors.error }}
                >
                  Author length must be bigger than 0
                </FormHelperText>
              )}
            </Div_FormControlLabel>

            <Div_FormControlLabel>
              <CustomisedFormControlLabel
                control={
                  <TextareaAutosize
                    value={logic.text}
                    minRows={15}
                    placeholder='Enter markdown content'
                    style={{ width: 500 }}
                    onChange={e => logic.setText(e.target.value.trim())}
                    required
                  />
                }
                label={''}
              />
              {logic.text.length === 0 && (
                <FormHelperText
                  sx={{ display: 'flex', alignSelf: 'center', color: theme.colors.error }}
                >
                  Markdown content must be bigger than 0
                </FormHelperText>
              )}
            </Div_FormControlLabel>
            <Typography
              variant='subtitle2'
              sx={{ textAlign: 'center', marginBottom: '1rem', color: 'red' }}
            >
              {logic.error}
            </Typography>
            <Button onClick={logic.handleSubmit}>Submit</Button>
          </FormGroup>
        </Div_PostManager>
      )}
    </div>
  )
}

const Div_PostManager = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`

const Div_FormControlLabel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 1rem;
  color: ${theme.colors.white};
`
const CustomisedFormControlLabel = styled(FormControlLabel)`
  display: flex;
  flex-direction: column;
  input {
    text-align: center;
  }
  textarea {
    background-color: ${theme.colors.lightGray};
  }
`
const CustomisedInput = styled(Input)`
  input {
    color: ${theme.colors.white};
  }
`
