import { SocialMediaLinks } from './SocialMediaLinks';
import {
  Link,
  Container,
  Image,
  Text,
  VStack,
  Center,
  Button,
  Flex,
  Spacer,
  Divider,
  Box,
} from '@chakra-ui/react';
import { Copyright } from './Copyright';
import { LinkGrid } from './LinkGrid';
import { SoapAppDownloadButton } from './SoapDownloadButton';
import { ChurchAppDownloadButton } from './ChurchAppDownloadButton';
import DailyBrp from '../helpers/DailyBrp';

export default function FooterContainer() {
  return (
    <Box
      as="footer"
      role="contentinfo"
      mx="auto"
      w="100%"
      py="12"
      bg="#222222"
      color="white"
    >
      <Container maxW="container.lg">
        <Flex
          direction={['column', 'column', 'row']}
          w={('80%', '80%', '100%')}
          spacing="10"
        >
          <VStack spacing="10">
            <Link href="/">
              <Image
                h={{
                  base: '3.5vh',
                  sm: '4vh',
                  md: '4.5vh',
                  lg: '5vh',
                }}
                src={process.env.PUBLIC_URL + '/images/ripple.svg'}
                alt="Logo of HMCC"
              />
            </Link>
            <Button
              colorScheme="teal"
              variant="outline"
              _hover={{ bg: 'teal.600' }}
            >
              <Text color="white">
                Today's BRP : <DailyBrp />
              </Text>
            </Button>
            <Box>
              <Text fontWeight="bold" align="center">
                Harvest Mission Community Church
              </Text>
              <Text fontWeight="bold" align="center">
                (Hong Kong)
              </Text>
            </Box>
            <ChurchAppDownloadButton />
            <SoapAppDownloadButton />
          </VStack>

          <Box minH={['10', '10', '0']}></Box>
          <Spacer />
          <VStack spacing="10">
            <LinkGrid />
            <Divider w={['100%', '100%', '0%']} />
            <Box minW="100%">
              <Text>Contact Us</Text>
              <Link href="mailto:hongkong@hmcc.net" fontWeight="bold">
                hongkong@hmcc.net
              </Link>
            </Box>
            <Box minW="100%">
              <SocialMediaLinks />
            </Box>
          </VStack>
        </Flex>

        <Center py="5vh">
          <Copyright />
        </Center>
      </Container>
    </Box>
  );
}
