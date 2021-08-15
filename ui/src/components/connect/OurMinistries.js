import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Link,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import "../../styles/_fliptiles.scss";

const OurMinistries = (props) => {
  return (
    <Box>
      <Heading
        as="h2"
        fontSize={["2.25em", "4em"]}
        fontWeight={800}
        textAlign="center"
        mb={[0, 2]}
      >
        OUR MINISTRIES
      </Heading>
      <Text fontSize={["0.75em", "1.5em"]} textAlign="center" mb={6}>
        At Harvest Mission Community Church, we are actively reaching out to
        people from all walks of life, specifically college students, working
        adults, and families.
      </Text>
      <SimpleGrid columns={[2, 4]} spacing={4}>
        <Center
          h={[180, 300]}
          p={8}
          borderWidth="1px"
          borderRadius="20"
          bgImage={` linear-gradient(180deg, rgba(118, 228, 247, 0.7) 0%, rgba(44, 82, 130, 0.7) 100%), url('${process.env.PUBLIC_URL}/images/2019_Mar_AllNightPrayer_Worshiptogether_Shouldertoshoulder_Closeup.png')`}
          bgPosition="center"
          bgSize="cover"
          shadow="lg"
          textAlign="center"
          color="white"
        >
          <Heading as="h4" fontSize={["1.5em", "2em"]} fontWeight={700}>
            CAMPUS
          </Heading>
        </Center>
        <div className="flip-container">
          <Center
            h={[180, 300]}
            borderWidth="1px"
            borderRadius="20"
            bgImage={`linear-gradient(180deg, rgba(198, 246, 213, 0.7) 0%, rgba(39, 103, 73, 0.7) 100%), url('${process.env.PUBLIC_URL}/images/2020_June_FOCUSGetaway_Game_Fun_Group_Community_Smile_Happy_Closeup.jpg')`}
            bgPosition="center"
            bgSize="cover"
            shadow="lg"
            textAlign="center"
            color="white"
            className="flipper"
          >
            <Heading
              as="h4"
              fontSize={["1.5em", "2em"]}
              fontWeight={700}
              className="front"
            >
              SINGLE ADULTS
            </Heading>
            <div className="back">
              We want to reach college students in the university campuses
              around Hong Kong because we believe that college is a pivotal time
              for people to discover their God-given destiny.
            </div>
          </Center>
        </div>
        <Center
          h={[180, 300]}
          p={8}
          borderWidth="1px"
          borderRadius="20"
          bgImage={`linear-gradient(180deg, rgba(252, 129, 129, 0.7) 0%, rgba(151, 38, 109, 0.7) 100%), url('${process.env.PUBLIC_URL}/images/2016_July_Mens_Womens_Getaway_Covenant_Group.jpg')`}
          bgPosition="center"
          bgSize="cover"
          shadow="lg"
          textAlign="center"
          color="white"
        >
          <Heading as="h4" fontSize={["1.5em", "2em"]} fontWeight={700}>
            MARRIED COUPLES
          </Heading>
        </Center>
        <Center
          h={[180, 300]}
          p={8}
          borderWidth="1px"
          borderRadius="20"
          bgImage={`linear-gradient(180deg, rgba(254, 252, 191, 0.7) 0%, rgba(246, 173, 85, 0.7) 100%), url('${process.env.PUBLIC_URL}/images/2017_may_mothersday_buildingblockspresentation_sing_buildingblocks_side_34776427395_o.jpg')`}
          bgPosition="center"
          bgSize="cover"
          shadow="lg"
          textAlign="center"
          color="white"
        >
          <Heading as="h4" fontSize={["1.5em", "2em"]} fontWeight={700}>
            CHILDREN
          </Heading>
        </Center>
      </SimpleGrid>
    </Box>
  );
};

export default OurMinistries;
