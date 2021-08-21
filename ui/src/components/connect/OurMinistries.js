import { Box, Center, Heading, Link, SimpleGrid, Text } from "@chakra-ui/react";
import "../../styles/_fliptiles.scss";

const OurMinistries = (props) => {
  return (
    <Box id="ministries">
      <Heading
        as="h2"
        fontSize={["2.25em", "3m", "4em"]}
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
        <Box className="flip-container">
          <Center
            h={[180, 250]}
            p={[4, 12]}
            borderWidth="1px"
            borderRadius="20"
            bgImage={` linear-gradient(180deg, rgba(118, 228, 247, 0.7) 0%, rgba(44, 82, 130, 0.7) 100%), url('${process.env.PUBLIC_URL}/images/connect/campus-ministry.jpg')`}
            bgPosition="center"
            bgSize="cover"
            shadow="lg"
            color="white"
            className="flipper"
          >
            <Heading
              as="h4"
              fontSize={["1.5em", "1.5em", "2em"]}
              fontWeight={700}
              textAlign="center"
              className="front"
            >
              CAMPUS
            </Heading>
            <Box className="back" fontWeight={600} fontSize={["xs", "md"]}>
              Reaching the college students in the university campuses of Hong
              Kong because we believe that college is a pivotal time for people
              to discover their God-given destiny.
            </Box>
          </Center>
        </Box>
        <Box className="flip-container">
          <Center
            h={[180, 250]}
            p={[4, 12]}
            borderWidth="1px"
            borderRadius="20"
            bgImage={`linear-gradient(180deg, rgba(198, 246, 213, 0.7) 0%, rgba(39, 103, 73, 0.7) 100%), url('${process.env.PUBLIC_URL}/images/connect/focus-ministry.jpg')`}
            bgPosition="center"
            bgSize="cover"
            shadow="lg"
            color="white"
            className="flipper"
          >
            <Heading
              as="h4"
              fontSize={["1.5em", "1.5em", "2em"]}
              fontWeight={700}
              textAlign="center"
              className="front"
            >
              SINGLE ADULTS
            </Heading>
            <Box className="back" fontWeight={600} fontSize={["xs", "md"]}>
              Creating an avenue for single working adults to fellowship and
              learn how to best exercise their God-given influence in their
              respective schools and workplaces.
            </Box>
          </Center>
        </Box>
        <Box className="flip-container">
          <Center
            h={[180, 250]}
            p={[4, 12]}
            borderWidth="1px"
            borderRadius="20"
            bgImage={`linear-gradient(180deg, rgba(252, 129, 129, 0.7) 0%, rgba(151, 38, 109, 0.7) 100%), url('${process.env.PUBLIC_URL}/images/connect/married-couples-ministry.jpg')`}
            bgPosition="center"
            bgSize="cover"
            shadow="lg"
            color="white"
            className="flipper"
          >
            <Heading
              as="h4"
              fontSize={["1.5em", "1.5em", "2em"]}
              fontWeight={700}
              textAlign="center"
              className="front"
            >
              MARRIED COUPLES
            </Heading>
            <Box className="back" fontWeight={600} fontSize={["sm", "md"]}>
              Bringing together Godly families that will love on and impact the
              next generation of their families and city.
            </Box>
          </Center>
        </Box>
        <Box className="flip-container">
          <Center
            h={[180, 250]}
            p={[4, 12]}
            borderWidth="1px"
            borderRadius="20"
            bgImage={`linear-gradient(180deg, rgba(254, 252, 191, 0.7) 0%, rgba(246, 173, 85, 0.7) 100%), url('${process.env.PUBLIC_URL}/images/connect/children-ministry.jpg')`}
            bgPosition="center"
            bgSize="cover"
            shadow="lg"
            color="white"
            className="flipper"
          >
            <Heading
              as="h4"
              fontSize={["1.5em", "1.5em", "2em"]}
              fontWeight={700}
              textAlign="center"
              className="front"
            >
              CHILDREN
            </Heading>
            <Box className="back" fontWeight={600} fontSize={["sm", "md"]}>
              Building Blocks is HMCC’s Children Ministry, learn more about it{" "}
              <Text as="u">
                <Link href="https://hongkong.hmcc.net/building-blocks/">
                  here ➔
                </Link>
              </Text>
            </Box>
          </Center>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default OurMinistries;
