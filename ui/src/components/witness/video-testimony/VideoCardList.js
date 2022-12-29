import React, { useState } from 'react';
import {
  Grid,
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
  Text,
} from '@chakra-ui/react';
import { BiFilterAlt } from 'react-icons/bi';
import FilterVideos from './FilterVideos';
import VideoCard from './VideoCard';
import Pagination from '../../helpers/Pagination';

const VideoCardList = ({ allVideos }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 12;
  const [filteredTags, setFilteredTags] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  // Filter section

  const videos = allVideos.filter((video) => {
    if (filteredTags.length === 0) {
      return true;
    } else {
      let foundMatchingTag = false;
      video.tags.forEach((tag) => {
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

  // Pagination section
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <HStack marginTop={[4, 8]} spacing="auto">
        <Text
          textStyle="dm_sans"
          size="md"
          color="#73539B"
          fontSize={['1.25rem', '2rem']}
          fontWeight={500}
          minWidth="50vw"
        >
          ALL VIDEO TESTIMONIES
        </Text>
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
      <Grid
        mt={['6', '12']}
        mb={['6', '12']}
        templateColumns={['repeat(1, 1fr)', 'repeat(3, 1fr)']}
        gap={[3, 6]}
      >
        {currentVideos.length > 0 &&
          currentVideos.map((video, i) => (
            <VideoCard
              key={video.id}
              videoData={video}
              allVideos={allVideos}
            />
          ))}
      </Grid>
      <Pagination
        itemsPerPage={videosPerPage}
        totalItems={videos.length}
        paginate={paginate}
      />
      <Drawer
        isOpen={isOpen}
        size="full"
        onClose={onClose}
        finalFocusRef={btnRef}
        placement="right"
      >
        <DrawerOverlay />
        <DrawerContent paddingTop="10">
          <DrawerCloseButton margin="5" />
          <DrawerHeader />
          <DrawerBody>
            <FilterVideos
              allVideos={allVideos}
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

export default VideoCardList;
