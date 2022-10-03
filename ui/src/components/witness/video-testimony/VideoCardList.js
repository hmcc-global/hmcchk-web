import React, { useState } from 'react';
import {
  Grid,
  Heading,
  Button,
  Box,
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
import VideoCard from './VideoCard';
import Pagination from '../../helpers/Pagination';
import FilterVideos from './FilterVideos';

const VideoCardList = ({ allVideos }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 12;
  const [filteredTags, setFilteredTags] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  //filter section

  const videos = allVideos
    .filter((video) => {
      if (filteredTags.length === 0) {
        return true;
      } else {
        let foundMatchingTag = false;
        video.tags.forEach((tag) => {
          console.log("Checking: ", tag);
          if (filteredTags.includes(tag)) foundMatchingTag = true;
        });
        return foundMatchingTag;
      }
    });
  console.log("Tags: ", filteredTags);
  console.log("Videos: ", videos);

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

  //pagination section
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Box>
        <HStack marginTop={[4, 8]} spacing="auto">
          <Heading>Testimony Videos</Heading>
          <Button
            width="30vw"
            // display={{ base: 'flex', md: 'none' }}
            display="flex"
            background="#0628A3"
            backdropFilter="blur(6px)"
            borderRadius="10px"
            color="white"
            ref={btnRef}
            onClick={onOpen}
          >
            Filter
          </Button>
        </HStack>
        <Box display={{ base: 'none', md: 'flex' }} marginTop="10px">
          {/* <FilterSermon
            allSermons={allSermons}
            filterSermon={filterSermon}
            filterData={filterData}
          /> */}
        </Box>
        <Box>
          {/* <Button
            variant="link"
            alignSelf={['center', 'flex-end']}
            onClick={clearFilter}
            float="right"
            display={{ base: 'none', md: 'flex' }}
            marginTop="8px"
          >
            Clear Filter
          </Button> */}
        </Box>
        <Grid
          mt={['6', '12']}
          mb={['6', '12']}
          templateColumns={['repeat(1, 1fr)', 'repeat(3, 1fr)']}
          gap={[3, 6]}
          // display={{ base: 'none', md: 'grid' }}
        >
          {currentVideos.length > 0 &&
            currentVideos.map((video, i) => (
              <VideoCard
                key={video.id}
                videoData={video}
              />
            ))}
        </Grid>
        <Pagination
          itemsPerPage={videosPerPage}
          totalItems={videos.length}
          paginate={paginate}
        />
      </Box>
      <Drawer
        isOpen={isOpen}
        size="full"
        onClose={onClose}
        finalFocusRef={btnRef}
        placement="top"
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
