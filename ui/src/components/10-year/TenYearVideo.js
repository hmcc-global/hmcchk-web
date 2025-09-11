import { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  AspectRatio,
  Image,
  useBreakpointValue,
} from '@chakra-ui/react';
import { tenYearTheme } from './theme';

const TenYearVideo = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  // EASY SWITCH: flip to false when real assets are ready
  const USE_PLACEHOLDERS = true;
  const PLACEHOLDER_TITLE = '(Videos coming soon)';
  // Place the image at this path in `ui/public` (e.g. ui/public/assets/tenyear/placeholder.jpg)
  const PLACEHOLDER_IMAGE = '/images/10-year/10y_video_placeholder.png';

  // Placeholder list mirrors the real videos list shape
  const placeholderVideos = ['a', 'b', 'c'].map((id) => ({
    id,
    title: PLACEHOLDER_TITLE,
    image: PLACEHOLDER_IMAGE,
  }));

  // When USE_PLACEHOLDERS === false, replace the below with real titles and video srcs
  const realVideos = [
    { id: 'a', title: '', src: '' },
    { id: 'b', title: '', src: '' },
    { id: 'c', title: '', src: '' },
  ];

  const videos = USE_PLACEHOLDERS ? placeholderVideos : realVideos;

  const [activeIndex, setActiveIndex] = useState(1);
  const activeVideo = videos[activeIndex];
  // rem-based layout constants
  const LAYOUT_MAX_W = '75rem'; // 1200px
  const THUMBS_MIN_W_MD = '18.75rem'; // 300px
  const VIDEO_W = '55rem';
  const GAP_COL_MD = '2.5rem'; // 40px
  const GAP_ROW_BASE = '1.5rem'; // 24px
  const GAP_ROW_MD = '1rem'; // 16px
  const PILL_RADIUS = '2.5rem'; // 40px
  const PILL_PX = '1.5rem'; // 24px
  const PILL_PY = '0.75rem'; // 12px
  const PLAY_ICON_SIZE = '4.375rem'; // 70px

  return (
    <VStack spacing={8} w="100%">
      <VStack spacing={2}>
        <Heading
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={{ base: '0.5rem', md: 0 }}
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
        <Text
          {...tenYearTheme.typography.body}
          whiteSpace="pre-line"
          textAlign="center"
        >
          {isMobile
            ? `This collection of videos tells the story God has been writing in our church family.

We invite you to watch, remember, and rejoice in all He has done.`
            : `This collection of videos tells the story God has been writing in our church family.
We invite you to watch, remember, and rejoice in all He has done.`}
        </Text>
      </VStack>

      <Box
        w="100%"
        maxW={LAYOUT_MAX_W}
        mx="auto"
        display="grid"
        gridTemplateColumns={{
          base: '1fr',
          md: `minmax(${THUMBS_MIN_W_MD}, 1fr) ${VIDEO_W}`,
        }}
        gridTemplateAreas={{
          base: '"video" "pill" "thumbs"',
          md: '"thumbs video" ". pill"',
        }}
        rowGap={{ base: GAP_ROW_BASE, md: GAP_ROW_MD }}
        columnGap={{ base: 0, md: GAP_COL_MD }}
        alignItems="center"
      >
        <Flex
          gap={{ base: '1rem', md: '3.5rem' }}
          minW={{ base: 'auto', md: THUMBS_MIN_W_MD }}
          align="center"
          justify="center"
          h="100%"
          gridArea="thumbs"
          alignSelf="center"
          flexDir={{ base: 'row', md: 'column' }}
          wrap="nowrap"
          overflowX={{ base: 'auto', md: 'visible' }}
          px={{ base: '0.5rem', md: 0 }}
          py={{ base: '1rem', md: 0 }}
        >
          {videos.map((v, idx) => {
            const isActive = idx === activeIndex;
            // Mobile: keep all thumbnails same size; Desktop: emphasize active
            const width = {
              base: '6.5rem',
              md: isActive ? '13.3rem' : '8.5rem',
            };
            const height = {
              base: '3.7rem',
              md: isActive ? '7.5rem' : '4.75rem',
            };
            return (
              <Box
                key={v.id}
                as="button"
                onClick={() => setActiveIndex(idx)}
                w={width}
                h={height}
                flex="0 0 auto"
                borderRadius={{ base: '0.5rem', md: '0' }}
                borderWidth="0"
                bg="#0B1020"
                position="relative"
                transition="box-shadow 200ms ease, transform 200ms ease, filter 200ms ease"
                boxShadow={
                  isActive
                    ? {
                        base: '1px 0 10px 0.709px #95CFFF',
                        md: '0 0 25px 4px #95CFFF',
                      }
                    : {
                        base: '0 0 8px rgba(0,0,0,0.3)',
                        md: '0 0 8px rgba(0,0,0,0.3)',
                      }
                }
                _hover={{
                  boxShadow: {
                    base: '0 0 6.951px 0.709px #95CFFF',
                    md: '0 0 18px 1px #95CFFF',
                  },
                  transform: 'translateY(-1px)',
                }}
              >
                {USE_PLACEHOLDERS ? (
                  <>
                    <Image
                      src={v.image}
                      alt={v.title}
                      w="100%"
                      h="100%"
                      objectFit="cover"
                    />
                    <Flex
                      position="absolute"
                      top={0}
                      left={0}
                      w="100%"
                      h="100%"
                      align="center"
                      justify="center"
                      bg="rgba(0,0,0,0.4)"
                    >
                      <Text
                        fontWeight={700}
                        color={tenYearTheme.colors.text.primary}
                        fontSize="0.625rem"
                        textAlign="center"
                        fontFamily={tenYearTheme.fonts.giving}
                      >
                        COMING SOON
                      </Text>
                    </Flex>
                  </>
                ) : (
                  <Flex w="100%" h="100%" align="center" justify="center">
                    <Text
                      fontWeight={700}
                      color={tenYearTheme.colors.text.primary}
                    >
                      {v.title}
                    </Text>
                  </Flex>
                )}
              </Box>
            );
          })}
        </Flex>

        <VStack
          flex={1}
          spacing={{ base: 0, md: '1.5rem' }}
          gridArea="video"
          w="100%"
        >
          <Box
            w={{ base: '100%', lg: '100%', xl: VIDEO_W }}
            borderRadius="0"
            overflow="hidden"
            transition="box-shadow 250ms ease"
            boxShadow={{
              base: '0 0 11.487px 0 #95CFFF',
              lg: '0 0 11.487px 0 #95CFFF',
              xl: '0 0 29.4px 0 #95CFFF',
            }}
          >
            <AspectRatio
              w={{ base: '100%', lg: '100%', xl: VIDEO_W }}
              ratio={16 / 9}
            >
              {USE_PLACEHOLDERS ? (
                <>
                  <Image
                    src={activeVideo.image}
                    alt={activeVideo.title}
                    w="100%"
                    h="100%"
                    objectFit="cover"
                  />
                  <Flex
                    position="absolute"
                    top={0}
                    left={0}
                    w="100%"
                    h="100%"
                    align="center"
                    justify="center"
                  >
                    <Image
                      src="/images/10-year/playicon.svg"
                      alt="Play"
                      w={{ base: '3.5rem', lg: '3.5rem', xl: PLAY_ICON_SIZE }}
                      h={{ base: '3.5rem', lg: '3.5rem', xl: PLAY_ICON_SIZE }}
                    />
                  </Flex>
                </>
              ) : (
                <Box
                  as="video"
                  src={activeVideo.src}
                  controls
                  poster={undefined}
                  bg="#0B1020"
                />
              )}
            </AspectRatio>
          </Box>
        </VStack>
        <Box
          gridArea="pill"
          w={{ base: '100%', md: VIDEO_W }}
          borderRadius={{ base: '2.5rem', md: PILL_RADIUS }}
          bg="rgba(5, 10, 25, 0.75)"
          px={PILL_PX}
          py={PILL_PY}
          mt={{ base: '0.25rem', md: '1rem' }}
        >
          <Text textAlign="center" {...tenYearTheme.typography.body}>
            {USE_PLACEHOLDERS ? PLACEHOLDER_TITLE : activeVideo.title}
          </Text>
        </Box>
      </Box>
    </VStack>
  );
};

export default TenYearVideo;
