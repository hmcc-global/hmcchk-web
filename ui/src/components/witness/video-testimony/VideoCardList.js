import React, { useState, useEffect } from 'react';
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
// import FilterSermon from './FilterSermons';
// import SermonCard from './SermonCard';
// import RelatedSermonCard from './RelatedSermonCard';

const VideoCardList = ({ allVideos }, props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 12;
//   const [filterSpeaker, setFilterSpeaker] = useState('');
//   const [filterSermonSeries, setFilterSermonSeries] = useState('');
//   const [filterBook, setFilterBook] = useState('');
//   const [filterServiceType, setFilterServiceType] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
//   const filterData = [
//     filterSpeaker,
//     filterSermonSeries,
//     filterBook,
//     filterServiceType,
//   ];
  const btnRef = React.useRef();

  //filter section

  const videos = allVideos;

//   const filterSermon = (event) => {
//     setCurrentPage(1);
//     if (event.target.name == 'speaker') {
//       setFilterSpeaker(event.target.value);
//     } else if (event.target.name == 'sermon') {
//       setFilterSermonSeries(event.target.value);
//     } else if (event.target.name == 'book') {
//       setFilterBook(event.target.value);
//     } else if (event.target.name == 'service') {
//       setFilterServiceType(event.target.value);
//     }
//   };
//   const sermons = allSermons
//     .filter((sermon) => {
//       if (sermon.speaker[0] != null)
//         return sermon.speaker[0].name.includes(filterSpeaker);
//     })
//     .filter((sermon) => {
//       if (sermon.sermonSeries[0] != null)
//         return sermon.sermonSeries[0].name.includes(filterSermonSeries);
//     })
//     .filter((sermon) => {
//       if (sermon.passage != null) return sermon.passage.includes(filterBook);
//     })
//     .filter((sermon) => {
//       if (sermon.serviceType[0] != null)
//         return sermon.serviceType[0].name.includes(filterServiceType);
//     });
//   const clearFilter = () => {
//     setFilterSpeaker('');
//     setFilterSermonSeries('');
//     setFilterBook('');
//     setFilterServiceType('');
//   };

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
            display={{ base: 'flex', md: 'none' }}
            background="#0628A3"
            backdropFilter="blur(6px)"
            borderRadius="10px"
            color="white"
            ref={btnRef}
            // onClick={onOpen}
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
      {/* <Drawer
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
            <FilterSermon
              allSermons={allSermons}
              filterSermon={filterSermon}
              filterData={filterData}
              clearFilter={clearFilter}
              onClose={onClose}
            />
          </DrawerBody>
          <DrawerFooter fontSize="sm" color="black" justifyContent="center">
            Harvest Mission Community Church {new Date().getFullYear()}
          </DrawerFooter>
        </DrawerContent>
      </Drawer> */}
    </>
  );
};

export default VideoCardList;
