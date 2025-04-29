import {
  Button,
  Container,
  Text,
  HStack,
  OrderedList,
  ListItem,
  VStack,
  Box,
  LinkOverlay,
  LinkBox,
} from '@chakra-ui/react';
import { AiOutlineInstagram } from 'react-icons/ai';
import { ArrowForwardIcon } from '@chakra-ui/icons';

const InstagramSection = (props) => {
  return (
    <>
      <Container
        maxW="container.lg"
        py={10}
        fontFamily="Lexend_Peta"
        borderRadius={24}
        background="radial-gradient(155.2% 134.86% at 50% -7.08%, #A6EFFF 0%, #FFFFFF 32.51%, rgba(255, 255, 255, 0.00) 52.22%), radial-gradient(106.2% 92.28% at 50% 115.06%, #FFF8A6 0%, #FFFBEA 54.46%)"
        overflow="unset"
      >
        <Text
          fontFamily="Lexend_Peta_Bold"
          fontSize={{ base: '1.625rem', md: '2rem' }}
          letterSpacing={{ base: '-4.94px', md: '-6.08px' }}
          textAlign="center"
          lineHeight={{ base: '90%' }}
        >
          WE ARE SHARING TESTIMONIES!
        </Text>
        <HStack
          marginTop="1em"
          justify="center"
          textColor="#3A3A3A"
          spacing={8}
        >
          <LinkBox>
            <LinkOverlay
              href="https://www.instagram.com/explore/search/keyword/?q=%23hmccredeemed2025"
              isExternal
            >
              <Button
                backgroundColor="#EBFCFF"
                borderRadius="24px"
                fontSize={{ base: '0.75rem', md: '1rem' }}
                letterSpacing={{ base: '-2.28px' }}
                height={{ base: '2rem', md: '2rem' }}
              >
                #hmccredeemed2025
              </Button>
            </LinkOverlay>
          </LinkBox>
          <LinkBox>
            <LinkOverlay
              href="https://www.instagram.com/hmcc_hk/"
              isExternal
            >
              <Button
                backgroundColor="#EBFCFF"
                borderRadius="24px"
                fontSize={{ base: '0.75rem', md: '1rem' }}
                letterSpacing={{ base: '-2.28px' }}
                height={{ base: '2rem', md: '2rem' }}
              >
                @hmcc_hk
              </Button>
            </LinkOverlay>
          </LinkBox>
        </HStack>

        <Text
          marginTop="2em"
          fontSize={{ base: '1rem', md: '1.5rem' }}
          fontWeight={900}
          letterSpacing={{ base: '-3.04px', md: '-4.56px' }}
          textAlign="center"
          w={{ base: '70%' }}
          mx="auto"
          lineHeight="120.156%"
        >
          PARTICIATE IN THE{' '}
          <Box display={{ base: 'block', md: 'none' }} height={0}>
            &nbsp;
          </Box>{' '}
          TESTIMONY CAMPAIGN
        </Text>
        <HStack
          justify={{ base: 'flex-start', md: 'center' }}
          marginTop={{ base: '2rem', md: '1em' }}
          fontFamily="Manrope"
          fontSize={{ md: '1.125rem' }}
          minW="100%"
          marginX="3"
        >
          <OrderedList
            style={{ listStyleType: 'none' }}
            marginX={{ base: '0' }}
          >
            <ListItem
              paddingLeft={{ md: '2rem' }}
              fontWeight="600"
              lineHeight="160%"
              display={{ base: 'flex' }}
              marginBottom={{ base: '1rem', md: '0rem' }}
            >
              <Box
                width={{ base: '1.8rem', md: '1.8rem' }}
                height={{ base: '1.8rem', md: '1.8rem' }}
                lineHeight="1.5rem"
                borderRadius="50%"
                backgroundColor="#C6F4FF"
                color="black"
                textAlign="center"
                marginRight={{ base: '1rem', md: '1em' }}
                marginBottom={{ base: '0.8em', md: '1em' }}
                marginTop={{ base: '0.3rem', md: '0rem' }}
                fontSize="1rem"
                fontWeight={700}
              >
                1
              </Box>

              <Text
                lineHeight="160%"
                fontFamily="Manrope"
                fontSize={{ base: '0.8rem', md: '1.125rem' }}
                fontWeight={600}
              >
                Post a Redeemed Testimony with the following
                <Box display={{ base: 'block', md: 'none' }} height={0}>
                  &nbsp;
                </Box>{' '}
                prompt:
              </Text>
            </ListItem>
            <ListItem
              marginLeft={{ base: '3em', md: '4em' }}
              display="flex"
              alignItems="center"
              mb="1em"
            >
              <Box
                display="inline-block"
                width={{ base: '0.2rem', md: '0.2em' }}
                height={{ base: '2.5rem', md: '1.5em' }}
                bg="#8AC9D8"
                borderRadius="0.2rem"
                mr="0.5rem"
              />
              <Text
                fontFamily="Lexend_Peta"
                fontWeight="700"
                color="#1587A1"
                lineHeight={{ base: '90%' }}
                letterSpacing={{ base: '-2.66px', md: '-2px' }}
                fontSize={{ base: '0.875rem', md: '1.125rem' }}
              >
                Jesus redeemed me from{' '}
                <Text as="span" fontFamily="Manrope" fontWeight="extrabold">
                  _________,
                </Text>
                <Box display={{ base: 'block', md: 'none' }}>&nbsp;</Box> now I
                am{' '}
                <Text as="span" fontFamily="Manrope" fontWeight="extrabold">
                  _________
                </Text>
                .
              </Text>
            </ListItem>
            <ListItem
              paddingLeft={{ md: '2rem' }}
              fontWeight="600"
              lineHeight="160%"
              display={{ base: 'flex' }}
            >
              <Box
                width={{ base: '1.8rem', md: '1.8rem' }}
                height={{ base: '1.8rem', md: '1.8rem' }}
                lineHeight="1.5rem"
                borderRadius="50%"
                backgroundColor="#C6F4FF"
                color="black"
                textAlign="center"
                marginRight={{ base: '1rem', md: '1rem' }}
                marginBottom={{ base: '0.8em', md: '1em' }}
                marginTop={{ base: '0.3rem', md: '0rem' }}
                fontSize="1rem"
                fontWeight={700}
              >
                2
              </Box>

              <Text
                lineHeight="160%"
                fontFamily="Manrope"
                fontSize={{ base: '0.8rem', md: '1.125rem' }}
              >
                Include the hashtag <b>#HMCCREDEEMED 2025</b>{' '}
                <Box display={{ base: 'block', md: 'none' }} height={0}>
                  &nbsp;
                </Box>{' '}
                and tag <b>@HMCC_HK</b> in your post.
              </Text>
            </ListItem>
          </OrderedList>
        </HStack>

        <VStack
          justify="center"
          marginTop={{ base: '2.9rem', md: '1.5em' }}
          height="90vh"
        >
          <LinkBox>
            <LinkOverlay
              href="https://www.instagram.com/explore/search/keyword/?q=%23hmccredeemed2025"
              isExternal
            >
              <Button
                leftIcon={<AiOutlineInstagram size="1.6rem" />}
                marginBottom="1em"
                background="linear-gradient(90deg, #FFFEEC 0%, #FFFA8B 100%), linear-gradient(270deg, #94EBFF 0%, #F4FDFF 100%)"
                border="0.7px solid #000"
                borderRadius="20px"
                py="1.5rem"
                _hover={{
                  background:
                    'linear-gradient(90deg, #FFFBA2 0%, #FFF74F 100%), linear-gradient(270deg, #0FACD0 0%, #5EE1FF 100%)',
                }}
              >
                <Text
                  fontFamily="Lexend_Peta_Bold"
                  fontSize={{ base: '0.875rem', md: '1.25rem' }}
                  letterSpacing={{ base: '-2.66px', md: '-4px' }}
                  lineHeight={{ md: '120.156%' }}
                  fontWeight="700"
                  mr="2"
                >
                  CHECK IT OUT ON INSTAGRAM
                </Text>

                <ArrowForwardIcon boxSize={6} />
              </Button>
            </LinkOverlay>
          </LinkBox>
          <Box width={{ base: '90%', md: '80%' }} height="90%" border="none">
            <iframe
              title="instagram"
              src="https://widget.taggbox.com/2163216"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
              }}
            ></iframe>
          </Box>
        </VStack>
      </Container>
    </>
  );
};

export default InstagramSection;
