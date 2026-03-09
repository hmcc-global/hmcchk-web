import React from 'react';
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';

const EasterBanner = () => {
  return (
    <>
      <Heading
        as="h1"
        fontFamily="'DM Serif Display', Georgia, serif"
        fontStyle="italic"
        fontWeight="400"
        fontSize={{ base: '2.25em', lg: '3.75em' }}
        lineHeight={{ base: '1.03', lg: '0.97' }}
        letterSpacing={{ base: '-0.0625rem', lg: '-0.125rem' }}
        bgGradient="linear(to-r, #4C004A, #A62E5E)"
        bgClip="text"
        pb={2}
        mb="0.5em"
      >
        Passion Week 2026:{' '}
        <Box as="span" display={{ base: 'block', lg: 'inline' }}>
          Living Hope
        </Box>
      </Heading>

      <Grid
        templateColumns={{ base: '1fr', md: '5fr 6fr' }}
        gap={{ base: '1.66em', md: '2.5em' }}
        alignItems="center"
      >
        <GridItem>
          <Image
            src={process.env.PUBLIC_URL + '/images/easter/ad.png'}
            alt="Living Hope graphic"
            overflow="hidden"
            bg="gray.100"
            display="block"
            w="full"
            h="full"
            sx={{ aspectRatio: '16/9' }}
            objectFit="cover"
          />
        </GridItem>

        <GridItem>
          <Stack spacing={{ base: '1.0625em', lg: '2em' }} textAlign="center">
            <Text
              textStyle="instrument_serif_bold"
              fontSize={{ base: '1.125em', lg: '1.875em' }}
              color="#A81D4B"
              lineHeight={{ base: 'normal', lg: '1.1em' }}
            >
              Romans 15:13 (NIV), &ldquo;May the God of hope fill you with all joy and peace as
              you trust in him, so that you may overflow with hope by the power of the Holy
              Spirit.&rdquo;
            </Text>

            <Text
              textStyle="manrope"
              fontSize={{ base: '0.875em', lg: '1.25em' }}
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
    </>
  );
};

export default EasterBanner;
