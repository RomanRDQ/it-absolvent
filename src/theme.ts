import { createTheme } from '@mui/material/styles'

const fontAlt = "'Satisfy', mono-space"
const fontMain = "'Open Sans', mono-space"

export const themeMUI = createTheme({
  typography: {
    fontSize: 14,
    fontFamily: fontMain,
    h4: {
      '@media (max-width: 479.98px)': {
        fontSize: '1.5rem',
      },
    },
    h2: {
      fontFamily: fontAlt,
    },
    h5: {
      fontFamily: fontAlt,
    },
  },
  palette: {
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#FFD700',
    },
    background: {
      paper: '#292929',
      default: '#1d1d1d',
    },
  },
})

export const theme = {
  colors: {
    white: '#ffffff',
    gray: '#616161',
    gold: '#FFD700',
    black: '#000000',
    lightGray: '#D3D3D3',
    gradient: 'linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet, red)',
  },
  breakpoint: {
    maxWidth: {
      mobileSmall: '@media (max-width: 479.98px)',
      mobile: '@media (max-width: 767.98px)',
      tablet: '@media (max-width: 991.98px)',
    },
    minWidth: {
      mobileSmall: '@media (min-width: 479.98px)',
      mobile: '@media (min-width: 767.98px)',
      tablet: '@media (min-width: 991.98px)',
    },
  },
  fontSize: {
    extraSmall: '1rem',
    small: '1.5rem',
    medium: '2rem',
    big: '4rem',
    extraBig: '8rem',
  },
  fontFamily: {
    main: fontMain,
    alt: fontAlt,
  },
} as const
