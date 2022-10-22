import React, { useEffect, useState } from 'react';
import { customAxios as axios } from '../helpers/customAxios';
import {
  Button,
  Box,
  Heading,
  Flex,
  Text,
  VStack,
  Link,
  Image,
} from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { Link as ReactLink } from 'react-router-dom';

const HelpCardInfo = [
  {
    title: "I'm New",
    text: 'Connect with us',
    image: 'im-new-bg.png',
    titleStyle: { color: 'green' },
    textStyle: { color: 'black' },
    path: '/connect',
  },
  {
    title: 'Visit us',
    text: 'Every Sunday at 10AM HKT \n In-person & Online',
    image: 'visit-us-bg.png',
    titleStyle: { color: 'white' },
    textStyle: { color: 'white' },
    path: '/visit-us',
  },
  {
    title: 'About HMCC',
    text: 'Learn more about who we are',
    image: 'about-hmcc-bg.png',
    titleStyle: { color: 'white' },
    textStyle: { color: 'white' },
    path: 'about-us',
  },
];

const HelpCard = (props) => {
  return (
    <>
      <Link
        to={{ pathname: props.path }}
        as={ReactLink}
        backgroundImage={
          props.title === "I'm New"
            ? process.env.PUBLIC_URL + '/images/home/' + props.image
            : `linear-gradient(0deg, rgba(0, 0, 0, 0.22), rgba(0, 0, 0, 0.22)), url(${
                process.env.PUBLIC_URL + '/images/home/' + props.image
              })`
        }
        backdropFilter="blur(4px)"
        width="100%"
        height="auto"
        bgSize="cover"
        padding="6%"
        bgPosition="center center"
        borderRadius="10px"
        alignItems="center"
        justifyContent="center"
        display="flex"
        cursor="pointer"
        style={{ textDecoration: 'none', zIndex: 1 }}
      >
        <VStack>
          <Heading
            style={props.titleStyle}
            fontSize={{ base: '1.5rem', md: '2.5rem' }}
            fontWeight={600}
          >
            {props.title}
          </Heading>
          <Text
            style={props.textStyle}
            fontSize={{ base: '0.8rem', md: '1.2rem' }}
            textAlign="center"
            whiteSpace="pre-wrap"
          >
            {props.text}
          </Text>
        </VStack>
      </Link>
      <Box
        style={{
          background: '#9E9E9E',
          filter: 'blur(20px)',
          height: '5vh',
          width: '80%',
          position: 'relative',
          bottom: '4%',
          zIndex: 0,
          marginTop: '-20px',
        }}
      />
    </>
  );
};

const HelloSermonSection = React.forwardRef((props, ref) => {
  const [currentSermon, setCurrentSermon] = useState();
  const [isOnline, setIsOnline] = useState(false);
  const currentDate = currentSermon
    ? isOnline 
      ? DateTime.fromISO(currentSermon.sermonDateTime).toFormat('dd MMM yyyy, hh:mm a')
      : DateTime.fromISO(currentSermon.datePreached).toFormat('EEEE, dd LLLL yyyy')
    : '';
  const getLatestSermon = async () => {
    try {
      const res = await axios.get('/api/live-sermon/get-live-sermon', 
      {
        params: {
          isPublished: true
        }
      });

      if (res.status === 200 && res.data && res.data.length !== 0) {
        setIsOnline(true);
        setCurrentSermon(res.data[0]);
        return;
      }

      const { data, status } = await axios.get('/api/sermons/get-sermons');
      if (status === 200) {
        let current = data[0];
        setCurrentSermon(current);
      } else {
        throw Error('Something went wrong');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getLatestSermon();
  }, []);
  return (
    <>
      <Flex
        w="full"
        h="auto"
        justify="center"
        background={{
          base: '',
          md: ' linear-gradient(270deg, #172848 0%, #172848 50%, #FFFFFF 50%, rgba(255, 255, 255, 0) 100%)',
        }}
        id="hello"
      >
        <Box
          justifyContent="space-between"
          width="100%"
          display="flex"
          flexDirection={{ base: 'column', md: 'row' }}
        >
          <Box
            ref={ref}
            width={{ base: '100%', md: '50%' }}
            h="auto"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <VStack
              width="80%"
              padding={{ base: '3rem 0.5rem', md: '5rem 2rem' }}
              gap={4}
            >
              <Heading
                alignSelf="flex-start"
                color="#0628A3"
                fontSize={{ base: 'lg', md: '4xl' }}
                fontWeight={600}
              >
                How can we help you?
              </Heading>
              <VStack height="100%" width="100%">
                {HelpCardInfo.map((help, i) => {
                  return (
                    <React.Fragment key={i}>
                      <HelpCard {...help} />
                    </React.Fragment>
                  );
                })}
              </VStack>
            </VStack>
          </Box>
          <Box
            width={{ base: '100%', md: '50%' }}
            h="auto"
            background={{ base: '#172848', md: '' }}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <VStack
              width="80%"
              padding={{ base: '3rem 0.5rem', md: '5rem 2rem' }}
              gap={4}
            >
              <Heading color="white" alignSelf="flex-start" fontWeight={600}>
                Latest Sermon
              </Heading>
              <Box>
                <Image
                  src={
                    currentSermon
                      ? isOnline
                        ? currentSermon.sermonSeriesUrl
                        : currentSermon.sermonSeries[0].image.sourceUrl
                      : ''
                  }
                  objectFit="cover"
                  borderRadius="10px"
                />
              </Box>
              <VStack alignSelf="flex-start">
                <Heading
                  width="100%"
                  color="#A5CBFF"
                  display="flex"
                  justifyContent="flex-start"
                  fontSize={{ base: '2xl', md: '4xl' }}
                  fontWeight={600}
                >
                  {currentSermon
                    ? isOnline
                      ? '[LIVE NOW] ' + currentSermon.title
                      : '' + currentSermon.sermonSeries[0].name
                    : ''}
                </Heading>
                <Text
                  alignSelf="flex-start"
                  marginTop="0px"
                  color="white"
                  fontSize={{ base: '14px', md: '16px' }}
                >
                  {currentDate}
                </Text>
              </VStack>

              <Button
                alignSelf="flex-start"
                padding="15px 20px"
                gap="10px"
                border="2px solid #A5CBFF"
                borderRadius="7px"
                background="transparent"
                color="#A5CBFF"
                marginTop="7%"
                as={ReactLink}
                to={{ pathname: '/sermons' }}
              >
                {isOnline
                  ? 'Watch HMCC LIVE'
                  : 'See All Past Sermons'}
              </Button>
            </VStack>
          </Box>
        </Box>
      </Flex>
    </>
  );
});

export default HelloSermonSection;
