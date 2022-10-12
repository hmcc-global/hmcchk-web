import React from 'react';
import {
  Box,
  Stack,
  Button,
  Container,
  Checkbox,
  Text,
} from '@chakra-ui/react';

const FilterTexts = ({
  allTexts,
  handleTagChange,
  filteredTags,
  clearFilter,
  onClose,
}) => {
  const tagSet = new Set();
  allTexts.forEach((textData) => {
    const tags = textData.tags;
    console.log('tags', tags);
    if (tags.length > 0) {
      tags.forEach((tag) => {
        tagSet.add(tag);
      });
    }
  });
  const tags = Array.from(tagSet);

  return (
    <>
      <Container maxW="container.lg" p="0">
        <Box marginBottom={3}>
          <Text fontWeight="bold" color="#73539B" as="i" fontSize="1.25rem">
            Select tags to filter:
          </Text>
        </Box>
        <Stack
          spacing={{ base: '6', md: 'auto' }}
          alignItems="left"
          direction={{ base: 'column', md: 'row' }}
        >
          {tags.map((tag) => (
            <Checkbox
              isChecked={filteredTags.includes(tag)}
              onChange={() => handleTagChange(tag)}
              color="#73539B"
              size="lg"
              borderColor="#73539B"
              outline={1}
            >
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
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
            backgroundColor="#73539B"
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
