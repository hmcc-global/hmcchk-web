import {
  AspectRatio,
  Box,
  Center,
  Flex,
  Heading,
  Image,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import Slider from 'react-slick';
import TestimonyCard from './TestimonyCard';
import testimoniesList from './testimonies.json';
import LifeGroupCard from './LifeGroupCard';
import lifeGroupList from './lifegroups.json';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './_connect.scss';

const LifeGroups = (props) => {
  const sliderSettings = {
    adaptiveHeight: true,
    arrows: false,
    centerMode: true,
    dots: false,
    focusOnSelect: true,
    infinite: false,
    slidesPerRow: 1,
    speed: 500,
    swipeToSlide: true,
    variableWidth: true,
  };

  return (
    <Box id="#lifegroup">
      <Heading
        as="h2"
        fontSize={['2.25em', '3em', '4em']}
        fontWeight={800}
        textAlign="center"
        mb={[0, 4]}
      >
        <span style={{ color: '#FD7B7E' }}>L</span>
        <span style={{ color: '#43B77B' }}>I</span>
        <span style={{ color: '#7DABFC' }}>F</span>
        <span style={{ color: '#FEDD64' }}>E</span> GROUPS
      </Heading>
      <AspectRatio maxW="100%" ratio={16 / 9} mb={10}>
        <iframe
          src="https://www.youtube.com/embed/tainVHwAWt0"
          title="YouTube video player"
          allowFullScreen
        />
      </AspectRatio>
      <Flex
        flexDirection={props.isLargerThan768 ? 'row' : 'column-reverse'}
        mb={4}
      >
        <Box flex={1}>
          <Image
            src={`${process.env.PUBLIC_URL}/images/connect/LG-map.png`}
            mr={[0, 6]}
          />
        </Box>
        <Stack flex={1} textAlign={['center', 'left']} pb={[6, 0]}>
          <Text fontSize={['md', 'xl']} mb={4}>
            At HMCC, we believe in the power of community and the fullness of
            life that it offers -- which is why we believe in{' '}
            <span style={{ fontWeight: 'bold' }}>LIFE Groups.</span>
            <br />
            <br />
            LIFE Group is more than just a weekly Bible study group. It is about{' '}
            <span style={{ fontWeight: 'bold' }}>Loving</span> one another,{' '}
            <span style={{ fontWeight: 'bold' }}>Investing</span> in the
            community, growing in our{' '}
            <span style={{ fontWeight: 'bold' }}>Faith</span>, and{' '}
            <span style={{ fontWeight: 'bold' }}>Enjoying</span> life together
            as a family living out the Gospel.
          </Text>
          <Center>
            <LinkBox
              style={{ backgroundOrigin: 'border-box' }}
              as="button"
              transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
              boxShadow="2px 1000px 1px #fff inset"
              boxSizing="border-box"
              border="solid 3px transparent"
              borderRadius={10}
              backgroundImage="linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), linear-gradient(to right, #fd7b7e, #3182ce)"
              backgroundClip="content-box, border-box"
              py={2}
              w={['95%', 350]}
              fontSize={['0.75em', '1.125em']}
              _hover={{ boxShadow: 'none', color: '#fff' }}
              target="_blank"
            >
              <LinkOverlay
                href="https://docs.google.com/forms/u/1/d/e/1FAIpQLSdQWmqAiN5E7HkdoqezR0sy9aW7FulGUkO2mqwYreGPtRgnTA/viewform"
                target="_blank"
              >
                SIGN UP FOR LIFE GROUPS NOW!
              </LinkOverlay>
            </LinkBox>
          </Center>
        </Stack>
      </Flex>
      <Box mb={10}>
        <Heading
          fontSize={['md', 'xl']}
          fontWeight={700}
          textAlign="center"
          mb={[2, 4]}
        >
          Check out the different LIFE Groups in HMCC!
        </Heading>
        <SimpleGrid columns={[2, 4]} spacing={3}>
          {lifeGroupList.length > 0 &&
            lifeGroupList.map((lifeGroupInfo, i) => (
              <LifeGroupCard key={'lg' + i} lifeGroupInfo={lifeGroupInfo} />
            ))}
        </SimpleGrid>
      </Box>
      <Heading
        as="h2"
        fontSize={['2xl', '3xl', '5xl']}
        fontWeight={800}
        textAlign="center"
        px={[4, 16]}
        mb={4}
      >
        What our members have to say about LIFE Groups
      </Heading>
      <Slider {...sliderSettings} className="full-width">
        {testimoniesList.length > 0 &&
          testimoniesList.map((testimonyInfo, i) => (
            <TestimonyCard
              key={'testimony' + i}
              testimonyInfo={testimonyInfo}
            />
          ))}
      </Slider>
    </Box>
  );
};

export default LifeGroups;
