import { Flex, Text, useMediaQuery } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import '@fontsource-variable/lexend-peta';

const EasterHero = () => {
  const vidRef = useRef(null);
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  const videoSrc = isMobile
    ? `${process.env.PUBLIC_URL}/images/easter-2025/Hero-mobile.mp4`
    : `${process.env.PUBLIC_URL}/images/easter-2025/Hero.mp4`;

  useEffect(() => {
    const videoElement = vidRef.current;
    if (videoElement) {
      const handleLoadedMetadata = () => {
        videoElement.play();
      };

      videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);

      return () => {
        videoElement.removeEventListener(
          'loadedmetadata',
          handleLoadedMetadata
        );
      };
    }
  }, [vidRef]);

  return (
    <Flex position="relative" w="full" h="auto" mt={[2, -3, 5]}>
      <Flex
        as="video"
        ref={vidRef}
        w={['full']}
        h="auto"
        src={videoSrc}
        muted
        objectFit={['cover', 'cover']}
        justify="center"
        playsInline
        sx={{ background: 'transparent' }}
      />
      <Text
        position="absolute"
        top="55%"
        left="50%"
        fontWeight="900"
        transform="translate(-50%, -50%)"
        color="#FBF574"
        textAlign="center"
        fontSize={['52', '112px']}
        letterSpacing={['-0.2em', '-0.07em']}
        fontFamily="Lexend Peta Variable"
      >
        REDEEMED
      </Text>
      <Text
        position="absolute"
        top={['65%']}
        left="50%"
        transform="translate(-50%, -50%)"
        color="white"
        textAlign="center"
        fontSize={['14px', '32px']}
        letterSpacing="0.1em"
        fontFamily="Sigurd"
      >
        PASSION WEEK 2025
      </Text>
    </Flex>
  );
};

export default EasterHero;
