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
        loop
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
        letterSpacing={['-0.673rem', '-1.339rem']}
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
      <Flex
        w="100vw"
        maxH={['5vh', '5vh', '20vh']}
        zIndex="2"
        background="linear-gradient(180deg, rgba(217, 217, 217, 0) 0%, #FFFFFF 100%)"
        position="absolute"
        bottom="0"
        left="0"
        sx={{ aspectRatio: '16/9' }}
      />
    </Flex>
  );
};

export default EasterHero;
