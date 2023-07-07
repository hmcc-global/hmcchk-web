import { Box, SimpleGrid, Stack, Link, Text } from '@chakra-ui/react';
import { Link as HashLink } from 'react-router-dom';
import * as React from 'react';

export function LinkGrid() {
  return (
    <SimpleGrid
      columns="2"
      textAlign="left"
      minW="50%"
      spacing={['2vh', '2vh', '2vw']}
    >
      <Stack spacing="10">
        <Stack>
          <Link href="/visit-us">
            <Text fontWeight="bold">Visit</Text>
          </Link>

          <Link href="/online">Church online</Link>
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
        <Stack>
          <Link href="https://hongkong.sub.hmcc.net/privacy-policy-2/">
            <Text fontWeight="bold">Privacy Policy</Text>
          </Link>
          <Link href="/give">
            <Text fontWeight="bold">Give</Text>
          </Link>
          <Link href="/events">
            <Text fontWeight="bold">Events</Text>
          </Link>
          <Link href="/sermons">
            <Text fontWeight="bold">Sermons</Text>
          </Link>
        </Stack>
      </Stack>
      <Box>
        <Stack>
          <Link href="/about-us">
            <Text fontWeight="bold">About</Text>
          </Link>
          <Link href="/about-us#our-story">
            <Text>Our Story</Text>
          </Link>
          <Link href="/about-us#vision-mission">
            <Text>{'Vision & Mission'}</Text>
          </Link>
          <Link href="/about-us#values">
            <Text>Our Values</Text>
          </Link>
          <Link href="/about-us#strategy">
            <Text>Our Strategy</Text>
          </Link>
          <Link href="/about-us#staff">
            <Text>Our Staff</Text>
          </Link>
          <Link href="/about-us#beliefs">
            <Text>Beliefs</Text>
          </Link>
          <Link href="/about-us#missions">
            <Text>Our Heart for Missions</Text>
          </Link>
        </Stack>
      </Box>
    </SimpleGrid>
  );
}
