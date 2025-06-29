import React from "react";
import { Box, Flex, Text, Heading, Image, Link, VStack } from "@chakra-ui/react";

// Add this before the OurStaff component
const ministryDirectors = [
  {
    name: "JOANNA JING",
    img: "/images/about/staff-joanna.jpg",
    alt: "Joanna Jing",
    ministries: ["Corporate Operations & Events", "City Ministry"],
  },
  {
    name: "PETER YOUNG",
    img: "/images/about/staff-peter.jpg",
    alt: "Peter Young",
    ministries: ["Youth & Families Ministry", "Worship Ministry"],
  }
];

const OurStaff = () => (
  <Box maxW="800px" mx="auto" p={6}>
    {/* Title */}
    <Text mb={2} color="gray.500" fontSize="xs" letterSpacing="widest">
      ABOUT US
    </Text>
    <Heading as="h1" fontFamily="serif" fontStyle="italic" fontWeight="semibold" fontSize="2.5rem" mb={8}>
      Our Staff
    </Heading>

    {/* Pastoral Staff */}
    <Box as="section" mt={8}>
      <Text letterSpacing="widest" fontWeight="bold" fontSize="sm" mb={4}>
        PASTORAL STAFF
      </Text>
      <Flex gap={6} direction={["column", "row"]} alignItems="flex-end">
        <Image
          src={process.env.PUBLIC_URL + 'images/about/kimfamily.jpeg'}
          alt="Pastoral Staff Group"
          w="470px"
          objectFit="cover"
          borderRadius="lg"
        />
        <Box>
          <Text fontWeight="bold" fontSize="lg" letterSpacing="wide">
            REV. DR. SETH S. KIM
          </Text>
          <Text fontSize="md" mt={2} mb={2}>
            Lead Pastor (Hong Kong)
            <br />
            <Link href="mailto:seth.kim@hmcc.net" color="gray.600">
              seth.kim@hmcc.net
            </Link>
            <br />
            Global Leadership Team Member
          </Text>
        </Box>
      </Flex>
      <Box bg="#DFE7FF" borderRadius="lg" p={5} mt={5} fontSize="md">
        Seth Kim has been educated and awarded degrees from the University of Illinois, Trinity International University, and Gordon-Conwell Theological Seminary.
        <br /><br />
        Seth is a pastor, speaker, leadership educator, church planter, and spiritual trainer. He and his wife started HMCC back in 1996 in the U.S. Then in 2015, he and his family moved out to Hong Kong to launch HMCC of Hong Kong and since then has been involved around the world working with different churches and organizations to train and equip people to live life with purpose and hope. He is currently serving with different organizations and movements such as Arise Asia, CPX Asia (Church Planting & Multiplication), Movement Day, and NXT Move Global.
        <br /><br />
        He is passionate about developing people and seeing their lives transformed so that they can then transform the world.
      </Box>
    </Box>

    {/* Ministry Directors */}
    <Box as="section" mt={12}>
      <Text letterSpacing="widest" fontWeight="bold" fontSize="sm" mb={4}>
        MINISTRY DIRECTORS
      </Text>
      <Flex gap={8} direction={["column", "row"]}>
        {ministryDirectors.map((director) => (
          <VStack
            key={director.name}
            borderRadius="lg"
            p={4}
            flex="1"
            spacing={3}
            textAlign="center"
          >
            <Image
              src={director.img}
              alt={director.alt}
              w="240px"
              objectFit="cover"
              borderRadius="md"
            />
            <Text fontWeight="bold" fontSize="lg" letterSpacing="wide">
              {director.name}
            </Text>
            <Text fontSize="sm" color="gray.600">
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
