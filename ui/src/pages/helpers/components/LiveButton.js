import { Box, Link, Button } from '@chakra-ui/react';

const liveScStyle = {
  border: '5px',
  backgroundColor: '#D46764',
  color: 'white',
  fontWeight: '800',
  align: 'center',
  fontFamily: 'Manrope',
  letterSpacing: '0.006rem',
};

const LiveButton = () => {
  return (
    <Link href="/online" style={{ lineHeight: '0' }}>
      <Button
        h="6"
        paddingLeft={{ base: '1', sm: '1', lg: '0' }}
        paddingRight="3"
        style={liveScStyle}
        lineHeight="0"
        borderRadius="6"
        fontSize={{ base: '0.75rem', md: '0.6rem', lg: '0.75rem' }}
      >
        <Box
          fontSize={{ base: '1.455rem', md: '1.75rem', lg: '1.75rem' }}
          paddingBottom="1"
        >
          &bull;{' '}
        </Box>
        LIVE
      </Button>
    </Link>
  );
};

export default LiveButton;
