import {
  AspectRatio,
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  VStack,
  Text,
  Link,
} from '@chakra-ui/react';
import LifeGroupCard from './LifeGroupCard';
import lifeGroupList from './lifegroups.json';
import { MdPeople } from 'react-icons/md';
import LifeGroupFaq from './LifeGroupFaq';
import BackButton from './DiscoverBackButton';

const LifeGroupPage = () => {
  const imageHeight = {
    base: '60px',
    sm: '75px',
    md: '100px',
    lg: '125px',
  };

  const gap = {
    base: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.25rem',
  };

  const margin = '1rem';

  return (
    <Box bgColor="#F6FAFF">
      <BackButton />
      <Container maxW="container.xl" py={{ base: '4rem', lg: '5rem' }}>
        <Box
          id="lifegroup"
          display="flex"
          flexDir={'column'}
          alignItems={'center'}
          gap={{ base: '1.75rem', md: '2.5rem', lg: '4rem' }}
        >
          <VStack
            maxWidth={{ base: '95%', xl: '50%' }}
            spacing={{ base: '1rem', xl: '1.5rem' }}
          >
            <Text
              color="#0C0C20"
              fontSize={{ base: '2.25rem', md: '3rem', lg: '3.75rem' }}
              fontWeight={400}
              textAlign="center"
              fontFamily="DMSerifDisplay_Italic"
              letterSpacing={'-0.1rem'}
            >
              Join a LIFE Group
            </Text>
            <Image
              src={`${process.env.PUBLIC_URL}/images/connect/life-design-mobile.png`}
              display={{ base: 'block', xl: 'none' }}
              maxW={{ sm: '80%', md: '60%' }}
            />
            <Text
              fontSize={{ base: '0.875rem', md: '1rem', lg: '1.125rem' }}
              textAlign={'center'}
              fontFamily={'Manrope'}
            >
              At HMCC, we believe in the power of community and the fullness of
              life that it offers -- which is why we believe in LIFE Groups.
            </Text>
          </VStack>

          <Box
            display="flex"
            flexDirection={{ base: 'column-reverse', xl: 'row' }}
            alignItems={{ base: 'center', xl: 'flex-start' }}
            gap={'2.3rem'}
          >
            <VStack
              textAlign={['center', 'left']}
              spacing={'1.25rem'}
              alignItems={{ base: 'center', xl: 'flex-start' }}
              maxWidth={{ base: '100%', xl: '45%' }}
            >
              <HStack spacing={'1rem'}>
                <Icon
                  as={MdPeople}
                  boxSize={{ base: '1.875rem', md: '2.125rem', lg: '2.5rem' }}
                  color={'#D46764'}
                />
                <Heading
                  as="h2"
                  fontSize={{ base: '2rem', md: '2.25rem', lg: '2.625rem' }}
                  fontWeight={400}
                  textAlign="center"
                  fontFamily="DMSerifDisplay_Italic"
                  letterSpacing={'-0.1rem'}
                >
                  Biblical Community
                </Heading>
              </HStack>
              <Text
                fontSize={{ base: '0.875rem', md: '1rem', lg: '1.125rem' }}
                fontWeight={400}
                fontFamily="Manrope"
                textAlign={{ base: 'center', xl: 'left' }}
              >
                There is no better way to get a taste of who we are and what we
                believe in then to check out one of our LIFE Groups. This is an
                opportunity to experience the life-changing power of Biblical
                community with Love, Investment, Faith, and Enjoyment.
                <br />
                <br />
                LIFE Group is more than just a weekly Bible study group. It is
                about Loving one another, Investing in the community, growing in
                our Faith, and Enjoying life together as a family living out the
                Gospel. At HMCC, we believe in the power of community and the
                fullness of life that it offers -- which is why we believe in{' '}
              </Text>
              <Button
                as={Link}
                href="https://bit.ly/summerLG2025"
                borderRadius={'0.9375rem'}
                bgColor="#D46764"
                py={'1.75rem'}
                px={'1.75rem'}
                fontSize={{ base: '0.875rem', lg: '1rem' }}
                fontWeight="700"
                letterSpacing={'0.25rem'}
                color={'#F6FAFF'}
                fontFamily={'Manrope'}
                display="flex"
                _hover={{ textDecoration: 'none', backgroundColor: '#AA5250' }}
                alignItems="center"
                justifyContent="center"
              >
                SIGN UP FOR LIFE GROUP
              </Button>
            </VStack>
            <VStack flex={1} gap={'2rem'} w="100%">
              <Image
                src={`${process.env.PUBLIC_URL}/images/connect/life-design.png`}
                display={{ base: 'none', xl: 'block' }}
              />
              <AspectRatio ratio={16 / 9} borderRadius="20" w={'100%'}>
                <iframe
                  src="https://www.youtube.com/embed/tainVHwAWt0"
                  title="YouTube video player"
                  allowFullScreen
                />
              </AspectRatio>
            </VStack>
          </Box>
          <Box
            flex={1}
            position="relative"
            display={{ base: 'none', xl: 'flex' }}
          >
            {/* Main Image */}
            <Image
              src={`${process.env.PUBLIC_URL}/images/connect/LG-map.png`}
              position="relative" // Ensure the main image is in the normal flow
            />

            {/* Left Side Images */}
            <Image
              src={`${process.env.PUBLIC_URL}/images/connect/left-1.jpg`}
              position="absolute"
              top="50px"
              left="10px"
              width="125px"
              style={{ transform: 'translate(-50%, -50%)' }} // Center the image
            />
            <Image
              src={`${process.env.PUBLIC_URL}/images/connect/left-2.jpg`}
              position="absolute"
              top="75px"
              left="-150px"
              width="150px"
              style={{ transform: 'translate(-50%, -50%)' }} // Center the image
            />
            <Image
              src={`${process.env.PUBLIC_URL}/images/connect/left-3.jpg`}
              position="absolute"
              top="210px"
              left="-125px"
              width="250px"
              style={{ transform: 'translate(-50%, -50%)' }} // Center the image
            />
            <Image
              src={`${process.env.PUBLIC_URL}/images/connect/left-4.jpg`}
              position="absolute"
              top="345px"
              left="-100px"
              width="125px"
              style={{ transform: 'translate(-50%, -50%)' }} // Center the image
            />

            {/* Right Side Images */}
            <Image
              src={`${process.env.PUBLIC_URL}/images/connect/right-1.jpg`}
              position="absolute"
              top="50px"
              right="-125px"
              width="225px"
              style={{ transform: 'translate(50%, -50%)' }} // Center the image
            />
            <Image
              src={`${process.env.PUBLIC_URL}/images/connect/right-2.jpg`}
              position="absolute"
              top="200px"
              right="-75px"
              width="190px"
              style={{ transform: 'translate(50%, -50%)' }} // Center the image
            />
            <Image
              src={`${process.env.PUBLIC_URL}/images/connect/right-3.jpg`}
              position="absolute"
              top="225px"
              right="-240px"
              width="100px"
              style={{ transform: 'translate(50%, -50%)' }} // Center the image
            />
            <Image
              src={`${process.env.PUBLIC_URL}/images/connect/right-4.jpg`}
              position="absolute"
              top="325px"
              right="-100px"
              width="125px"
              style={{ transform: 'translate(50%, -50%)' }} // Center the image
            />
          </Box>
          <Box
            w="100%"
            display={{ base: 'flex', xl: 'none' }}
            flexDirection="column"
            alignItems="center"
          >
            {/* Top Row: Left Side Images */}
            <Box
              display="flex"
              flexDir="row"
              justifyContent="center"
              gap={gap}
              mb={margin}
              w="100%"
            >
              {['left-1', 'left-2', 'left-3', 'left-4'].map((image) => (
                <Image
                  key={image}
                  src={`${process.env.PUBLIC_URL}/images/connect/${image}.jpg`}
                  height={imageHeight}
                />
              ))}
            </Box>

            {/* Main Image */}
            <Image
              src={`${process.env.PUBLIC_URL}/images/connect/LG-map.png`}
              width="100%"
              maxWidth="600px"
            />

            {/* Bottom Row: Right Side Images */}
            <Box
              display="flex"
              flexDir="row"
              justifyContent="center"
              gap={gap}
              mt={margin}
              w="100%"
            >
              {['right-1', 'right-2', 'right-3', 'right-4'].map((image) => (
                <Image
                  key={image}
                  src={`${process.env.PUBLIC_URL}/images/connect/${image}.jpg`}
                  height={imageHeight}
                />
              ))}
            </Box>
          </Box>
          <Box display="flex" flexDir="column" width={'100%'} gap={'2rem'}>
            <Heading
              textAlign="center"
              fontSize={{ base: '1.2rem', md: '1rem', lg: '1.25rem' }}
              fontFamily="Manrope"
              fontWeight={700}
              letterSpacing={{ base: '0.125rem', lg: '0.25rem' }}
              textTransform={{ lg: 'uppercase' }}
              w="80%"
              mx="auto"
            >
              CHECK OUT THE DIFFERENT LIFE GROUPS IN HMCC!
            </Heading>
            <SimpleGrid columns={[2, 3]} spacing={3}>
              {lifeGroupList.length > 0 &&
                lifeGroupList.map((lifeGroupInfo, i) => (
                  <LifeGroupCard key={'lg' + i} lifeGroupInfo={lifeGroupInfo} />
                ))}
            </SimpleGrid>
          </Box>
          <LifeGroupFaq />
        </Box>
      </Container>
    </Box>
  );
};

export default LifeGroupPage;
