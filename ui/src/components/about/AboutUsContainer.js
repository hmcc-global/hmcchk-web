import BeliefsSection from './BeliefsSection';
import StaffSection from './StaffSection';
import StorySection from './StorySection';
import StrategySection from './StrategySection';
import ValuesSection from './ValuesSection';
import OurHeartMissions from './OurHeartMissions';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  useBreakpointValue,
} from '@chakra-ui/react';
import blurbs from './about.json';
import { TriangleUpIcon } from '@chakra-ui/icons';

// Constants
const TAB_CONFIG = [
  { id: 'story', label: 'Our Story', hash: '#our-story' },
  {
    id: 'values',
    label: 'Vision & Mission, Our Values',
    hash: ['#vision-mission', '#values'],
  },
  { id: 'strategy', label: 'Our Strategy', hash: '#strategy' },
  { id: 'staff', label: 'Our Staff', hash: '#staff' },
  { id: 'beliefs', label: 'Beliefs', hash: '#beliefs' },
  { id: 'missions', label: 'Our Heart for Missions', hash: '#missions' },
];

const AboutUsChip = () => (
  <Box
    borderRadius="1.875rem"
    bgColor="white"
    p="0.5rem 1rem"
    display="inline-flex"
    justifyContent="center"
    alignItems="center"
    mb={4}
  >
    <Text
      fontFamily="Manrope"
      textTransform="uppercase"
      fontSize={'1rem'}
      fontWeight={700}
      letterSpacing="0.125rem"
      lineHeight="103%"
    >
      ABOUT US
    </Text>
  </Box>
);

const TabContentWrapper = ({ children }) => (
  <VStack alignItems="flex-start" spacing={0} px={{ base: '0.5rem', md: 0 }}>
    <AboutUsChip />
    {children}
  </VStack>
);

const AboutUsContainer = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const { hash } = useLocation();
  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    const tabIndex = TAB_CONFIG.findIndex((tab) =>
      Array.isArray(tab.hash) ? tab.hash.includes(hash) : tab.hash === hash
    );
    if (tabIndex !== -1) setTabIndex(tabIndex);
  }, [hash]);

  const handleTabChange = (index) => {
    setTabIndex(index);
    // Optional: Update URL hash when tab changes on mobile
    const hash = Array.isArray(TAB_CONFIG[index].hash)
      ? TAB_CONFIG[index].hash[0]
      : TAB_CONFIG[index].hash;
    window.location.hash = hash;

    // Scroll to top of page
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Optional: adds smooth scrolling animation
    });
  };

  return (
    <Container
      maxW="container.xl"
      px={0}
      py={'2rem'}
      fontFamily="Manrope"
      position="relative"
      pb={{ base: '80px', lg: '5rem' }}
    >
      {isMobile ? (
        <>
          <Box mb={8}>
            <TabContentWrapper>
              {tabIndex === 0 && (
                <StorySection
                  blurb={blurbs.story}
                  title={TAB_CONFIG[0].label}
                />
              )}
              {tabIndex === 1 && (
                <ValuesSection
                  blurb={blurbs.visionMissionValues}
                  title={TAB_CONFIG[1].label}
                />
              )}
              {tabIndex === 2 && (
                <StrategySection
                  blurb={blurbs.strategy}
                  title={TAB_CONFIG[2].label}
                />
              )}
              {tabIndex === 3 && (
                <StaffSection
                  blurb={blurbs.staff}
                  title={TAB_CONFIG[3].label}
                />
              )}
              {tabIndex === 4 && (
                <BeliefsSection
                  blurb={blurbs.beliefs}
                  title={TAB_CONFIG[4].label}
                />
              )}
              {tabIndex === 5 && (
                <OurHeartMissions
                  blurb={blurbs.ourHeartMissions}
                  title={TAB_CONFIG[5].label}
                />
              )}
            </TabContentWrapper>
          </Box>

          {/* Bottom Menu */}
          <Box
            position="fixed"
            bottom="9vh" // based on mobile nav bar height
            left="0"
            right="0"
            zIndex="sticky"
            w="100%"
            display="flex"
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Menu placement="top">
              <MenuButton
                as={Button}
                rightIcon={<TriangleUpIcon />}
                textAlign="left"
                fontSize="0.875rem"
                fontWeight={700}
                w={'90vw'}
                bg="#F6FAFF"
                border="1px solid #4A6EEB"
                borderRadius="1.5rem"
                p={'0.75rem 1rem'}
                _hover={{ bg: '#F6FAFF' }}
                _active={{ bg: '#F6FAFF' }}
              >
                {TAB_CONFIG[tabIndex].label}
              </MenuButton>
              <MenuList
                w="90vw"
                borderRadius="1.5rem"
                border="2px solid #4A6EEB"
                bg="#F6FAFF"
                boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
                py={0}
                fontSize={'0.875rem'}
              >
                {TAB_CONFIG.map((tab, index) => (
                  <MenuItem
                    key={tab.id}
                    onClick={() => handleTabChange(index)}
                    fontWeight={700}
                    color={'#0C0C20'}
                    bg={tabIndex === index ? '#DFE7FF' : 'transparent'}
                    p={'0.5rem 1.375rem'}
                    borderBottomRadius={
                      index === TAB_CONFIG.length - 1 ? '1.5rem' : 0
                    }
                    borderTopRadius={index === 0 ? '1.5rem' : 0}
                  >
                    {tab.label}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Box>
        </>
      ) : (
        <Tabs
          variant="unstyled"
          orientation="vertical"
          index={tabIndex}
          onChange={setTabIndex}
        >
          <Box
            display="flex"
            width="100%"
            gap={{ md: '0.75rem', xl: '1.5rem', '2xl': '2rem' }}
            px={{ md: '0.75rem', xl: '1.5rem', '2xl': 0 }}
          >
            <Box flex="1" py="2rem">
              <TabList>
                {TAB_CONFIG.map((tab, index) => (
                  <Tab
                    key={tab.id}
                    fontSize={{ base: '0.875rem', lg: '1.125rem' }}
                    textAlign="left"
                    color="#0C0C20"
                    fontWeight={700}
                    _selected={{ bg: '#DFE7FF' }}
                    justifyContent="flex-start"
                    p={'0.5rem 1rem'}
                    borderRadius="0.25rem"
                  >
                    {tab.label}
                  </Tab>
                ))}
              </TabList>
            </Box>

            <TabPanels
              flex="0 0 70%"
              maxW="70%"
              overflowY="auto"
              overflowX="hidden"
              maxH="calc(90vh - 5rem)"
            >
              {TAB_CONFIG.map((tab, index) => (
                <TabPanel key={tab.id} p={0}>
                  <TabContentWrapper>
                    {index === 0 && (
                      <StorySection blurb={blurbs.story} title={tab.label} />
                    )}
                    {index === 1 && (
                      <ValuesSection
                        blurb={blurbs.visionMissionValues}
                        title={tab.label}
                      />
                    )}
                    {index === 2 && (
                      <StrategySection
                        blurb={blurbs.strategy}
                        title={tab.label}
                      />
                    )}
                    {index === 3 && (
                      <StaffSection blurb={blurbs.staff} title={tab.label} />
                    )}
                    {index === 4 && (
                      <BeliefsSection
                        blurb={blurbs.beliefs}
                        title={tab.label}
                      />
                    )}
                    {index === 5 && (
                      <OurHeartMissions
                        blurb={blurbs.ourHeartMissions}
                        title={tab.label}
                      />
                    )}
                  </TabContentWrapper>
                </TabPanel>
              ))}
            </TabPanels>
          </Box>
        </Tabs>
      )}
    </Container>
  );
};

export default AboutUsContainer;
