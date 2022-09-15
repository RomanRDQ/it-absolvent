import { Container, Link, Typography } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { theme, themeMUI } from '../theme'
import avatar from '../assets/img/avatar.jpg'
import styled, { keyframes } from 'styled-components'

export const Home = () => {
  return (
    <ThemeProvider theme={themeMUI}>
      <Container>
        <CustomCard>
          <Div_Text>
            <AnimatedGradientText>Hi, I&apos;m Roman</AnimatedGradientText>
            <Typography
              variant='subtitle1'
              color='primary'
              sx={{ textAlign: 'left', flex: '0 1 50%' }}
            >
              and I am currently looking for a possibility to implement my skills in Web
              Development. Well familiar with HTML5/CSS3/JS stack and creating adaptive layouts,
              have experience in working with React.js library for building user interfaces.
              Extremely detail-oriented, eager to be a part of the creative environment and make my
              input to it. Can prove myself as an excellent team player. I am available for an
              interview.
            </Typography>
            <Link href='mailto:rrudakevych@gmail.com'>
              Just <span>email</span>📧 me
            </Link>
          </Div_Text>
          <Div_Img>
            <img
              src={avatar}
              alt='Avatar'
              style={{
                maxWidth: '250px',
                borderRadius: '50%',
              }}
            />
          </Div_Img>
        </CustomCard>
      </Container>
    </ThemeProvider>
  )
}
const hue = keyframes`
 from {
   -webkit-filter: hue-rotate(0deg);
 }
 to {
   -webkit-filter: hue-rotate(-360deg);
 }
`

const Div_Img = styled.div`
  flex: '0 0 50%';
`

const Div_Text = styled.div`
  flex: '0 0 50%';
  padding: 1rem;
  a {
    cursor: pointer;
    text-decoration: none;
    &:hover {
      text-decoration: none;
    }
  }
  span {
    background-image: linear-gradient(92deg, #f35626, #feab3a);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-animation: ${hue} 5s infinite linear;
  }
`

const CustomCard = styled.div`
  ${theme.breakpoint.maxWidth.tablet} {
    display: flex;
    flex-direction: column;
  };
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  gap: 2rem;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: 1px solid transparent,
  border-image:
    linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%),
  border-image-slice: 50%,
`

const AnimatedGradientText = styled.h1`
  color: #f35626;
  background-image: linear-gradient(92deg, #f35626, #feab3a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-animation: ${hue} 5s infinite linear;
  font-family: ${theme.fontFamily.alt};
  text-align: left;
`
