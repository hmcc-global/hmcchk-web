import React, { useState, useEffect } from 'react';
import { Box, Grid, Text, HStack, Button, Link } from '@chakra-ui/react';
import { BsDot } from 'react-icons/bs';
import VideoCard from '../video-testimony/VideoCard';
import { customAxios as axios } from '../../helpers/customAxios';

const WitnessHomeVideoSection = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    try {
      const { data, status } = await axios.get(
        '/api/witness/get-witness-videos'
      );
      if (status === 200) {
        data.forEach((wv) => {
          wv.renderDate = wv.endDate;
        });
        data.sort((a, b) => (a.renderDate < b.renderDate ? 1 : -1));
        setVideos([...data]);
      } else {
        throw Error('Something went wrong');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box>
      <HStack mt={4} mb={6} spacing="auto" px={[3, 5]}>
        <Box
          w={['100%', 'auto']}
          textAlign="center"
          display="flex"
          justifyContent="center"
        >
          <Text
            textStyle="dm_sans"
            size="md"
            color="#7C2D6B"
            fontWeight={600}
            fontSize={['1rem', '1.5rem']}
            display="flex"
            alignItems="center"
          >
            HIGHLIGHT <BsDot />
            WATCH TESTIMONIES
          </Text>
        </Box>
        <Button
          textStyle="dm_sans"
          as={Link}
          href="/witness/testimonies/videos"
          border="2px"
          borderColor="#7C2D6B"
          borderRadius={20}
          color="#7C2D6B"
          fontSize={20}
          mr={4}
          size="lg"
          variant="outline"
          display={{ base: 'none', md: 'flex' }}
          position="inherit"
        >
          WATCH ALL VIDEO TESTIMONIES
        </Button>
      </HStack>
      <Grid
        mr={['3', '5']}
        ml={['3', '5']}
        mt={['6', '12']}
        mb={['6', '12']}
        templateColumns={['repeat(1, 1fr)', 'repeat(3, minmax(0, 1fr));']}
        gap={[3, 6]}
        position="inherit"
      >
        {videos.length > 0 &&
          videos
            .slice(0, 3)
            .map((video) => <VideoCard key={video.id} videoData={video} />)}
      </Grid>
      <Box display="flex" justifyContent="center">
        <Button
          textStyle="dm_sans"
          as={Link}
          href="/witness/testimonies/videos"
          border="2px"
          borderColor="#7C2D6B"
          borderRadius={10}
          color="#7C2D6B"
          fontSize={15}
          mr={[0, 4]}
          size="md"
          variant="outline"
          display={{ base: 'flex', md: 'none' }}
          position="inherit"
        >
          WATCH ALL VIDEO TESTIMONIES
        </Button>
      </Box>
    </Box>
  );
};

export default WitnessHomeVideoSection;
