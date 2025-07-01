import React from 'react';
import {
  Box,
  Flex,
  Text,
  Heading,
  Image,
  Link,
  VStack,
} from '@chakra-ui/react';

// Add this before the OurStaff component
const ministryDirectors = [
  {
    name: 'JOANNA JING',
    img: '/images/about/staff-joanna.jpg',
    alt: 'Joanna Jing',
    ministries: ['Corporate Operations & Events', 'City Ministry'],
  },
  {
    name: 'PETER YOUNG',
    img: '/images/about/staff-peter.jpg',
    alt: 'Peter Young',
    ministries: ['Youth & Families Ministry', 'Worship Ministry'],
  },
];

const OurStaff = () => (
  <Box maxW={{ base: '100%', md: '820px' }} mx="auto" p={{ base: 3, md: 6 }}>
    {/* Title */}
    <Box
      display="inline-block"
      bg="white"
      px={4}
      py={1}
      borderRadius="full"
      mb="12px"
    >
      <Text
        color="black"
        fontSize="1rem"
        fontWeight="bold"
        fontFamily="Manrope"
        letterSpacing="2px"
      >
        ABOUT US
      </Text>
    </Box>
    <Text
      fontFamily="DM Serif Display"
      fontStyle="italic"
      fontWeight="bold"
      fontSize="2.25rem"
      mb="42px"
      textAlign={{ base: 'center', md: 'left' }}
    >
      Our Staff
    </Text>

    {/* Pastoral Staff */}
    <Box as="section" mt={8}>
      <Text
        letterSpacing="4px"
        fontWeight="bold"
        fontSize="1.25rem"
        fontFamily="Manrope"
        mb={4}
      >
        PASTORAL STAFF
      </Text>
      <Flex
        gap={{ base: 4, md: 6 }}
        direction={{ base: 'column', md: 'row' }}
        alignItems={{ base: 'stretch', md: 'flex-end' }}
      >
        <Image
          src={process.env.PUBLIC_URL + 'images/about/kimfamily.jpeg'}
          alt="Pastoral Staff Group"
          w={{ base: '100%', md: '470px' }}
          maxW={{ base: '100%', md: '470px' }}
          h={{ base: 'auto', md: 'auto' }}
          objectFit="cover"
          borderRadius="lg"
        />
        <Box mt={{ base: 2, md: 0 }}>
          <Text
            fontWeight="bold"
            fontSize={{ base: '1rem', md: '1.25rem' }}
            letterSpacing={{base: "2px", md:'4px'}}
            fontFamily="Manrope"
          >
            REV. DR. SETH S. KIM
          </Text>
          <Text
            fontFamily="Manrope"
            fontSize={{ base: '0.875rem', md: '1.125rem' }}
          >
            Lead Pastor (Hong Kong)
            <br />
            <Link href="mailto:seth.kim@hmcc.net" color="black">
              seth.kim@hmcc.net
            </Link>
            <br />
            Global Leadership Team Member
          </Text>
        </Box>
      </Flex>
      <Box
        bg="#DFE7FF"
        borderRadius="12px"
        fontSize={{ base: '0.875rem', md: '1.125rem' }}
        fontFamily="Manrope"
      >
        Seth Kim has been educated and awarded degrees from the University of
        Illinois, Trinity International University, and Gordon-Conwell
        Theological Seminary.
        <br />
        <br />
        Seth is a pastor, speaker, leadership educator, church planter, and
        spiritual trainer. He and his wife started HMCC back in 1996 in the U.S.
        Then in 2015, he and his family moved out to Hong Kong to launch HMCC of
        Hong Kong and since then has been involved around the world working with
        different churches and organizations to train and equip people to live
        life with purpose and hope. He is currently serving with different
        organizations and movements such as Arise Asia, CPX Asia (Church
        Planting & Multiplication), Movement Day, and NXT Move Global.
        <br />
        <br />
        He is passionate about developing people and seeing their lives
        transformed so that they can then transform the world.
      </Box>
    </Box>

    {/* Ministry Directors */}
    <Box as="section" mt={12}>
      <Text
        letterSpacing="4px"
        fontWeight="bold"
        fontSize={{ base: '1rem', md: '1.25rem' }}
        fontFamily="Manrope"
        mb="19px"
      >
        MINISTRY DIRECTORS
      </Text>
      <Flex direction={{ base: 'column', md: 'row' }}>
        {ministryDirectors.map((director) => (
          <VStack
            key={director.name}
            borderRadius="lg"
            flex="1"
            spacing={1}
            alignItems={{ base: 'center', md: 'flex-start' }}
            textAlign={{ base: 'center', md: 'left' }}
            mb="8"
          >
            <Image
              src={director.img}
              alt={director.alt}
              w={{ base: '100%', md: '240px' }}
              h={{ base: 'auto', md: '240px' }}
              maxW="240px"
              objectFit="cover"
              borderRadius="10px"
              mb="4"
            />
            <Text
              fontFamily="Manrope"
              fontWeight="bold"
              fontSize={{ base: '1rem', md: '1.25rem' }}
              letterSpacing="4px"
              textAlign={{ base: 'center', md: 'left' }}
            >
              {director.name}
            </Text>
            <Text
              fontFamily="Manrope"
              fontSize={{ base: '0.875rem', md: '1.125rem' }}
              color="black"
              textAlign={{ base: 'center', md: 'left' }}
            >
              {director.ministries.map((ministry, idx) => (
                <React.Fragment key={ministry}>
                  {ministry}
                  {idx !== director.ministries.length - 1 && <br />}
                </React.Fragment>
              ))}
            </Text>
          </VStack>
        ))}
      </Flex>
    </Box>
  </Box>
);

export default OurStaff;
