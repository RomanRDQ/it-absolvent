import { Button, Card, Typography } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { delay } from '../../utils/delay'
import { getRandomId } from '../../utils/getRandomId'
import { shuffleArray } from '../../utils/shuffleArray'
import { theme } from '../../theme'
import { themeMUI } from '../../theme'
import { useState } from 'react'
import Helmet from 'react-helmet'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import hiddenImg from './img/hidden.jpg'
import img1 from './img/img1.jpg'
import img2 from './img/img2.jpg'
import img3 from './img/img3.jpg'
import img4 from './img/img4.jpg'
import img5 from './img/img5.jpg'
import img6 from './img/img6.jpg'
import img7 from './img/img7.jpg'
import img8 from './img/img8.jpg'
import styled from 'styled-components'

type CardType = ReturnType<typeof createBoard>[number]

const cards = [img1, img2, img3, img4, img5, img6, img7, img8]

const createBoard = () =>
  [...cards, ...cards].map(card => ({
    id: getRandomId(),
    flipped: false,
    backImage: hiddenImg,
    frontImage: card,
    frozen: true,
  }))

const CardItem = (props: { card: CardType; callback: (card: CardType) => void }) => {
  const handleClick = () => {
    if (props.card.frozen) props.callback(props.card)
  }
  return (
    <Div_Wrapper onClick={handleClick}>
      <Img_Frontside flipped={props.card.flipped} src={props.card.frontImage} />
      <Img_Backside flipped={props.card.flipped} src={props.card.backImage} />
    </Div_Wrapper>
  )
}

export const MemoryGame = () => {
  const [cards, setCards] = useState(shuffleArray(createBoard()))
  const [turns, setTurns] = useState(0)
  const [clickedCardImg, setClickedCardImg] = useState(
    undefined as undefined | CardType['frontImage']
  )

  const handleCardClick = async (currentCard: CardType) => {
    setTurns(prev => prev + 1)
    setCards(prev =>
      prev.map(card =>
        card.id === currentCard.id ? { ...card, flipped: true, frozen: false } : card
      )
    )
    if (!clickedCardImg) {
      setClickedCardImg(currentCard.frontImage)
      return
    }
    if (clickedCardImg === currentCard.frontImage) {
      setCards(prev =>
        prev.map(card =>
          card.frontImage === clickedCardImg || card.frontImage === currentCard.frontImage
            ? { ...card, frozen: false }
            : card
        )
      )
      setClickedCardImg(undefined)
      return
    }
    await delay(500)
    setCards(prev =>
      prev.map(card =>
        card.frontImage === clickedCardImg || card.id === currentCard.id
          ? { ...card, flipped: false, frozen: true }
          : card
      )
    )
    setClickedCardImg(undefined)
  }

  const handleReset = () => {
    setCards(shuffleArray(createBoard()))
    setClickedCardImg(undefined)
    setTurns(0)
  }

  return (
    <ThemeProvider theme={themeMUI}>
      <Helmet>
        <title>Memory Game - Rudakevych Roman</title>
        <link rel='canonical' href='http://rudakevych.site/memorygame' />
      </Helmet>
      <CustomisedCard>
        <Typography variant='h4' color='primary' sx={{ textAlign: 'center' }}>
          Memory Game
        </Typography>
        <Button endIcon={<RestartAltIcon />} onClick={handleReset}>
          Reset Game
        </Button>
        <Typography variant='h4' color='primary' sx={{ textAlign: 'center' }}>
          {turns}
        </Typography>
        <Typography variant='h4' color='primary' sx={{ textAlign: 'center' }}>
          {cards.every(el => !el.frozen) ? 'Congratulations! You win!' : ''}
        </Typography>
        <Div_Board>
          {cards.map(card => (
            <CardItem key={card.id} card={card} callback={handleCardClick} />
          ))}
        </Div_Board>
      </CustomisedCard>
    </ThemeProvider>
  )
}

export const CustomisedCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin 2rem auto;
  max-width: 550px;
  border: 1px solid white;
  ${theme.breakpoint.minWidth.tablet} {
    padding: 1rem 3rem 1rem 3rem;
  }
`

const Div_Wrapper = styled.div`
  position: relative;
  perspective: 2000px;
`

const Img_Frontside = styled.img<{ flipped: boolean }>`
  width: 100%;
  height: 100%;
  transition: all 0.5s;
  backface-visibility: hidden;
  cursor: pointer;
  transform-style: preserve-3d;
  z-index: ${props => (props.flipped ? 2 : 1)};
  transform: ${props => (props.flipped ? 'rotate(0deg)' : 'rotateY(180deg)')};
`

const Img_Backside = styled(Img_Frontside)`
  z-index: ${props => (props.flipped ? 1 : 2)};
  transform: ${props => (props.flipped ? 'rotateY(180deg)' : 'rotate(360deg)')};
  position: absolute;
  top: 0px;
  left: 0px;
`

const Div_Board = styled.div`
  max-width: 450px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 0.5rem;
  margin: auto;
  padding-top: 1rem;
`
