import styled from 'styled-components'

import { IContainer } from './types'

export const Container = styled.div<IContainer>`
  align-items: center;
  display: flex;
  border-bottom: 1px solid
    ${(props) =>
      props.withBottomLine
        ? props.theme.colors['lightest-grey']
        : 'transparent'};
  cursor: ${(props) => (props.isClickable ? 'cursor' : 'initial')};
  margin-bottom: ${(props) => props.marginBottom ?? 0}px;
  padding: 8px 0;

  ${(props) =>
    props.isClickable
      ? `
    &:active {
      filter: brightness(105%);
    }`
      : ''}
`

export const TextWrapper = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;
  flex-grow: 1;
`
