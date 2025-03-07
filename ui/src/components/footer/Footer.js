import {
  Link,
  Container,
  Image,
  Text,
  VStack,
  Button,
  Stack,
  Flex,
  Box,
  Spacer,
  HStack,
} from '@chakra-ui/react';
import './SocialIcon.css';
import { EmailIcon } from '@chakra-ui/icons';
import { SocialIcon } from 'react-social-icons';

import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();

  return (
    <Container maxW="container.xl" py="2em">
      <Flex
        display={location.pathname.includes('/admin') ? 'none' : 'flex'}
        w="100%"
        direction={['column', 'row']}
        py={['0', '2em']}
      >
        <VStack w={['100%', '40%']} alignItems={['center', 'flex-start']}>
          <Stack flexDir="column">
            <Link href="/">
              <Image
                src={`${process.env.PUBLIC_URL}/images/ripple_blue.svg`}
                alt="Logo of HMCC"
                h="2em"
                mx={['auto', '0']}
              />
            </Link>
            <Text
              color="#4A6EEB"
              fontSize="16"
              fontWeight="700"
              fontFamily="Manrope"
              wordWrap="break-word"
              textAlign={['center', 'left']}
            >
              Harvest Mission Community Church <br /> Hong Kong
            </Text>
          </Stack>
          <HStack py="1em">
            <Link href="mailto:hongkong@hmcc.net">
              <Button
                bg="#DBE9FF"
                rounded="full"
                color="#4A6EEB"
                h="2.5em"
                w="2.5em"
                borderRadius="full"
                _hover={{
                  bg: '#4A6EEB',
                  color: '#DBE9FF',
                }}
              >
                <EmailIcon h="1.3em" w="1.3em" />
              </Button>
            </Link>
            <Link
              color="#4A6EEB"
              fontSize="16px"
              fontFamily="Manrope"
              fontWeight="700"
              textDecoration="underline"
              wordBreak="break-word"
              href="mailto:hongkong@hmcc.net"
            >
              hongkong@hmcc.net
            </Link>
          </HStack>

          <HStack>
            <SocialIcon
              target="_blank"
              bgColor="#DBE9FF"
              fgColor="#4A6EEB"
              className="social-icon"
              style={{ height: '2.5em', width: '2.5em' }}
              url="https://www.youtube.com/channel/UC1O1T7RaKWTGHd7R_0KMZ8Q"
            />
            <SocialIcon
              target="_blank"
              bgColor="#DBE9FF"
              fgColor="#4A6EEB"
              style={{ height: '2.5em', width: '2.5em' }}
              url="https://www.instagram.com/hmcc_hk/?hl=en"
            />
            <SocialIcon
              target="_blank"
              bgColor="#DBE9FF"
              fgColor="#4A6EEB"
              style={{ height: '2.5em', width: '2.5em' }}
              url="https://open.spotify.com/user/hmccofhk?si=bd64100596904a95"
            />
            <SocialIcon
              target="_blank"
              bgColor="#DBE9FF"
              fgColor="#4A6EEB"
              style={{ height: '2.5em', width: '2.5em' }}
              url="https://www.facebook.com/hmccofhk/"
            />
            <SocialIcon
              target="_blank"
              bgColor="#DBE9FF"
              fgColor="#4A6EEB"
              style={{ height: '2.5em', width: '2.5em' }}
              url="https://twitter.com/hmcc_hk?lang=en"
            />
            <SocialIcon
              target="_blank"
              bgColor="#DBE9FF"
              fgColor="#4A6EEB"
              style={{ height: '2.5em', width: '2.5em' }}
              url="https://vimeo.com/hmcchk"
            />
          </HStack>
        </VStack>
        <Spacer />
        <Flex py={['3em', '0']} w={['80%', 'auto']} mx="auto">
          <Stack direction={['column', 'row']}>
            <VStack px={[0, '2em']} align={['center', 'start']}>
              <Link
                href="/online"
                id="footer-visit-online"
                _hover={{
                  textDecoration: 'underline',
                  textDecorationColor: '#4A6EEB',
                }}
              >
                <Text
                  fontSize="16px"
                  fontFamily="Manrope"
                  color="#4A6EEB"
                  textAlign="center"
                >
                  Church Online
                </Text>
              </Link>
              <Link
                href="/about-us"
                id="footer-about"
                _hover={{
                  textDecoration: 'underline',
                  textDecorationColor: '#4A6EEB',
                }}
              >
                <Text
                  fontSize="16px"
                  fontFamily="Manrope"
                  fontWeight="700"
                  color="#4A6EEB"
                  textAlign="center"
                >
                  About
                </Text>
              </Link>
              <Link
                href="/discover"
                id="footer-connect"
                _hover={{
                  textDecoration: 'underline',
                  textDecorationColor: '#4A6EEB',
                }}
              >
                <Text
                  fontSize="16px"
                  fontFamily="Manrope"
                  fontWeight="700"
                  color="#4A6EEB"
                  textAlign="center"
                >
                  Discover
                </Text>
              </Link>
              <Link
                href="/discover#lifegroup"
                id="footer-connect-lg"
                _hover={{
                  textDecoration: 'underline',
                  textDecorationColor: '#4A6EEB',
                }}
              >
                <Text fontSize="16px" fontFamily="Manrope" color="#4A6EEB">
                  LIFE Group
                </Text>
              </Link>
            </VStack>
            <VStack px="2em" align={['center', 'start']}>
              <Link
                href="/events"
                id="footer-events"
                _hover={{
                  textDecoration: 'underline',
                  textDecorationColor: '#4A6EEB',
                }}
              >
                <Text
                  fontSize="16px"
                  fontFamily="Manrope"
                  fontWeight="700"
                  color="#4A6EEB"
                  textAlign="center"
                >
                  Events
                </Text>
              </Link>
              <Link
                href="/sermons"
                id="footer-sermons"
                _hover={{
                  textDecoration: 'underline',
                  textDecorationColor: '#4A6EEB',
                }}
              >
                <Text
                  fontSize="16px"
                  fontFamily="Manrope"
                  fontWeight="700"
                  color="#4A6EEB"
                  textAlign="center"
                >
                  Sermons
                </Text>
              </Link>
              <Link
                href="/give"
                id="footer-give"
                _hover={{
                  textDecoration: 'underline',
                  textDecorationColor: '#4A6EEB',
                }}
              >
                <Text
                  fontSize="16px"
                  fontFamily="Manrope"
                  fontWeight="700"
                  color="#4A6EEB"
                  textAlign="center"
                >
                  Give
                </Text>
              </Link>
              <Link
                href="/privacy-policy"
                id="footer-privacy-policy"
                _hover={{
                  textDecoration: 'underline',
                  textDecorationColor: '#4A6EEB',
                }}
              >
                <Text
                  fontSize="16px"
                  fontFamily="Manrope"
                  color="#4A6EEB"
                  textAlign="center"
                >
                  Privacy Policy
                </Text>
              </Link>
            </VStack>
          </Stack>
          <Spacer />
          <VStack px="2em" align={['center', 'start']}>
            <Link
              href="https://play.google.com/store/apps/details?id=net.hmcc.hongkong.dailysoap&hl=en"
              _hover={{
                textDecoration: 'underline',
                textDecorationColor: '#4A6EEB',
              }}
            >
              <Text
                fontSize="16px"
                fontFamily="Manrope"
                color="#4A6EEB"
                textAlign="center"
              >
                Daily SOAP
              </Text>
            </Link>
            <Link
              href="https://hmcc.tv/"
              _hover={{
                textDecoration: 'underline',
                textDecorationColor: '#4A6EEB',
              }}
            >
              <Text
                fontSize="16px"
                fontFamily="Manrope"
                color="#4A6EEB"
                textAlign="center"
              >
                HMCC.TV
              </Text>
            </Link>
          </VStack>
        </Flex>
      </Flex>
      <Box w="100%">
        <Text
          textAlign="center"
          color="#0C0C20"
          fontSize="14px"
          fontFamily="'Inter', sans-serif"
          fontWeight="400"
          lineHeight="21px"
          wordBreak="break-word"
        >
          © 1996-2024 Harvest Mission Community Church. All rights reserved.
        </Text>
      </Box>
    </Container>
  );
};
export default Footer;
