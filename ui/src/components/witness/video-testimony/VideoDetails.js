import {
  HStack,
  VStack,
  Box,
  Button,
  Stack,
  AspectRatio,
  Link,
  Text,
  Container,
  Tag,
  Grid,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { DateTime } from 'luxon';
import { DATE_FULL } from 'luxon/src/impl/formats';
import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router';
import VideoCard from './VideoCard';
import { customAxios as axios } from '../../helpers/customAxios';
import { parseDescription } from '../../helpers/parseDescription';

const VideoDetails = (props) => {
  const [video, setVideo] = useState();
  const [allVideos, setAllVideos] = useState([]);
  const [videoUrl, setVideoUrl] = useState();
  const [videoDate, setVideoDate] = useState();
  const [randomVideos, setRandomVideos] = useState([]);
  const currId = props.match.params.id;
  const history = useHistory();

  const getData = useCallback(async () => {
    try {
      const { data, status } = await axios.get(
        '/api/witness/get-witness-videos'
      );
      if (status === 200) {
        let currentVideo = data.find(({ id }) => id === parseInt(currId));
        if (!currentVideo) {
          history.push('/404');
        }
        setAllVideos([...data]);
        setVideo(currentVideo);
      } else {
        throw Error('Something went wrong');
      }
    } catch (err) {
      console.log(err);
    }
  }, [currId, history]);

  const getVideoDate = useCallback(() => {
    console.log(video);
    let videoDate = DateTime.fromISO(video.startDate).toLocaleString(DATE_FULL);
    setVideoDate(videoDate);
  }, [video]);

  const getVideoCode = useCallback(() => {
    let witnessVideoCode =
      video.videoLink.split('/')[video.videoLink.split('/').length - 1];
    setVideoUrl(`https://www.youtube.com/embed/${witnessVideoCode}`);
  }, [video]);

  const randomIndex = (max) => {
    var arr = [];
    while (arr.length < Math.min(max, 3)) {
      var r = Math.floor(Math.random() * max);
      if (arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
  };

  const getRandomVideos = useCallback(() => {
    let sameYearVideos = allVideos.filter(
      (random) =>
        DateTime.fromISO(video.startDate).hasSame(
          DateTime.fromISO(video.startDate),
          'year'
        ) && random.id !== video.id
    );
    let randomVideos = [];
    randomIndex(sameYearVideos.length).forEach((i) => {
      randomVideos.push(sameYearVideos[i]);
    });
    randomVideos = randomVideos.sort(
      (a, b) => DateTime.fromISO(b.startDate) - DateTime.fromISO(a.startDate)
    );
    setRandomVideos(randomVideos);
  }, [allVideos, video]);

  useEffect(() => {
    (async () => {
      await getData();
    })();
  }, [currId, getData]);

  useEffect(() => {
    if (allVideos && video) {
      getVideoDate();
      getVideoCode();
      getRandomVideos();
    }
  }, [allVideos, getRandomVideos, getVideoDate, getVideoCode, video]);

  return (
    <>
      {video && allVideos && (
        <Container maxW="container.lg">
          <Box mb="20px" mt="20px">
            <VStack alignItems="left" alignContent="left">
              <Link href="/witness/testimonies">
                <Button
                  variant="link"
                  fontSize={32}
                  color="black"
                  justifyContent="left"
                  leftIcon={<ArrowBackIcon />}
                  display="flex"
                  mb={3}
                />
              </Link>
              <AspectRatio mb="5" width="100%" ratio={16 / 9}>
                <iframe
                  width="560"
                  height="315"
                  src={videoUrl}
                  title="Video player"
                  frameBorder="0"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                  allowFullScreen
                ></iframe>
              </AspectRatio>
              <Text fontWeight="bold" fontSize={{ base: 'xl', md: '3xl' }}>
                {video.title}
              </Text>
              <Stack spacing={8}>
                <Box>
                  <VStack alignItems="left" spacing={[4, 6]}>
                    <HStack spacing={[0, 2]}>
                      <Text fontWeight="bold" display={['none', 'flex']}>
                        Date:
                      </Text>
                      <Text>{videoDate}</Text>
                    </HStack>
                    <HStack>
                      {video.tags.map((tag) => (
                        <Tag
                          fontSize={['md', 'lg']}
                          borderRadius={20}
                          p={3}
                          colorScheme="blue"
                        >
                          {tag}
                        </Tag>
                      ))}
                    </HStack>
                    <Box>
                      <Text fontWeight="bold">Description: </Text>
                      <Text>{parseDescription(video.description)}</Text>
                    </Box>
                  </VStack>
                </Box>
                <Stack spacing={4}>
                  <Text fontWeight="bold" color="#0628A3" fontSize="xl">
                    WATCH OTHER TESTIMONIES
                  </Text>
                  <Grid
                    mt={['6', '12']}
                    mb={['6', '12']}
                    templateColumns={['repeat(1, 1fr)', 'repeat(3, 1fr)']}
                    gap={[3, 6]}
                  >
                    {randomVideos.length > 0 &&
                      randomVideos.map((video, i) => (
                        <VideoCard key={video.id} videoData={video} />
                      ))}
                  </Grid>
                </Stack>
              </Stack>
            </VStack>
          </Box>
        </Container>
      )}
    </>
  );
};

export default VideoDetails;
