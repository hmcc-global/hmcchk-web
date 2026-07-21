import { Box, Text, VStack } from 'components';
import { Link } from 'react-router-dom';

// Background is the exact Figma-composited artwork for node 1001:341
// (navy→blue gradient with the world-map watermark blended in), so the
// gradient and the subtle map match the design pixel-for-pixel.
const BANNER_BG =
  process.env.PUBLIC_URL + '/images/about/ten-year-banner-bg.png';

const TenYearCommitmentBanner = () => {
  return (
    <Link
      to={{ pathname: '/10y-commitment' }}
      style={{ textDecoration: 'none', display: 'block', width: '100%' }}
      aria-label="Learn about our 10 Year Commitment as a Global Family of Churches"
    >
      <Box
        w="100%"
        borderRadius="17px"
        overflow="hidden"
        bgColor="#00124F"
        bgImage={`url('${BANNER_BG}')`}
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        transition="transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out"
        _hover={{
          transform: 'scale(1.005)',
          boxShadow: '0 10px 30px rgba(1, 22, 96, 0.35)',
        }}
      >
        <VStack spacing={[2]} py={[9, 16]} px={[6, 10]} textAlign="center">
          <Text
            color="white"
            fontFamily="DMSans_Regular, 'DM Sans', sans-serif"
            fontWeight={400}
            fontSize={['16px', '22px']}
            lineHeight={1}
          >
            Learn about our
          </Text>
          <Text
            color="white"
            fontFamily="DMSerifDisplay_Italic, serif"
            fontSize={['28px', '40px']}
            lineHeight={1.15}
          >
            10 Year Commitment
          </Text>
          <Text
            color="white"
            fontFamily="DMSans_Regular, 'DM Sans', sans-serif"
            fontWeight={400}
            fontSize={['16px', '22px']}
            lineHeight={1}
          >
            as a Global Family of Churches
          </Text>
        </VStack>
      </Box>
    </Link>
  );
};

export default TenYearCommitmentBanner;
