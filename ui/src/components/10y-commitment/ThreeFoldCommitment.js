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
import { COLORS, TYC_IMG } from './constants';
import ReleasePanel from './three-fold/ReleasePanel';
import ReproducePanel from './three-fold/ReproducePanel';
import RaisePanel from './three-fold/RaisePanel';

const TABS = [
  { key: 'release', label: 'Release', Panel: ReleasePanel },
  { key: 'reproduce', label: 'Reproduce', Panel: ReproducePanel },
  { key: 'raise', label: 'Raise', Panel: RaisePanel },
];

const ACTIVE_UNDERLINE = COLORS.tabUnderline;

const ThreeFoldCommitment = () => {
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
      <VStack spacing={{ base: '0.75rem', md: '1rem' }} align="center" w="100%">
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
        <Text
          fontFamily="Manrope"
          fontWeight={500}
          fontSize={{ base: '0.875rem', md: '1.25rem' }}
          letterSpacing="0.0125rem"
          color="#000000"
          textAlign="center"
          maxW="760px"
        >
          This commitment consists of three components, each essential to
          fulfilling the call God has placed on our hearts.
        </Text>
      </VStack>

      <Tabs variant="unstyled" defaultIndex={0} w="100%" maxW="1100px" mx="auto">
        <TabList>
          {TABS.map(({ key, label }) => (
            <Tab
              key={key}
              flex={1}
              minW={0}
              px={2}
              pt={2}
              pb={0}
              opacity={0.4}
              _focus={{ boxShadow: 'none' }}
              _focusVisible={{
                boxShadow: `0 0 0 3px ${ACTIVE_UNDERLINE}80`,
                borderRadius: '6px',
              }}
              sx={{
                '&[aria-selected="true"]': { opacity: 1 },
                '&[aria-selected="true"] .tab-underline': {
                  backgroundColor: ACTIVE_UNDERLINE,
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
