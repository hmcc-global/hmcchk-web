import React from 'react';
import { Box, Container, Heading, Text, Stack, Image, Grid, GridItem, chakra, useTheme } from '@chakra-ui/react';

const EasterContainer = () => {
  const theme = useTheme();

  return (
    <Box 
      background="linear-gradient(180deg, #F6FAFF 0%, #FFF7E2 23.56%, #F9E6DB 65.87%, #F6FAFF 92.79%)"
      minH="1800px"
      py={8} 
      fontFamily={theme.fonts?.body}
    >
      <Container maxW="container.xl" px={{ base: 6, md: 10 }}>
        <Heading
          as="h1"
          fontFamily="'DM Serif Display', Georgia, serif"
          fontStyle="italic"
          fontWeight="400"
          fontSize={{ base: '4xl', lg: '60px' }}
          lineHeight={{ base: '1.03', lg: '0.97' }}
          letterSpacing={{ base: '-1px', lg: '-2px' }}
          bgGradient="linear(to-r, #4C004A, #A62E5E)"
          bgClip="text"
          pb={2}
          mb={{ base: '17px', md: 8 }}
        >
          Passion Week 2026:{' '}
          <span display={{ base: 'block', lg: 'inline' }}>Living Hope</span>
        </Heading>

        <Grid
          templateColumns={{ base: '1fr', md: '5fr 6fr' }}
          gap={{ base: '26.56px', md: 10 }}
          alignItems="center"
        >
          <GridItem>
            <Box
              overflow="hidden"
              bg="gray.100"
              w="full"
              sx={{ aspectRatio: '16/9' }}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Image
                src={process.env.PUBLIC_URL + '/images/easter/ad.png'}
                alt="Living Hope graphic"
                w="full"
                h="full"
                objectFit="cover"
              />
            </Box>
          </GridItem>

          <GridItem>
            <Stack spacing={{ base: '17px', lg: '32px' }} textAlign="center">
              <Text
                textStyle="instrument_serif_bold"
                fontSize={{ base: 'lg', lg: '30px' }}
                color="#A81D4B"
                lineHeight={{ base: 'normal', lg: '32px' }}
              >
                Romans 15:13 (NIV), &ldquo;May the God of hope fill you with all joy and peace as
                you trust in him, so that you may overflow with hope by the power of the Holy
                Spirit.&rdquo;
              </Text>

              <Text
                textStyle="manrope"
                fontSize={{ base: 'sm', lg: '20px' }}
                color="black"
                lineHeight="normal"
              >
                This Easter, we want to experience the living hope we have in Jesus Christ.
                Let&rsquo;s believe that Jesus is the reason for our hope, demonstrated through the
                cross and His resurrection. As we have received this hope we can overflow with hope,
                joy, and peace in our lives!
              </Text>
            </Stack>
          </GridItem>
        </Grid>

      </Container>
    </Box>
  );
};

export default EasterContainer;
