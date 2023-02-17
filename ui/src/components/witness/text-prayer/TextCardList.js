import React, { useState, useRef } from 'react';
import {
  Grid,
  Text,
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
  const [filterTopic, setfilterTopic] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  // filter section
  const texts = allText.filter((text) => {
    if (filterTopic === undefined) {
      return true;
    } else {
      let foundMatchingTag = false;
      if (filterTopic === text.topic) foundMatchingTag = true;
      return foundMatchingTag;
    }
  });

  const handleTagChange = (topic) => {
    setfilterTopic(topic);
  };

  const clearFilter = () => {
    setfilterTopic();
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
      <HStack spacing="auto">
        <Button
          marginLeft="auto"
          marginRight={0}
          width={['35%', '23%', '12%']}
          display="flex"
          background="#696969"
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
      <Grid
        marginTop={[4, 8]}
        templateColumns={['repeat(2, 1fr)', 'repeat(3, 1fr)']}
        gap={[3, 6]}
      >
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
              filterTopic={filterTopic}
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
