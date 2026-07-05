import styled from '@emotion/styled';
import React from 'react';
import remixiconUrl from 'remixicon/fonts/remixicon.symbol.svg';
import { Box, Button } from '@chakra-ui/react';

const StyledButton = styled(Box)({
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: '0.4rem',
  color: '#fff',
  cursor: 'pointer',
  height: '1.75rem',
  marginRight: '0.25rem',
  padding: '0.25rem',
  width: '1.75rem',

  svg: {
    fill: 'currentColor',
    height: '100%',
    width: '100%',
  },

  '&:hover, & .is-active': {
    backgroundColor: '#303030',
  },
});
export default ({ icon, title, action, isActive = null }) => (
  <StyledButton
    className={`menu-item${isActive && isActive() ? ' is-active' : ''}`}
    onClick={action}
    title={title}
  >
    <svg className="remix">
      <use xlinkHref={`${remixiconUrl}#ri-${icon}`} />
    </svg>
  </StyledButton>
);
