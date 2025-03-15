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
            maxWidth={{ base: '95%', lg: '50%' }}
            spacing={{ base: '1rem', lg: '1.5rem' }}
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
              display={{ base: 'block', lg: 'none' }}
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
            flexDirection={{ base: 'column-reverse', lg: 'row' }}
            alignItems={{ base: 'center', lg: 'flex-start' }}
            gap={'3rem'}
          >
            <VStack
              textAlign={['center', 'left']}
              spacing={'1.25rem'}
              alignItems={{ base: 'center', lg: 'flex-start' }}
              maxWidth={{ base: '100%', lg: '45%' }}
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
                href="https://bit.ly/LGSignup2024"
                borderRadius={'0.9375rem'}
                bgColor="#D46764"
                py={'1.75rem'}
                px={'1.75rem'}
                fontSize={{ base: '0.875rem', lg: '1rem' }}
                fontWeight="700"
                letterSpacing={'0.25rem'}
                color={'#F6FAFF'}
                fontFamily={'Manrope'}
                display={{ base: 'none', lg: 'flex' }}
                _hover={{ textDecoration: 'none' }}
                alignItems="center"
                justifyContent="center"
              >
                SIGN UP FOR LIFE GROUP
              </Button>
            </VStack>
            <VStack flex={1} gap={'2rem'} w="100%">
              <Button
                as={Link}
                href="https://bit.ly/LGSignup2024"
                borderRadius={'0.9375rem'}
                bgColor="#D46764"
                py={'1.75rem'}
                px={'1.75rem'}
                fontSize={{ base: '0.875rem', lg: '1rem' }}
                fontWeight="700"
                letterSpacing={'0.25rem'}
                color={'#F6FAFF'}
                fontFamily={'Manrope'}
                display={{ base: 'flex', lg: 'none' }}
                _hover={{ textDecoration: 'none' }}
                alignItems="center"
                justifyContent="center"
              >
                SIGN UP FOR LIFE GROUP
              </Button>
              <Image
                src={`${process.env.PUBLIC_URL}/images/connect/life-design.png`}
                display={{ base: 'none', lg: 'block' }}
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
          <Box flex={1} position="relative">
            {/* Main Image */}
            <Image
              src={`${process.env.PUBLIC_URL}/images/connect/LG-map.png`}
              position="relative" // Ensure the main image is in the normal flow
            />

            {/* TODO-YY: Change to flex after inserting correct images */}
            <Box display={{ base: 'none', xl: 'none' }}>
              {/* Left Side Images */}
              <Image
                src={`${process.env.PUBLIC_URL}/images/connect/university_students.jpg`}
                position="absolute"
                top="5%" // Adjust manually
                left="-15%" // Adjust manually
                height="125px" // Adjust size as needed
                style={{ transform: 'translate(-50%, -50%)' }} // Center the image
              />
              <Image
                src={`${process.env.PUBLIC_URL}/images/connect/university_students.jpg`}
                position="absolute"
                top="40%" // Adjust manually
                left="-30%" // Adjust manually
                height="125px" // Adjust size as needed
                style={{ transform: 'translate(-50%, -50%)' }} // Center the image
              />
              <Image
                src={`${process.env.PUBLIC_URL}/images/connect/university_students.jpg`}
                position="absolute"
                top="75%" // Adjust manually
                left="-10%" // Adjust manually
                height="125px" // Adjust size as needed
                style={{ transform: 'translate(-50%, -50%)' }} // Center the image
              />

              {/* Right Side Images */}
              <Image
                src={`${process.env.PUBLIC_URL}/images/connect/university_students.jpg`}
                position="absolute"
                top="5%" // Adjust manually
                right="-10%" // Adjust manually
                height="125px" // Adjust size as needed
                style={{ transform: 'translate(50%, -50%)' }} // Center the image
              />
              <Image
                src={`${process.env.PUBLIC_URL}/images/connect/university_students.jpg`}
                position="absolute"
                top="40%" // Adjust manually
                right="-30%" // Adjust manually
                height="125px" // Adjust size as needed
                style={{ transform: 'translate(50%, -50%)' }} // Center the image
              />
              <Image
                src={`${process.env.PUBLIC_URL}/images/connect/university_students.jpg`}
                position="absolute"
                top="80%" // Adjust manually
                right="-15%" // Adjust manually
                height="125px" // Adjust size as needed
                style={{ transform: 'translate(50%, -50%)' }} // Center the image
              />
            </Box>
          </Box>
          <Box display="flex" flexDir="column" width={'100%'} gap={'2rem'}>
            <Heading
              textAlign="center"
              fontSize={{ base: '0.75rem', md: '1rem', lg: '1.25rem' }}
              fontFamily="Manrope"
              fontWeight={700}
              letterSpacing={{ lg: '0.25rem' }}
              textTransform={{ lg: 'uppercase' }}
            >
              Check out the different LIFE Groups in HMCC!
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
