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
} from '@chakra-ui/react';
import { Copyright } from './Copyright';
import { LinkGrid } from './LinkGrid';
import { SoapAppDownloadButton } from './SoapDownloadButton';
import { ChurchAppDownloadButton } from './ChurchAppDownloadButton';
import DailyBrp from '../helpers/DailyBrp';
import { useHistory } from 'react-router-dom';

const FooterDesktop = (props) => {
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
      <Container maxW="container.lg">
        <Stack direction="row" w="100%" spacing="10">
          <VStack spacing="10">
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
          <VStack spacing="20">
            <Button
              variant="outline"
              colorScheme="white"
              as={Link}
              href="https://hmcc.tv"
            >
              <Text px="5" fontWeight="700">
                HMCC.TV
              </Text>
            </Button>
            <VStack>
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
              <Box>
                <Text fontWeight="700" align="center">
                  Harvest Mission Community Church
                </Text>
                <Text fontWeight="700" align="center">
                  (Hong Kong)
                </Text>
              </Box>
              <Text color="white" fontWeight="600" pt="5">
                Today's BRP : <DailyBrp />
              </Text>
            </VStack>
          </VStack>
          <VStack spacing="10">
            <LinkGrid />
          </VStack>
        </Stack>

        <Center py="5vh">
          <Copyright />
        </Center>
      </Container>
    </Box>
  );
};

export default FooterDesktop;
