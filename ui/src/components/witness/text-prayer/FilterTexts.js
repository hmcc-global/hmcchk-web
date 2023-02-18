import React from 'react';
import {
  Box,
  Stack,
  Button,
  Container,
  Checkbox,
  Text,
} from '@chakra-ui/react';

export const prayerTopics = [
  {
    index: 0,
    text: 'Joy in the journey',
  },
  {
    index: 1,
    text: 'Evangelize the Circle',
  },
  {
    index: 2,
    text: 'Serve our City and Campus',
  },
  {
    index: 3,
    text: 'Understand the Gospel',
  },
  {
    index: 4,
    text: 'Send People Out',
  },
  {
    index: 5,
    text: 'Passion Week',
  },
];

export const getPrayerTopic = (idx) => {
  return prayerTopics.find((e) => e.index === idx).text;
};

const FilterTexts = ({
  allTexts,
  handleTagChange,
  filterTopic,
  clearFilter,
  onClose,
}) => {
  return (
    <>
      <Container maxW="container.lg" p="0">
        <Box marginBottom={3}>
          <Text fontWeight="bold" color="#C11553" as="i" fontSize="1.25rem">
            Select tags to filter:
          </Text>
        </Box>
        <Stack
          spacing={{ base: '6', md: 'auto' }}
          alignItems="left"
          direction="column"
        >
          {prayerTopics.map((t) => (
            <Checkbox
              onChange={() => handleTagChange(t.index)}
              isChecked={filterTopic === t.index}
              color="#C11553"
              size="lg"
              borderColor="#C11553"
              outline={1}
            >
              {t.text.charAt(0).toUpperCase() + t.text.slice(1)}
            </Checkbox>
          ))}
        </Stack>
        <Stack
          direction="row"
          // spacing="auto"
          spacing={3}
          marginTop="75px"
          // display={{ base: 'flex', md: 'none' }}
          display="flex"
        >
          <Button
            onClick={clearFilter}
            // width="35vw"
            width="100%"
            background="#A6A6A6"
            border="1px transparent #000000"
            boxSizing="border-box"
            backdropFilter="blur(6px)"
            borderRadius="10px"
            color="white"
          >
            Clear
          </Button>
          <Button
            onClick={onClose}
            // width="35vw"
            width="100%"
            backgroundColor="#C11553"
            color="white"
            borderRadius="10px"
          >
            Filter
          </Button>
        </Stack>
      </Container>
    </>
  );
};

export default FilterTexts;
