import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { COLORS, TYC_IMG } from './constants';
import ReleasePanel from './three-fold/ReleasePanel';
import ReproducePanel from './three-fold/ReproducePanel';
import RaisePanel from './three-fold/RaisePanel';
import {
  MotionBox,
  MotionVStack,
  fadeUp,
  staggerContainer,
  SNAPPY_SPRING,
} from './three-fold/motion';

const TABS = [
  { key: 'release', label: 'Release', Panel: ReleasePanel },
  { key: 'reproduce', label: 'Reproduce', Panel: ReproducePanel },
  { key: 'raise', label: 'Raise', Panel: RaisePanel },
];

const ACTIVE_UNDERLINE = COLORS.tabUnderline;
// Faint underline previewed under a non-active tab on hover.
const HOVER_UNDERLINE = `${ACTIVE_UNDERLINE}55`;
const SLOT_PCT = 100 / TABS.length;

const ThreeFoldCommitment = () => {
  const [index, setIndex] = useState(0);
  // Reveal the header + tabs once the section scrolls into view.
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <Flex
      w="100%"
      direction="column"
      gap={{ base: '1.5rem', md: '2.5rem' }}
      py={{ base: '2.5rem', md: '4rem' }}
      px={{ base: '1rem', md: '2rem' }}
      bg="white"
    >
      {/* Section Header */}
      <MotionVStack
        ref={ref}
        spacing={{ base: '0.75rem', md: '1rem' }}
        align="center"
        w="100%"
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
      >
        <MotionBox variants={fadeUp} w="100%">
          <Heading
            as="h2"
            fontFamily="DMSerifDisplay_Italic"
            fontWeight={400}
            fontSize={{ base: '2rem', md: '2.375rem' }}
            color={COLORS.brandBlue}
            textAlign="center"
          >
            Our Three-fold Commitment
          </Heading>
        </MotionBox>
        <MotionBox variants={fadeUp} w="100%">
          <Text
            fontFamily="Manrope"
            fontWeight={500}
            fontSize={{ base: '0.875rem', md: '1.25rem' }}
            letterSpacing="0.0125rem"
            color="#000000"
            textAlign="center"
            maxW="760px"
            mx="auto"
          >
            This commitment consists of three components, each essential to
            fulfilling the call God has placed on our hearts.
          </Text>
        </MotionBox>
      </MotionVStack>

      <Tabs
        variant="unstyled"
        index={index}
        onChange={setIndex}
        isLazy
        lazyBehavior="unmount"
        w="100%"
        maxW="1100px"
        mx="auto"
      >
        <TabList position="relative">
          {TABS.map(({ key, label }) => (
            <Tab
              key={key}
              flex={1}
              minW={0}
              px={2}
              pt={2}
              pb={0}
              opacity={0.4}
              transition="opacity 0.2s ease"
              _focus={{ boxShadow: 'none' }}
              _focusVisible={{
                boxShadow: `0 0 0 3px ${ACTIVE_UNDERLINE}80`,
                borderRadius: '6px',
              }}
              sx={{
                '&[aria-selected="true"]': { opacity: 1 },
                '&:hover:not([aria-selected="true"])': { opacity: 0.75 },
                '&:hover:not([aria-selected="true"]) .tab-underline': {
                  backgroundColor: HOVER_UNDERLINE,
                },
              }}
            >
              <VStack spacing={{ base: '0.5rem', md: '0.75rem' }} w="100%">
                <Image
                  src={`${TYC_IMG}/tabs/${key}.svg`}
                  alt=""
                  aria-hidden="true"
                  boxSize={{ base: '2.25rem', md: '3.25rem' }}
                />
                <Text
                  fontFamily="DMSans_Regular"
                  fontWeight={700}
                  fontSize={{ base: '1rem', md: '1.5rem' }}
                  textTransform="uppercase"
                  color="#000000"
                >
                  {label}
                </Text>
                {/* Reserves space + shows a faint underline on hover; the solid
                    active underline is the shared sliding bar below. */}
                <Box
                  className="tab-underline"
                  h="6px"
                  w={{ base: '60%', md: '130px' }}
                  borderTopRadius="4px"
                  bg="transparent"
                  transition="background-color 0.2s ease"
                />
              </VStack>
            </Tab>
          ))}

          {/* Single underline that slides to the active tab's slot. */}
          <MotionBox
            position="absolute"
            bottom="0"
            h="6px"
            w={`${SLOT_PCT}%`}
            display="flex"
            justifyContent="center"
            pointerEvents="none"
            initial={false}
            animate={{ left: `${index * SLOT_PCT}%` }}
            transition={SNAPPY_SPRING}
          >
            <Box
              h="6px"
              w={{ base: '60%', md: '130px' }}
              bg={ACTIVE_UNDERLINE}
              borderTopRadius="4px"
            />
          </MotionBox>
        </TabList>

        <TabPanels>
          {TABS.map(({ key, Panel }) => (
            <TabPanel key={key} px={0}>
              <Panel />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default ThreeFoldCommitment;
