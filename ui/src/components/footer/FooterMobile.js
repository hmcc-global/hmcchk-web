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
import { Copyright } from './Copyright';
import { SoapAppDownloadButton } from './SoapDownloadButton';
import { ChurchAppDownloadButton } from './ChurchAppDownloadButton';
import DailyBrp from '../helpers/DailyBrp';
import { useHistory } from 'react-router-dom';
import LinkList from './footerLinks.json';

const AccordionLink = (
  linkText,
  href,
  target = '_self',
  id,
  fontWeight = '400',
) => {
  return (
    <AccordionItem border="none" fontWeight={fontWeight}>
      <h2>
        <AccordionButton as={Link} href={href} target={target} id={id}>
          <Box as="span" flex="1" textAlign="left">
            {linkText}
          </Box>
        </AccordionButton>
      </h2>
    </AccordionItem>
  );
};

const AccordionHeader = (linkText, children) => {
  return (
    <AccordionItem border="none">
      {({ isExpanded }) => (
        <>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left" fontWeight="700">
                {linkText}
              </Box>
              {isExpanded ? (
                <MinusIcon fontSize="12px" />
              ) : (
                <AddIcon fontSize="12px" />
              )}
            </AccordionButton>
          </h2>
          <AccordionPanel pb={0}>
            <Accordion>
              {children.map((item) =>
                AccordionLink(
                  item['linkText'],
                  item['href'],
                  item['target'] ? item['target'] : '_self',
                  item['id'],
                )
              )}
            </Accordion>
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
};

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
              target="_blank"
              id="footer-hmcc.tv"
            >
              <Text px="7" fontWeight="700">
                HMCC.TV
              </Text>
            </Button>
          </VStack>
          <Accordion borderTop="1px" borderBottom="1px" w="100%" allowToggle>
            {LinkList.map((item) => {
              if (item['children'])
                return AccordionHeader(item['linkText'], item['children']);
              else
                return AccordionLink(
                  item['linkText'],
                  item['href'],
                  item['target'] ? item['target'] : '_self',
                  item['id'],
                  700,
                );
            })}
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
