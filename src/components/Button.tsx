import { theme } from '../theme'
import styled from 'styled-components'

type Props = { children: string; onClick: () => void }

export const Button = (props: Props) => {
  return <Div_Button onClick={props?.onClick}>{props.children}</Div_Button>
}

const Div_Button = styled.a`
  font-size: 2rem;
  border-radius: 20px;
  color: ${theme.colors.gray};
  background: ${theme.colors.white};
  padding: 10px;
  border: 2px solid ${theme.colors.gold};
  &:hover {
    background: ${theme.colors.gold};
  }
  ${theme.breakpoint.maxWidth.tablet} {
    font-size: ${theme.fontSize.medium};
  }
`
