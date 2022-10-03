import React from 'react';
import { Stack, Button, Container, Checkbox } from '@chakra-ui/react';

const FilterVideos = ({
  allVideos,
  handleTagChange,
  filteredTags,
  clearFilter,
  onClose,
}) => {
  const tagSet = new Set();
  allVideos.forEach((video) => {
    const tags = video.tags;
    if (tags.length > 0) {
      tags.forEach((tag) => {
        tagSet.add(tag);
      })
    }
  });
  const tags = Array.from(tagSet);

  return (
    <>
      <Container maxW="container.lg" p="0">
        <Stack
          spacing={{ base: '6', md: 'auto' }}
          alignItems="left"
          direction={{ base: 'column', md: 'row' }}
        >
          {tags.map((tag) => (
            <Checkbox
              isChecked={filteredTags.includes(tag)}
              onChange={() => handleTagChange(tag)}
            >
              {tag}
            </Checkbox>
          ))}
        </Stack>
        <Stack
          direction="row"
          spacing="auto"
          marginTop="75px"
          // display={{ base: 'flex', md: 'none' }}
          display="flex"
        >
          <Button
            onClick={clearFilter}
            width="35vw"
            background="transparent"
            border="1px solid #000000"
            boxSizing="border-box"
            backdropFilter="blur(6px)"
            borderRadius="10px"
          >
            Clear Filter
          </Button>
          <Button
            onClick={onClose}
            width="35vw"
            backgroundColor="#0628A3"
            color="white"
            borderRadius="10px"
          >
            Done
          </Button>
        </Stack>
      </Container>
    </>
  );
};

export default FilterVideos;
