import { useState } from 'react';
import { Box, Flex, Heading, Text, VStack, HStack, AspectRatio, Button, Image } from '@chakra-ui/react';
import { tenYearTheme } from './theme';

const TenYearVideo = () => {
  // EASY SWITCH: flip to false when real assets are ready
  const USE_PLACEHOLDERS = true;
  const PLACEHOLDER_TITLE = '(Videos coming soon)';
  // Place the image at this path in `ui/public` (e.g. ui/public/assets/tenyear/placeholder.jpg)
  const PLACEHOLDER_IMAGE = '/images/10-year/10y_video_placeholder.png';

  // Placeholder list mirrors the real videos list shape
  const placeholderVideos = [
    { id: 'a', title: PLACEHOLDER_TITLE, image: PLACEHOLDER_IMAGE },
    { id: 'b', title: PLACEHOLDER_TITLE, image: PLACEHOLDER_IMAGE },
    { id: 'c', title: PLACEHOLDER_TITLE, image: PLACEHOLDER_IMAGE },
  ];

  // When USE_PLACEHOLDERS === false, replace the below with real titles and video srcs
  const realVideos = [
    { id: 'a', title: 'Video A Title', src: '' },
    { id: 'b', title: 'Video B Title', src: '' },
    { id: 'c', title: 'Video C Title', src: '' },
  ];

  const videos = USE_PLACEHOLDERS ? placeholderVideos : realVideos;

  const [activeIndex, setActiveIndex] = useState(0);
  const activeVideo = videos[activeIndex];

  return (
    <VStack spacing={8} w="100%">
      <VStack spacing={2}>
        <Heading
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={0}         
        >
          <Image
            src="/images/10-year/10.svg"
            alt="10"
            h="3em"
            w="auto"
            mt={-4}
          />
          <Box as="span" {...tenYearTheme.typography.h1} ml={-8}>
            Years: The Story
          </Box>
        </Heading>
        <Text {...tenYearTheme.typography.body} whiteSpace="pre-line" textAlign="center">
          {`This collection of videos tells the story God has been writing in our church family.
We invite you to watch, remember, and rejoice in all He has done.`}
        </Text>
      </VStack>

      <Flex w="100%" maxW="1200px" gap={10} align="stretch" justify="center">
        <VStack spacing={12} minW="300px" align="center">
          {videos.map((v, idx) => {
            const isActive = idx === activeIndex;
            const width = isActive ? '280px' : '220px';
            const height = isActive ? '157px' : '124px';
            return (
              <Box
                key={v.id}
                as="button"
                onClick={() => setActiveIndex(idx)}
                w={width}
                h={height}
                borderRadius="0"
                borderWidth="0"
                bg="#0B1020"
                position="relative"
                transition="box-shadow 200ms ease, transform 200ms ease, filter 200ms ease"
                boxShadow={isActive ? '0 0 30px rgba(149,207,255,0.65)' : '0 0 16px rgba(149,207,255,0.35)'}
                _hover={{
                  boxShadow: '0 0 36px rgba(149,207,255,0.7), 0 0 44px rgba(0,41,189,0.45)',
                  transform: 'translateY(-1px)',
                }}
              >
                {USE_PLACEHOLDERS ? (
                  <Image src={v.image} alt={v.title} w="100%" h="100%" objectFit="cover" />
                ) : (
                  <Flex w="100%" h="100%" align="center" justify="center">
                    <Text fontWeight={700} color={tenYearTheme.colors.text.primary}>
                      {v.title}
                    </Text>
                  </Flex>
                )}
              </Box>
            );
          })}
        </VStack>

        <VStack flex={1} spacing={6}>
          <Box
            w="100%"
            maxW="900px"
            borderRadius="0"
            overflow="hidden"
            transition="box-shadow 250ms ease"
            boxShadow="0 0 36px rgba(149,207,255,0.75), 0 0 52px rgba(0,41,189,0.55)"
          >
            <AspectRatio w="100%" ratio={16 / 9}>
              {USE_PLACEHOLDERS ? (
                <Image src={activeVideo.image} alt={activeVideo.title} w="100%" h="100%" objectFit="cover" />
              ) : (
                <Box as="video" src={activeVideo.src} controls poster={undefined} bg="#0B1020" />
              )}
            </AspectRatio>
          </Box>
          <Box
            w="100%"
            maxW="900px"
            borderRadius="0"
            bg="rgba(5, 10, 25, 0.75)"
            px={6}
            py={3}
            boxShadow="inset 0 1px 0 rgba(255,255,255,0.08), 0 6px 16px rgba(0,0,0,0.5)"
          >
            <Text textAlign="center" {...tenYearTheme.typography.body} color={tenYearTheme.colors.text.primary}>
              {PLACEHOLDER_TITLE}
            </Text>
          </Box>
        </VStack>
      </Flex>
    </VStack>
  );
};

export default TenYearVideo;


