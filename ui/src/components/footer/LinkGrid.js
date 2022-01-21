import { Box, SimpleGrid, Stack, Link, Text } from '@chakra-ui/react';
import { Link as HashLink } from 'react-router-dom';
import * as React from 'react';

export function LinkGrid() {
  return (
    <SimpleGrid
      columns={[2, 2, 4]}
      textAlign="left"
      minW="50%"
      spacing={['2vh', '2vh', '2vw']}
    >
      <Box>
        <Stack>
          <Link href="/visit-us">
            <Text fontWeight="bold">Visit</Text>
          </Link>

          <Link href="/sermons">Church online</Link>
        </Stack>
      </Box>
      <Box>
        <Stack>
          <Link href="/connect">
            <Text fontWeight="bold">Connect</Text>
          </Link>
          <HashLink to={{ pathname: '/connect', hash: '#ministries' }}>
            Ministries
          </HashLink>
          <HashLink to={{ pathname: '/connect', hash: '#lifegroup' }}>
            <Text>LIFE Groups</Text>
          </HashLink>
        </Stack>
      </Box>
      <Box>
        <Stack>
          <Link href="/about-us">
            <Text fontWeight="bold">About</Text>
          </Link>
          <Link href="/about-us">
            <Text>Who We Are</Text>
          </Link>
          <Link href="/about-us">
            <Text>Beliefs</Text>
          </Link>
          <Link href="/about-us">
            <Text>Our Values</Text>
          </Link>
          <Link href="/about-us">
            <Text>Statement of Faith</Text>
          </Link>
          <Link href="/about-us">
            <Text>Bold Vision</Text>
          </Link>
          <Link href="/about-us">
            <Text>HMI</Text>
          </Link>
        </Stack>
      </Box>

      <Box>
        <Stack>
          <Link href="/events">
            <Text fontWeight="bold">Events</Text>
          </Link>
          <Link href="/sermons">
            <Text fontWeight="bold">Sermons</Text>
          </Link>
          <Link href="/give">
            <Text fontWeight="bold">Give</Text>
          </Link>
          <Link href="https://hongkong.sub.hmcc.net/privacy-policy-2/">
            <Text fontWeight="bold">Privacy Policy</Text>
          </Link>
        </Stack>
      </Box>
    </SimpleGrid>
  );
}
