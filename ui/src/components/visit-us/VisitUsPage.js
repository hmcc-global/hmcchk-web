import {
  AspectRatio,
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  Link,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { RiArrowRightLine, RiChat1Line } from "react-icons/ri";
import Faq from "./Faq";

const VisitUsPage = (props) => {
  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={[4, 12]} align="stretch">
        <Box
          borderWidth="1px"
          borderRadius="20"
          bgImage={`url('${process.env.PUBLIC_URL}/images/visitus/header-banner.jpg')`}
          bgPosition="center"
          bgSize="cover"
          px={[8, 16, 36]}
          py={[8, 16, 20]}
          mb={[4, 0]}
        >
          <Heading
            as="h2"
            fontSize={["2.25em", "4em"]}
            fontWeight={700}
            color="white"
            textAlign="center"
            mb={5}
          >
            Sunday Celebration
          </Heading>
          <Text
            color="white"
            fontSize={["0.875em", "1.5em"]}
            fontWeight={600}
            textAlign="center"
            mb={[0, 5]}
          >
            is HMCC’s weekend gathering where everyone in the church comes
            together to worship God and celebrate His work in our lives.
            Everybody’s welcome! Come out to be encouraged through worship,
            message, and fellowship!
          </Text>
        </Box>
        <Box px={8} pb={[10, 0]}>
          <Heading
            as="h3"
            fontSize={["2em", "3em"]}
            fontWeight={800}
            textAlign="center"
            mb={[6, 10]}
          >
            Ways to enjoy Sunday Celebration
          </Heading>
          <Flex>
            <Stack flex="4.25" textAlign={["center", "left"]} mr={[0, 6]}>
              <Heading as="h3" fontSize={["2em", "3em"]} fontWeight={800}>
                In-person <Icon as={RiArrowRightLine} />
              </Heading>
              <Text fontSize={["1.5em", "2em"]} fontWeight={700}>
                Sundays @ 10 AM
              </Text>
              <Text fontSize={["1.125em", "1.5em"]} fontWeight={700}>
                Manulife Financial Centre Tower A, Shop 13, 1/F, Tower A, Kwun
                Tong
              </Text>
              <Link
                href="https://bit.ly/directions-organize"
                color="#0E66CC"
                fontSize={["1.125em", "1.5em"]}
                fontWeight={700}
                pb={4}
                isExternal
              >
                <Text as="u">bit.ly/directions-organize</Text>
              </Link>
              <Text
                fontSize={["0.875em", "1.125em"]}
                lineHeight={["1.5em", "2em"]}
              >
                Our services are primarily for the campus students, working
                adults and families.
                <br />
                There’s something for your little one(s) too!{" "}
                <Link href="https://hongkong.hmcc.net/building-blocks/">
                  <Text as="u" fontWeight={700}>
                    LEARN MORE
                  </Text>
                </Link>
              </Text>
            </Stack>
            <AspectRatio flex={[0, 5.75]} ratio={16 / 9}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.2102241954112!2d114.22135071553005!3d22.307887848255323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3404014806001b5d%3A0x895969fc5cf86457!2sOrganize%20Kwun%20Tong!5e0!3m2!1sen!2shk!4v1628957852778!5m2!1sen!2shk"
                allowfullscreen=""
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
          pl={[8, 16]}
          pt={[4, 16]}
          pr={8}
          pb={3}
        >
          <VStack align="stretch" spacing={6}>
            <Heading
              as="h3"
              fontSize={["1.5em", "3em"]}
              fontWeight={[400, 700]}
              color="white"
              maxW={550}
              textAlign={["center", "initial"]}
            >
              We hope to see you in person, until then...
            </Heading>
            <Heading
              as="h3"
              fontSize={["2em", "3em"]}
              color="white"
              textAlign={["center", "right"]}
            >
              <Link href="/online">
                Join us Online <Icon as={RiArrowRightLine} />
              </Link>
            </Heading>
          </VStack>
        </Box>
        <Box>
          <Heading
            as="h3"
            fontSize={["1.5em", "3em"]}
            fontWeight={800}
            textAlign="center"
          >
            Got Queries? hongkong@hmcc.net <Icon as={RiChat1Line} ml={1} />
          </Heading>
        </Box>
        <Box p={8}>
          <Faq />
        </Box>
      </VStack>
    </Container>
  );
};

export default VisitUsPage;
