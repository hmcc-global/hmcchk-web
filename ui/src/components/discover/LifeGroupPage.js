import {
  AspectRatio,
  Box,
  Container,
  Heading,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  VStack,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import LifeGroupCard from './LifeGroupCard';
import LifeGroupSignupButton from './LifeGroupSignupButton';
import lifeGroupList from './lifegroups.json';
import { MdPeople } from 'react-icons/md';
import Faq from './LifeGroupFaq';

const LifeGroupPage = () => {
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

  return (
    <Box bgColor="#F6FAFF">
      <Container maxW="container.xl" py={{ base: '2rem', lg: '5rem' }}>
        <Box
          id="lifegroup"
          display="flex"
          flexDir={'column'}
          alignItems={'center'}
          gap={{ base: '1.75rem', lg: '4rem' }}
        >
          <VStack
            maxWidth={{ base: '95%', lg: '50%' }}
            spacing={{ base: '1rem', lg: '1.5rem' }}
          >
            <Heading
              as="h1"
              fontSize={{ base: '2.25rem', lg: '3.75rem' }}
              fontWeight={400}
              textAlign="center"
              fontFamily="DMSerifDisplay_Italic"
              letterSpacing={'-0.1rem'}
            >
              Join a LIFE Group
            </Heading>
            <Image
              src={`${process.env.PUBLIC_URL}/images/connect/life-design-mobile.png`}
              display={{ base: 'block', lg: 'none' }}
              maxW={{ sm: '80%', md: '60%' }}
            />
            <Text
              fontSize={{ base: '0.875rem', lg: '1.125rem' }}
              textAlign={'center'}
              fontFamily={'Manrope'}
            >
              At HMCC, we believe in the power of community and the fullness of
              life that it offers -- which is why we believe in LIFE Groups.
            </Text>
          </VStack>

          <Box
            display="flex"
            flexDirection={isLargerThan768 ? 'row' : 'column-reverse'}
            alignItems={isLargerThan768 ? 'flex-end' : 'center'}
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
                  boxSize={{ base: '1.875rem', lg: '2.5rem' }}
                  color={'#D46764'}
                />
                <Heading
                  as="h2"
                  fontSize={{ base: '2rem', lg: '2.625rem' }}
                  fontWeight={400}
                  textAlign="center"
                  fontFamily="DMSerifDisplay_Italic"
                  letterSpacing={'-0.1rem'}
                >
                  Biblical Community
                </Heading>
              </HStack>
              <Text
                fontSize={{ base: '0.875rem', lg: '1.125rem' }}
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
              <LifeGroupSignupButton />
            </VStack>
            <VStack flex={1} gap={'2rem'} w="100%">
              {/* <LifeGroupSignupButton /> */}
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
          <Box flex={1}>
            <Image
              src={`${process.env.PUBLIC_URL}/images/connect/LG-map.png`}
              mr={[0, 6]}
            />
          </Box>
          <Box display="flex" flexDir="column" width={'100%'} gap={'2rem'}>
            <Heading
              textAlign="center"
              fontSize={{ base: '0.75rem', lg: '1.25rem' }}
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
          <Faq />
        </Box>
      </Container>
    </Box>
  );
};

export default LifeGroupPage;
