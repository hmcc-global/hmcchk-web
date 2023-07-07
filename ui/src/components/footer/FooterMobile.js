import { SocialMediaLinks } from './SocialMediaLinks';
import {
  Link,
  Container,
  Image,
  Text,
  VStack,
  Center,
  Button,
  Stack,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';

import { Link as HashLink } from 'react-router-dom';
import { Copyright } from './Copyright';
import { SoapAppDownloadButton } from './SoapDownloadButton';
import { ChurchAppDownloadButton } from './ChurchAppDownloadButton';
import DailyBrp from '../helpers/DailyBrp';
import { useHistory } from 'react-router-dom';

const FooterMobile = (props) => {
  const isAdminPage = useHistory().location.pathname.includes('admin');
  return (
    <Box
      as="footer"
      role="contentinfo"
      mx="auto"
      w="100%"
      py="12"
      bg="#222222"
      color="white"
      display={isAdminPage ? 'none' : 'block'}
    >
      <Container align="center">
        <Stack direction="column" w={'95%'} spacing="10" align="center">
          <VStack w={'80%'}>
            <Link href="/" pb="7">
              <Image
                h="6.5vh"
                src={process.env.PUBLIC_URL + '/images/ripple.svg'}
                alt="Logo of HMCC"
              />
            </Link>
            <Box>
              <Text fontWeight="700" align="center">
                Harvest Mission Community Church
              </Text>
              <Text fontWeight="700" align="center">
                (Hong Kong)
              </Text>
            </Box>
            <Text color="white" fontWeight="600">
              Today's BRP : <DailyBrp />
            </Text>
            <Button
              size="sm"
              variant="outline"
              colorScheme="white"
              as={Link}
              href="https://hmcc.tv"
            >
              <Text px="7" fontWeight="700">
                HMCC.TV
              </Text>
            </Button>
          </VStack>
          <Accordion w="100%" allowToggle>
            <AccordionItem borderTop="1px">
              {({ isExpanded }) => (
                <>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left" fontWeight="700">
                        About
                      </Box>
                      {isExpanded ? (
                        <MinusIcon fontSize="12px" />
                      ) : (
                        <AddIcon fontSize="12px" />
                      )}
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Accordion>
                      <AccordionItem border="none">
                        <h2>
                          <AccordionButton
                            as={Link}
                            href="/about-us#our-story"
                            border="none"
                          >
                            <Box as="span" flex="1" textAlign="left">
                              Our Story
                            </Box>
                          </AccordionButton>
                        </h2>
                      </AccordionItem>
                      <AccordionItem border="none">
                        <h2>
                          <AccordionButton
                            as={Link}
                            href="/about-us#vision-mission"
                          >
                            <Box as="span" flex="1" textAlign="left">
                              Vision & Mission
                            </Box>
                          </AccordionButton>
                        </h2>
                      </AccordionItem>
                      <AccordionItem border="none">
                        <h2>
                          <AccordionButton as={Link} href="/about-us#values">
                            <Box as="span" flex="1" textAlign="left">
                              Our Values
                            </Box>
                          </AccordionButton>
                        </h2>
                      </AccordionItem>
                      <AccordionItem border="none">
                        <h2>
                          <AccordionButton as={Link} href="/about-us#strategy">
                            <Box as="span" flex="1" textAlign="left">
                              Our Strategy
                            </Box>
                          </AccordionButton>
                        </h2>
                      </AccordionItem>
                      <AccordionItem border="none">
                        <h2>
                          <AccordionButton as={Link} href="/about-us#staff">
                            <Box as="span" flex="1" textAlign="left">
                              Our Staff
                            </Box>
                          </AccordionButton>
                        </h2>
                      </AccordionItem>
                      <AccordionItem border="none">
                        <h2>
                          <AccordionButton as={Link} href="/about-us#beliefs">
                            <Box as="span" flex="1" textAlign="left">
                              Our Beliefs
                            </Box>
                          </AccordionButton>
                        </h2>
                      </AccordionItem>
                      <AccordionItem border="none">
                        <h2>
                          <AccordionButton as={Link} href="/about-us#missions">
                            <Box as="span" flex="1" textAlign="left">
                              Our Heart for Missions
                            </Box>
                          </AccordionButton>
                        </h2>
                      </AccordionItem>
                    </Accordion>
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
            <AccordionItem border="none">
              {({ isExpanded }) => (
                <>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left" fontWeight="700">
                        Visit
                      </Box>
                      {isExpanded ? (
                        <MinusIcon fontSize="12px" />
                      ) : (
                        <AddIcon fontSize="12px" />
                      )}
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Accordion>
                      <AccordionItem border="none">
                        <h2>
                          <AccordionButton as={Link} href="/online">
                            <Box as="span" flex="1" textAlign="left">
                              Church online
                            </Box>
                          </AccordionButton>
                        </h2>
                      </AccordionItem>
                    </Accordion>
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
            <AccordionItem border="none">
              {({ isExpanded }) => (
                <>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left" fontWeight="700">
                        Connect
                      </Box>
                      {isExpanded ? (
                        <MinusIcon fontSize="12px" />
                      ) : (
                        <AddIcon fontSize="12px" />
                      )}
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Accordion>
                      <AccordionItem border="none">
                        <h2>
                          <AccordionButton
                            as={HashLink}
                            to={{ pathname: '/connect', hash: '#ministries' }}
                          >
                            <Box as="span" flex="1" textAlign="left">
                              Ministries
                            </Box>
                          </AccordionButton>
                        </h2>
                      </AccordionItem>
                      <AccordionItem border="none">
                        <h2>
                          <AccordionButton
                            as={HashLink}
                            to={{ pathname: '/connect', hash: '#lifegroup' }}
                          >
                            <Box as="span" flex="1" textAlign="left">
                              LIFE Groups
                            </Box>
                          </AccordionButton>
                        </h2>
                      </AccordionItem>
                    </Accordion>
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
            <AccordionItem border="none">
              <h2>
                <AccordionButton as={Link} href="/events">
                  <Box as="span" flex="1" textAlign="left" fontWeight="700">
                    Events
                  </Box>
                </AccordionButton>
              </h2>
            </AccordionItem>
            <AccordionItem border="none">
              <h2>
                <AccordionButton as={Link} href="/sermons">
                  <Box as="span" flex="1" textAlign="left" fontWeight="700">
                    Sermons
                  </Box>
                </AccordionButton>
              </h2>
            </AccordionItem>
            <AccordionItem border="none">
              <h2>
                <AccordionButton as={Link} href="/give">
                  <Box as="span" flex="1" textAlign="left" fontWeight="700">
                    Give
                  </Box>
                </AccordionButton>
              </h2>
            </AccordionItem>
            <AccordionItem borderTop="none" borderBottom="1px">
              <h2>
                <AccordionButton
                  as={Link}
                  href="https://hongkong.sub.hmcc.net/privacy-policy-2/"
                >
                  <Box as="span" flex="1" textAlign="left" fontWeight="700">
                    Privacy Policy
                  </Box>
                </AccordionButton>
              </h2>
            </AccordionItem>
          </Accordion>
          <VStack w={'80%'} spacing="10">
            <ChurchAppDownloadButton />
            <SoapAppDownloadButton />
            <Box minW="100%">
              <SocialMediaLinks />
            </Box>
            <Box minW="100%">
              <Text>Contact Us</Text>
              <Link href="mailto:hongkong@hmcc.net" fontWeight="bold">
                hongkong@hmcc.net
              </Link>
            </Box>
          </VStack>
          <Center>
            <Copyright />
          </Center>
        </Stack>
      </Container>
    </Box>
  );
};

export default FooterMobile;
