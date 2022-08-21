import { Box, Heading, Link, SimpleGrid, Text } from '@chakra-ui/react';

const OurMinistries = (props) => {
  return (
    <Box id="ministries">
      <Heading
        as="h2"
        fontSize={['2.25em', '3m', '4em']}
        fontWeight={800}
        textAlign="center"
        mb={[0, 2]}
      >
        OUR MINISTRIES
      </Heading>
      <Text fontSize={['0.75em', '1.5em']} textAlign="center" mb={6}>
        At Harvest Mission Community Church, we are actively reaching out to
        people from all walks of life, specifically college students, working
        adults, and families.
      </Text>
      <SimpleGrid columns={[1, 3]} spacing={4}>
        <Box
          h={[141, 340]}
          p={2}
          borderRadius="20"
          bgImage={`linear-gradient(180deg, rgba(118, 228, 247, 0.7) 0%, rgba(44, 82, 130, 0.7) 100%), url('${process.env.PUBLIC_URL}/images/connect/undergrad.png')`}
          bgPosition="center"
          bgSize="cover"
          shadow="lg"
          color="white"
          textAlign="center"
        >
          <Heading
            as="h4"
            mt={[3, 12]}
            fontSize={['1.5em', '1.5em', '2em']}
            fontWeight={700}
          >
            UNDERGRADS
          </Heading>
          <Text fontWeight={400} fontSize={['xs', 'sm', 'md']} mt={[2, 6, 8]}>
            Reaching the college students in the university campuses of Hong
            Kong because we believe that college is a pivotal time for people to
            discover their God-given destiny.
          </Text>
        </Box>
        <Box
          h={[141, 340]}
          p={[3]}
          borderRadius="20"
          bgImage={`linear-gradient(180deg, rgba(198, 246, 213, 0.7) 0%, rgba(11, 128, 73, 0.7) 100%), url('${process.env.PUBLIC_URL}/images/connect/city.jpg')`}
          bgPosition="center"
          bgSize="cover"
          shadow="lg"
          color="white"
          textAlign="center"
        >
          <Heading
            as="h4"
            p={2}
            mt={[0, 2, 10]}
            fontSize={['1.5em', '1.5em', '2em']}
            fontWeight={700}
          >
            SINGLE WORKING ADULTS
          </Heading>
          <Text mt={[0, 2]} fontWeight={400} fontSize={['xs', 'sm', 'md']}>
            Creating an avenue for single working adults to fellowship and learn
            how to best exercise their God-given influence in their respective
            schools and workplaces.
          </Text>
        </Box>
        <Box
          h={[141, 340]}
          p={3}
          borderWidth="1px"
          borderRadius="20"
          bgImage={`linear-gradient(180deg, rgba(252, 129, 129, 0.7) 0%, rgba(151, 38, 109, 0.7) 100%), url('${process.env.PUBLIC_URL}/images/connect/married.jpg')`}
          bgPosition="center"
          bgSize="cover"
          shadow="lg"
          color="white"
          textAlign="center"
        >
          <Heading
            as="h4"
            fontSize={['1.5em', '1.5em', '2em']}
            fontWeight={700}
            mt={[3, 10, 14]}
          >
            MARRIED COUPLES AND FAMILIES
          </Heading>
          <Text mt={[1, 5]} fontWeight={400} fontSize={['xs', 'sm', 'md']}>
            Bringing together Godly families that will love on and impact the
            next generation of their families and city.
          </Text>
        </Box>
      </SimpleGrid>
      {/* <SimpleGrid ml={40} mr={40} mt={5} columns={[1, 2]}> */}
      <SimpleGrid
        columns={[1, 2]}
        ml={[0, 20, 40]}
        mr={[0, 20, 40]}
        mt={4}
        spacing={4}
      >
        <Box
          h={[141, 340]}
          p={[4, 6, 8, 10]}
          borderWidth="1px"
          borderRadius="20"
          bgImage={`linear-gradient(180deg, rgba(191, 201, 254, 0.7) 0%, rgba(115, 37, 176, 0.7) 100%), url('${process.env.PUBLIC_URL}/images/connect/youth.jpg')`}
          bgPosition="center"
          bgSize="cover"
          shadow="lg"
          color="white"
          textAlign="center"
        >
          <Heading
            as="h4"
            fontSize={['1.5em', '1.5em', '2em']}
            fontWeight={700}
            mt={[0, 6, 8, 10]}
          >
            YOUTH
          </Heading>
          <Text mt={[4, 6]} fontWeight={400} fontSize={['xs', 'sm', 'md']}>
            Reaching and training the youth of this generation to reach the
            world by starting from the center, which is our relationship with
            Jesus Christ.
          </Text>
        </Box>
        <Box
          h={[141, 340]}
          p={[0, 2, 4, 8]}
          borderWidth="1px"
          borderRadius="20"
          bgImage={`linear-gradient(180deg, rgba(233, 223, 132, 0.7) 0%, rgba(170, 102, 0, 0.7) 100%), url('${process.env.PUBLIC_URL}/images/connect/kid.jpg')`}
          bgPosition="center"
          bgSize="cover"
          shadow="lg"
          color="white"
          textAlign="center"
        >
          <Heading
            as="h4"
            mt={[6, 12]}
            fontSize={['1.5em', '1.5em', '2em']}
            fontWeight={700}
          >
            CHILDREN
          </Heading>
          <Text fontWeight={400} fontSize={['xs', 'sm', 'md']} mt={[4, 6]}>
            Building Blocks is HMCC’s Children Ministry, learn more about it{' '}
            <Text as="u">
              <Link href="https://hongkong.sub.hmcc.net/building-blocks/">
                here ➔
              </Link>
            </Text>
          </Text>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default OurMinistries;
