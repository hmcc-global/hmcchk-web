import {
  HStack,
  VStack,
  Stack,
  Box,
  Text,
  SimpleGrid,
  Image,
  Button,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionImage = motion(Image);

const BBHeroSection = ({ scheduleRef, contactRef }) => {
  const offset = 60;
  const scrollToSchedule = () => {
    if (scheduleRef.current) {
      const topPosition =
        scheduleRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: topPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  const scrollToContact = () => {
    if (contactRef.current) {
      const topPosition =
        contactRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: topPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  const images = [
    `${process.env.PUBLIC_URL}/images/buildingblock/bb_img1.png`,
    `${process.env.PUBLIC_URL}/images/buildingblock/bb_img4.png`,
    `${process.env.PUBLIC_URL}/images/buildingblock/bb_img2.png`,
    `${process.env.PUBLIC_URL}/images/buildingblock/bb_img3.png`,
  ];

  return (
    <VStack
      w="100%"
      fontFamily="Manrope"
      gap={{ base: '1rem', md: '2rem', lg: '4rem' }}
    >
      <Stack flexDirection={{ base: 'column', md: 'row' }} w="100%" gap="4">
        <VStack
          w={{ base: '100%', md: '53%' }}
          justifyContent="center"
          alignItems={{ base: 'center', md: 'start' }}
          gap="5"
        >
          <Text
            textAlign={{ base: 'center', md: 'start' }}
            fontSize={{ base: '0.75rem', md: '1rem', lg: '1.25rem' }}
            fontWeight="700"
            whiteSpace="true"
          >
            Harvest Mission Community Church’s {''}
            <Box display={{ base: 'inline', md: 'none' }}>
              <br />
            </Box>
            Children’s Ministry
          </Text>
          <Text
            fontFamily="DMSerifDisplay_Italic"
            fontSize={{ base: '2.25rem', md: '3.4rem', lg: '5.625rem' }}
            textAlign={{ base: 'center', md: 'start' }}
            lineHeight="103%"
            fontWeight="400"
            textColor="#272727"
            letterSpacing={{ base: '-0.0625rem', lg: '-0.125rem' }}
          >
            Welcome to <br /> Building Blocks
          </Text>
          <Text
            w={{ base: '95%', lg: '75%' }}
            fontSize={{ base: '0.875rem', md: '0.9rem', lg: '1.125rem' }}
            textAlign={{ base: 'center', md: 'start' }}
          >
            Building Blocks serves kids from age 3 to grade 5. We partner with
            parents to help children in loving and following Jesus. Our Sunday
            mornings give the opportunity for kids to participate in worship,
            Bible lessons, community building, and lots of fun! We also have
            various activities throughout the year for community building and to
            serve the needs in our city. We hope to see you at Building Blocks!
          </Text>
          <HStack
            display={{ base: 'none', md: 'flex' }}
            justifyContent="center"
            gap="3"
          >
            <Button
              borderRadius="5rem"
              justifyContent="space-between"
              alignItems="center"
              bgColor="transparent"
              border="0.7px solid #D46764"
              py={{ md: '3', lg: '5' }}
              px={{ md: '5', lg: '8' }}
              h="-moz-min-content"
              color="#D46764"
              _hover={{
                bg: '#D46764',
                color: 'white',
                borderColor: '#D46764',
                textDecoration: 'none',
              }}
              onClick={scrollToSchedule}
            >
              <Text fontSize={{ md: '1rem', lg: '1.25rem' }} fontWeight="700">
                Schedule Information
              </Text>
            </Button>
            <Button
              borderRadius="5rem"
              justifyContent="space-between"
              alignItems="center"
              bgColor="transparent"
              border="0.7px solid #D46764"
              padding={{ md: '3', lg: '5' }}
              h="-moz-min-content"
              color="#D46764"
              _hover={{
                bg: '#D46764',
                color: 'white',
                borderColor: '#D46764',
                textDecoration: 'none',
              }}
              onClick={scrollToContact}
            >
              <Text fontSize={{ md: '1rem', lg: '1.25rem' }} fontWeight="700">
                Contact Us
              </Text>
            </Button>
          </HStack>
        </VStack>
        <Box w={{ base: '100%', md: '45%' }}>
          <SimpleGrid columns={2}>
            {images.map((src, index) => {
              let delay;
              if (index === 2) {
                delay = 0.5;
              } else if (index === 3) {
                delay = 1;
              } else if (index === 0) {
                delay = 1.5;
              } else {
                delay = 2;
              }
              return (
                <MotionImage
                  key={index}
                  boxSize={'100%'}
                  src={src}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay }}
                />
              );
            })}
          </SimpleGrid>
        </Box>
        <VStack
          display={{ base: 'flex', md: 'none' }}
          gap="2"
          alignContent="center"
        >
          <Button
            borderRadius="5rem"
            alignItems="center"
            bgColor="#D46764"
            border="0.7px solid #FFF"
            padding={{ md: '3', lg: '5' }}
            w="100%"
            onClick={scrollToSchedule}
          >
            <Text
              color="#FFF"
              fontSize={{ md: '1rem', lg: '1.25rem' }}
              fontWeight="700"
              textAlign="center"
            >
              Schedule Information
            </Text>
          </Button>
          <Button
            borderRadius="5rem"
            alignItems="center"
            bgColor="#D46764"
            border="0.7px solid #FFF"
            padding={{ md: '3', lg: '5' }}
            w="100%"
            onClick={scrollToContact}
          >
            <Text
              color="#FFF"
              fontSize={{ md: '1rem', lg: '1.25rem' }}
              fontWeight="700"
            >
              Contact Us
            </Text>
          </Button>
        </VStack>
      </Stack>

      <Box
        bgImage={{
          base: `url(${
            process.env.PUBLIC_URL +
            '/images/buildingblock/bb_mission_bg_base.png'
          })`,
          md: `url(${
            process.env.PUBLIC_URL +
            '/images/buildingblock/bb_mission_bg_top.png'
          })`,
        }}
        bgRepeat="no-repeat"
        bgSize="cover"
        bgPos={{ base: 'center', md: 'top' }}
        paddingY={{ base: '4.5rem', md: '3rem', lg: '4rem' }}
      >
        <Box
          borderRadius="1.875rem"
          bgColor="#EBBB41"
          paddingX="5"
          paddingY="2"
          width="-webkit-fit-content"
          marginX="auto"
          marginBottom={{ base: '1rem', md: '3rem' }}
        >
          <Text
            color="#F6FAFF"
            lineHeight="103%"
            letterSpacing="0.188rem"
            fontSize={{ md: '1rem', lg: '1.25rem' }}
            fontWeight="700"
          >
            MISSION
          </Text>
        </Box>
        <Text
          fontFamily="DMSerifDisplay_Regular"
          fontSize={{ base: '1.25rem', md: '2.2rem', lg: '2.625rem' }}
          letterSpacing={{ md: '-0.125rem' }}
          textAlign="center"
          paddingBottom={{ base: '7rem', md: '5rem' }}
          w={{ base: '85%', md: '80%', lg: '75%' }}
          marginX="auto"
        >
          To lay a{' '}
          <span
            style={{
              color: '#EBAC09',
              textDecoration: 'underline',
              fontFamily: 'DMSerifDisplay_Italic',
            }}
          >
            Biblical foundation
          </span>{' '}
          that will lead children to Christ and prepare them to{' '}
          <span
            style={{
              color: '#EBAC09',
              textDecoration: 'underline',
              fontFamily: 'DMSerifDisplay_Italic',
            }}
          >
            share their faith
          </span>
        </Text>
      </Box>
      <Box
        bgImage={{
          base: `url(${
            process.env.PUBLIC_URL +
            '/images/buildingblock/bb_mission_bg_bottom_base.png'
          })`,
          md: `url(${
            process.env.PUBLIC_URL +
            '/images/buildingblock/bb_mission_bg_bottom.png'
          })`,
        }}
        bgRepeat="no-repeat"
        bgSize="cover"
        bgPos="bottom"
        paddingBottom={{ base: '7rem', md: '7rem', lg: '10rem' }}
        w="100%"
      >
        <Image
          w="80%"
          src={`${process.env.PUBLIC_URL}/images/buildingblock/bb_mission.png`}
          marginX="auto"
          display={{ base: 'none', md: 'flex' }}
        />
        <Image
          w="100%"
          src={`${process.env.PUBLIC_URL}/images/buildingblock/bb_mission_base.png`}
          marginX="auto"
          display={{ base: 'flex', md: 'none' }}
          px={{ base: '1.5rem', md: '3rem' }}
        />
      </Box>
    </VStack>
  );
};

export default BBHeroSection;
