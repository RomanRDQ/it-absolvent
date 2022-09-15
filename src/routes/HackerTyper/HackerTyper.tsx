import { Helmet } from 'react-helmet'
import { codeExample } from './codeExample'
import { theme } from '../../theme'
import { useState } from 'react'
import styled from 'styled-components'

export const HackerTyper = () => {
  const [positionNumber, setPositionNumber] = useState(0)

  return (
    <form>
      <Helmet>
        <title>Hacker Typer App - Rudakevych Roman</title>
        <link rel='canonical' href='http://rudakevych.site/hackertyper' />
      </Helmet>
      <Textarea_styled
        spellCheck={false}
        value={
          positionNumber === 0 ? 'Click and start coding...' : codeExample.slice(0, positionNumber)
        }
        onChange={() =>
          setPositionNumber(positionNumber > codeExample.length ? 0 : positionNumber + 4)
        }
      />
    </form>
  )
}

const Textarea_styled = styled.textarea`
  display: block;
  color: white;
  border: 1px solid white;
  margin: 2rem auto 0 auto;
  width: 80%;
  height: 60vh;
  text-align: left;
  resize: none;
  over-flow: scroll;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%), 0 25px 50px 0 rgb(0 0 0 / 10%);
  background-color: ${theme.colors.gray};
  ${theme.breakpoint.maxWidth.tablet} {
    font-size: ${theme.fontSize.small};
  }
`
