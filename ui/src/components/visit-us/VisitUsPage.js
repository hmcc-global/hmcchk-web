import {
  AspectRatio,
  Box,
  Center,
  Container,
  Flex,
  Heading,
  Icon,
  Link,
  LinkBox,
  LinkOverlay,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { RiArrowRightLine, RiChat1Line } from "react-icons/ri";
import Faq from "./Faq";

const SUNDAY_CELEBRATION_LOCATION =
  "Manulife Financial Centre Tower A, Shop 13, 1/F, Tower A, Kwun Tong";
const SUNDAY_CELEBRATION_GOOGLE_MAPS_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.2102241954112!2d114.22135071553005!3d22.307887848255323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3404014806001b5d%3A0x895969fc5cf86457!2sOrganize%20Kwun%20Tong!5e0!3m2!1sen!2shk!4v1628957852778!5m2!1sen!2shk";

const VisitUsPage = (props) => {
  return (
    <Container maxW="container.lg" py={10}>
      <VStack spacing={[4, 10]} align="stretch">
        <Box
          borderWidth="1px"
          borderRadius="20"
          bgImage={`url('${process.env.PUBLIC_URL}/images/visitus/header-banner.jpg')`}
          bgPosition="center"
          bgSize="cover"
          px={[6, 12, 36]}
          py={[8, 16, 20]}
          mb={[4, 0]}
        >
          <Heading
            as="h2"
            fontSize={["4xl", "6xl"]}
            fontWeight={700}
            lineHeight={1}
            color="white"
            textAlign="center"
            mb={5}
          >
            Sunday Celebration
          </Heading>
          <Text
            color="white"
            fontSize={["md", "xl"]}
            fontWeight={600}
            textAlign="center"
            mb={[0, 5]}
          >
            is HMCC’s weekend gathering where everyone in the church comes
            together to{" "}
            <span style={{ color: "#F6E05E" }}>
              receive God’s message, worship in community and enjoy fellowship.
            </span>
            <br />
            Everybody’s welcome!
          </Text>
        </Box>
        <Box pb={[4, 0]}>
          <Heading
            as="h3"
            fontSize={["2em", "5xl"]}
            fontWeight={800}
            textAlign="center"
            mb={[2, 10]}
          >
            Ways to enjoy Sunday Celebration
          </Heading>
          <Flex flexDir={["column", "row"]}>
            <VStack
              flex={4.25}
              align="stretch"
              textAlign={["center", "left"]}
              mr={[0, 6]}
              mb={[6, 0]}
            >
              <Heading
                as="h3"
                fontSize={["3xl", "5xl"]}
                fontWeight={800}
                mt={4}
              >
                In-person <Icon as={RiArrowRightLine} />
              </Heading>
              <Text fontSize={["2xl", "2em"]} fontWeight={700}>
                Sundays @ 10 AM
              </Text>
              <Text
                fontSize={["1.125em", "2xl"]}
                fontWeight={700}
                px={[6, 0]}
                pb={4}
              >
                {SUNDAY_CELEBRATION_LOCATION}
                <br />
                <Link
                  href="https://tinyurl.com/directions-organize"
                  color="#0E66CC"
                  isExternal
                >
                  <Text as="u">tinyurl.com/directions-organize</Text>
                </Link>
              </Text>
              <Spacer />
              <Center w="100%" px={1}>
                <LinkBox
                  style={{ backgroundOrigin: "border-box" }}
                  as="button"
                  transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                  boxShadow="2px 1000px 1px #fff inset"
                  boxSizing="border-box"
                  border="solid 3px transparent"
                  borderRadius={10}
                  backgroundImage="linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), linear-gradient(to right, #00B5D8, #F6AD55)"
                  backgroundClip="content-box, border-box"
                  py={3}
                  w="100%"
                  fontSize={["md", "lg"]}
                  _hover={{ boxShadow: "none", color: "#fff" }}
                >
                  <LinkOverlay
                    href="https://bit.ly/hmcc-sc-registration"
                    isExternal
                  >
                    Sign Up for In-person Sunday Celebration
                  </LinkOverlay>
                </LinkBox>
              </Center>
              <Text textAlign="center" fontSize="sm">
                *Pre-registration opens every Monday at 8PM
              </Text>
            </VStack>
            <AspectRatio flex={5.75} ratio={16 / 9}>
              <iframe
                title="Sunday Celebration location - Google Maps"
                src={SUNDAY_CELEBRATION_GOOGLE_MAPS_EMBED}
                loading="lazy"
              ></iframe>
            </AspectRatio>
          </Flex>
        </Box>
        <Box
          borderWidth="1px"
          borderRadius="20"
          bgImage={`url('${process.env.PUBLIC_URL}/images/visitus/join-us-online.png')`}
          bgPosition="center"
          bgSize="cover"
          px={6}
          pt={[4, 6]}
          pb={4}
        >
          <VStack align="stretch" spacing={12}>
            <Heading
              as="h3"
              fontSize={["2xl", "4xl"]}
              fontWeight={[400, 700]}
              color="white"
              maxW={650}
              textAlign={["center", "initial"]}
            >
              If you are not able to join in-person, you could also...
            </Heading>
            <Heading
              as="h3"
              fontSize={["2xl", "4xl"]}
              color="white"
              textAlign={["center", "right"]}
            >
              <Link href="https://hongkong.sub.hmcc.net/online/" isExternal>
                Join us Online <Icon as={RiArrowRightLine} />
              </Link>
            </Heading>
          </VStack>
        </Box>
        <Box>
          <Heading
            as="h3"
            fontSize={["2xl", "4xl"]}
            fontWeight={800}
            textAlign="center"
          >
            Got Queries?{" "}
            <Link href="mailto:hongkong@hmcc.net">
              hongkong@hmcc.net <Icon as={RiChat1Line} ml={1} />
            </Link>
          </Heading>
        </Box>
        <Box pt={4}>
          <Faq />
        </Box>
      </VStack>
    </Container>
  );
};

export default VisitUsPage;
