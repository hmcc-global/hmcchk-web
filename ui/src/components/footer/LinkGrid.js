import { Box, SimpleGrid, Stack, Link, Text } from '@chakra-ui/react';
import * as React from 'react';
import LinkList from './footerLinks.json';

const LinkItem = (linkText, href, target = '_self', fontWeight = '400') => {
  return (
    <Link href={href} key={linkText}>
      <Text fontWeight={fontWeight} target={target}>
        {linkText}
      </Text>
    </Link>
  );
};

const LinkCollection = (linkListItem) => {
  // Ternary operator, if there's children make children
  // else use empty array so nothing appears when the array is deconstructed
  let children = linkListItem['children']
    ? linkListItem['children'].map((item) => {
        return LinkItem(item['linkText'], item['href'], item['target']);
      })
    : [];

  return [
    <Link
      key={linkListItem['linkText']}
      href={linkListItem['href']}
      target={linkListItem['target'] ? linkListItem['target'] : '_self'}
    >
      <Text fontWeight="bold">{linkListItem['linkText']}</Text>
    </Link>,
    ...children,
  ];
};

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
          {LinkCollection(LinkList[1])}
          {LinkCollection(LinkList[2])}
        </Stack>
        <Stack>
          {LinkCollection(LinkList[3])}
          {LinkCollection(LinkList[4])}
          {LinkCollection(LinkList[5])}
          {LinkCollection(LinkList[6])}
        </Stack>
      </Stack>
      <Box>
        <Stack>{LinkCollection(LinkList[0])}</Stack>
      </Box>
    </SimpleGrid>
  );
}
