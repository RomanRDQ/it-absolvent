import { Card, Container, Link, Typography } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { theme, themeMUI } from '../theme'
import styled from 'styled-components'

export const CV = () => {
  return (
    <ThemeProvider theme={themeMUI}>
      <CustomContainer>
        <Typography variant='h2' color='primary' sx={{ textAlign: 'center', marginBottom: '2rem' }}>
          CV
        </Typography>
        <CustomCard>
          <Typography variant='h4' color='primary' sx={{ textAlign: 'left' }}>
            Roman Rudakevyč
          </Typography>
          <Custom_ul>
            <li>
              <Typography variant='h6' color='primary' sx={{ textAlign: 'left' }}>
                Prague, CZ
              </Typography>
            </li>
            <li>
              <Typography variant='h6' color='primary' sx={{ textAlign: 'left' }}>
                +420 732 590 616
              </Typography>
            </li>
            <li>
              <Link href='mailto:rrudakevych@gmail.com'>
                <Typography variant='h6' color='primary' sx={{ textAlign: 'left' }}>
                  rrudakevych@gmail.com
                </Typography>
              </Link>
            </li>
          </Custom_ul>
          <ColorBorderTypography variant='h4' color='primary' sx={{ textAlign: 'left' }}>
            Professional Skills
          </ColorBorderTypography>
          <ul>
            <li>React.js, JavaScript (ES6+, Node.js, Typescript)</li>
            <li>Material UI, styled-components</li>
            <li>GitLab, GitHub</li>
          </ul>
          <ColorBorderTypography variant='h4' color='primary' sx={{ textAlign: 'left' }}>
            Education
          </ColorBorderTypography>
          <ul>
            <li>
              <Typography variant='h6' color='primary' sx={{ textAlign: 'left' }}>
                SoftServe IT Academy
              </Typography>
              Jan – Feb 2021 : HTML5/ CSS3/ JS FUNDAMENTALS <br />
              Feb – Jun 2021 : React.js Marathon
            </li>
            <li>
              <Typography variant='h6' color='primary' sx={{ textAlign: 'left' }}>
                Learn2Code.cz
              </Typography>
              Jan 2022 : Web Rebel HTML/CSS/JS <br />
              Feb 2022 : React.js
            </li>
            <li>
              <Typography variant='h6' color='primary' sx={{ textAlign: 'left' }}>
                Smartbrains ITAbsolvent
              </Typography>
              Jun - Sep 2022 : React.js, Node.js, TypeScript
            </li>
          </ul>
          <ColorBorderTypography variant='h4' color='primary' sx={{ textAlign: 'left' }}>
            Language Skills
          </ColorBorderTypography>
          <ul>
            <li>Czech - proficient</li>
            <li>English - upper intermediate</li>
            <li>Ukrainian - native</li>
          </ul>
        </CustomCard>
      </CustomContainer>
    </ThemeProvider>
  )
}

const ColorBorderTypography = styled(Typography)`
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
const Custom_ul = styled.ul`
  list-style-type: none;
`
const CustomContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const CustomCard = styled(Card)`
  margin: 0 auto;
  max-width: 650px;
  padding: 2rem;
  border: 1px solid ${theme.colors.white};
  li {
    color: ${theme.colors.lightGray};
  }
  margin-bottom: 0.5rem;
`
