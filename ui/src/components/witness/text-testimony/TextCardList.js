import React, { useState, useRef } from 'react';
import {
  Grid,
  Heading,
  Button,
  HStack,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import TextCard from './TextCard';
import Pagination from '../../helpers/Pagination';
import FilterTexts from './FilterTexts';
import { BiFilterAlt } from 'react-icons/bi';

const TextCardList = ({ allText }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const textsPerPage = 18;
  const [filteredTags, setFilteredTags] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  // filter section
  const texts = allText.filter((text) => {
    if (filteredTags.length === 0) {
      return true;
    } else {
      let foundMatchingTag = false;
      text.tags.forEach((tag) => {
        if (filteredTags.includes(tag)) foundMatchingTag = true;
      });
      return foundMatchingTag;
    }
  });

  const handleTagChange = (tag) => {
    const newTags = [...filteredTags];
    if (newTags.includes(tag)) {
      var index = newTags.indexOf(tag);
      if (index > -1) {
        newTags.splice(index, 1);
      }
      setFilteredTags(newTags);
    } else {
      setFilteredTags([...newTags, tag]);
    }
  };

  const clearFilter = () => {
    setFilteredTags([]);
  };

  const handleClose = () => {
    setCurrentPage(1);
    onClose();
  };

  // pagination section
  const indexOfLastText = currentPage * textsPerPage;
  const indexOFFirstText = indexOfLastText - textsPerPage;
  const currentTexts = texts.slice(indexOFFirstText, indexOfLastText);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <HStack marginTop={[4, 8]} spacing="auto">
        <Heading
          textStyle="dm_sans"
          size="md"
          color="#73539B"
          fontSize={['1.25rem', '2rem']}
          fontWeight={500}
        >
          WRITTEN TESTIMONIES
        </Heading>
        <Button
          width={['50%', '20%']}
          display="flex"
          background="#73539B"
          backdropFilter="blur(6px)"
          borderRadius={20}
          color="white"
          leftIcon={<BiFilterAlt />}
          ref={btnRef}
          onClick={onOpen}
        >
          FILTER
        </Button>
      </HStack>
      {/* box filter */}
      <Grid marginTop={[4, 8]} templateColumns="repeat(3, 1fr)" gap={6}>
        {currentTexts.length > 0 &&
          currentTexts.map((text, i) => (
            <TextCard key={text.id} allText={allText} textData={text} />
          ))}
      </Grid>
      <Pagination
        itemsPerPage={textsPerPage}
        totalItems={texts.length}
        paginate={paginate}
      />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent paddingTop="10">
          <DrawerCloseButton margin="5" />
          <DrawerHeader />
          <DrawerBody>
            <FilterTexts
              allTexts={allText}
              handleTagChange={handleTagChange}
              filteredTags={filteredTags}
              clearFilter={clearFilter}
              onClose={handleClose}
            />
          </DrawerBody>
          <DrawerFooter fontSize="sm" color="black" justifyContent="center">
            Harvest Mission Community Church {new Date().getFullYear()}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default TextCardList;
