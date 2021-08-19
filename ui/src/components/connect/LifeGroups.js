import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { AiOutlineInstagram } from "react-icons/ai";
import Slider from "react-slick";
import TestimonyCard from "./TestimonyCard";
import testimoniesList from "./testimonies.json";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./_connect.scss";

const LifeGroups = (props) => {
  const sliderSettings = {
    adaptiveHeight: true,
    arrows: false,
    centerMode: true,
    dots: false,
    focusOnSelect: true,
    infinite: false,
    slidesPerRow: 1,
    speed: 500,
    swipeToSlide: true,
    variableWidth: true,
  };

  return (
    <Box>
      <Heading
        as="h2"
        fontSize={["2.25em", "3em", "4em"]}
        fontWeight={800}
        textAlign="center"
        mb={[0, 4]}
      >
        <span style={{ color: "#FD7B7E" }}>L</span>
        <span style={{ color: "#43B77B" }}>I</span>
        <span style={{ color: "#7DABFC" }}>F</span>
        <span style={{ color: "#FEDD64" }}>E</span> GROUPS
      </Heading>
      <Box>Life group video</Box>
      <Flex
        flexDirection={props.isLargerThan768 ? "row" : "column-reverse"}
        mb={4}
      >
        <Box flex={1}>
          <Image
            src={`${process.env.PUBLIC_URL}/images/connect/LG-map.png`}
            mr={[0, 6]}
          />
        </Box>
        <Stack flex={1} textAlign={["center", "left"]} pb={[6, 0]}>
          <Text fontSize={["md", "xl"]} mb={4}>
            At HMCC, we believe in the power of community and the fullness of
            life that it offers -- which is why we believe in{" "}
            <span style={{ fontWeight: "bold" }}>LIFE Groups.</span>
            <br />
            <br />
            LIFE Group is more than just a weekly Bible study group. It is about{" "}
            <span style={{ fontWeight: "bold" }}>Loving</span> one another,{" "}
            <span style={{ fontWeight: "bold" }}>Investing</span> in the
            community, growing in our{" "}
            <span style={{ fontWeight: "bold" }}>Faith</span>, and{" "}
            <span style={{ fontWeight: "bold" }}>Enjoying</span> life together
            as a family living out the Gospel.
          </Text>
          <Center>
            <LinkBox
              style={{ backgroundOrigin: "border-box" }}
              as="button"
              transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
              boxShadow="2px 1000px 1px #fff inset"
              boxSizing="border-box"
              border="solid 3px transparent"
              borderRadius={10}
              backgroundImage="linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), linear-gradient(to right, #fd7b7e, #3182ce)"
              backgroundClip="content-box, border-box"
              py={2}
              w={["95%", 350]}
              fontSize={["0.75em", "1.125em"]}
              _hover={{ boxShadow: "none", color: "#fff" }}
            >
              <LinkOverlay href="https://tinyurl.com/t2muez3u">
                SIGN UP FOR LIFE GROUPS NOW!
              </LinkOverlay>
            </LinkBox>
          </Center>
        </Stack>
      </Flex>
      <Box mb={10}>
        <Heading
          fontSize={["md", "xl"]}
          fontWeight={700}
          textAlign="center"
          mb={[2, 4]}
        >
          Check out the different LIFE Groups in HMCC!
        </Heading>
        <SimpleGrid columns={[2, 4]} spacing={3}>
          <Flex
            px={2}
            py={4}
            borderWidth="1px"
            borderRadius="20"
            bgImage={`linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${process.env.PUBLIC_URL}/images/connect/cityu.jpg')`}
            bgPosition="center"
            bgSize="cover"
            shadow="lg"
            color="#fff"
            textAlign="center"
            flexDir="column"
          >
            <Heading as="h4" fontSize="3xl" fontWeight={700}>
              CITYU
            </Heading>
            <Text fontSize={[".75em", "1em"]} mb={4}>
              City University of Hong Kong
            </Text>
            <Spacer />
            <LinkBox>
              <LinkOverlay
                href="https://www.instagram.com/lifeatcityu/"
                isExternal
              >
                <Button
                  leftIcon={<AiOutlineInstagram size="20px" />}
                  colorScheme="whiteAlpha"
                  borderColor="#fff"
                  color="#fff"
                  size="sm"
                  variant="outline"
                >
                  @LIFEATCITYU
                </Button>
              </LinkOverlay>
            </LinkBox>
          </Flex>
          <Flex
            px={2}
            py={4}
            borderWidth="1px"
            borderRadius="20"
            bgImage={`linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${process.env.PUBLIC_URL}/images/connect/cuhk.jpg')`}
            bgPosition="center"
            bgSize="cover"
            shadow="lg"
            color="#fff"
            textAlign="center"
            flexDir="column"
          >
            <Heading as="h4" fontSize="3xl" fontWeight={700}>
              CUHK
            </Heading>
            <Text fontSize={[".75em", "1em"]} mb={4}>
              The Chinese University of Hong Kong
            </Text>
            <Spacer />
            <LinkBox>
              <LinkOverlay
                href="https://www.instagram.com/lifeatcuhk/"
                isExternal
              >
                <Button
                  leftIcon={<AiOutlineInstagram size="20px" />}
                  colorScheme="whiteAlpha"
                  borderColor="#fff"
                  color="#fff"
                  size="sm"
                  variant="outline"
                >
                  @LIFEATCUHK
                </Button>
              </LinkOverlay>
            </LinkBox>
          </Flex>
          <Flex
            px={2}
            py={4}
            borderWidth="1px"
            borderRadius="20"
            bgImage={`linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${process.env.PUBLIC_URL}/images/connect/hkbu.jpg')`}
            bgPosition="center"
            bgSize="cover"
            shadow="lg"
            color="#fff"
            textAlign="center"
            flexDir="column"
          >
            <Heading as="h4" fontSize="3xl" fontWeight={700}>
              HKBU
            </Heading>
            <Text fontSize={[".75em", "1em"]} mb={4}>
              Hong Kong Baptist University
            </Text>
            <Spacer />
            <LinkBox>
              <LinkOverlay
                href="https://www.instagram.com/lifeathkbu/"
                isExternal
              >
                <Button
                  leftIcon={<AiOutlineInstagram size="20px" />}
                  colorScheme="whiteAlpha"
                  borderColor="#fff"
                  color="#fff"
                  size="sm"
                  variant="outline"
                >
                  @LIFEATHKBU
                </Button>
              </LinkOverlay>
            </LinkBox>
          </Flex>
          <Flex
            px={2}
            py={4}
            borderWidth="1px"
            borderRadius="20"
            bgImage={`linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${process.env.PUBLIC_URL}/images/connect/hku.jpg')`}
            bgPosition="center"
            bgSize="cover"
            shadow="lg"
            color="#fff"
            textAlign="center"
            flexDir="column"
          >
            <Heading as="h4" fontSize="3xl" fontWeight={700}>
              HKU
            </Heading>
            <Text fontSize={[".75em", "1em"]} mb={4}>
              The University of Hong Kong
            </Text>
            <Spacer />
            <LinkBox>
              <LinkOverlay
                href="https://www.instagram.com/lifeathku/"
                isExternal
              >
                <Button
                  leftIcon={<AiOutlineInstagram size="20px" />}
                  colorScheme="whiteAlpha"
                  borderColor="#fff"
                  color="#fff"
                  size="sm"
                  variant="outline"
                >
                  @LIFEATHKU
                </Button>
              </LinkOverlay>
            </LinkBox>
          </Flex>
          <Flex
            px={2}
            py={4}
            borderWidth="1px"
            borderRadius="20"
            bgImage={`linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${process.env.PUBLIC_URL}/images/connect/hkust.jpg')`}
            bgPosition="center"
            bgSize="cover"
            shadow="lg"
            color="#fff"
            textAlign="center"
            flexDir="column"
          >
            <Heading as="h4" fontSize="3xl" fontWeight={700}>
              HKUST
            </Heading>
            <Text fontSize={[".75em", "1em"]} mb={4}>
              The Hong Kong University of Science and Technology
            </Text>
            <Spacer />
            <LinkBox>
              <LinkOverlay
                href="https://www.instagram.com/lifeathkust/"
                isExternal
              >
                <Button
                  leftIcon={<AiOutlineInstagram size="20px" />}
                  colorScheme="whiteAlpha"
                  borderColor="#fff"
                  color="#fff"
                  size="sm"
                  variant="outline"
                >
                  @LIFEATHKUST
                </Button>
              </LinkOverlay>
            </LinkBox>
          </Flex>
          <Flex
            px={2}
            py={4}
            borderWidth="1px"
            borderRadius="20"
            bgImage={`linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${process.env.PUBLIC_URL}/images/connect/polyu.jpg')`}
            bgPosition="center"
            bgSize="cover"
            shadow="lg"
            color="#fff"
            textAlign="center"
            flexDir="column"
          >
            <Heading as="h4" fontSize="3xl" fontWeight={700}>
              POLYU
            </Heading>
            <Text fontSize={[".75em", "1em"]} mb={4}>
              The Hong Kong Polytechnic University
            </Text>
            <Spacer />
            <LinkBox>
              <LinkOverlay
                href="https://www.instagram.com/lifeatpolyu/"
                isExternal
              >
                <Button
                  leftIcon={<AiOutlineInstagram size="20px" />}
                  colorScheme="whiteAlpha"
                  borderColor="#fff"
                  color="#fff"
                  size="sm"
                  variant="outline"
                >
                  @LIFEATPOLYU
                </Button>
              </LinkOverlay>
            </LinkBox>
          </Flex>
          <Flex
            px={2}
            py={4}
            borderWidth="1px"
            borderRadius="20"
            bgImage={`linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${process.env.PUBLIC_URL}/images/connect/focus.jpg')`}
            bgPosition="center"
            bgSize="cover"
            shadow="lg"
            color="#fff"
            textAlign="center"
            flexDir="column"
          >
            <Heading as="h4" fontSize="3xl" fontWeight={700}>
              FOCUS
            </Heading>
            <Text fontSize={[".75em", "1em"]} mb={4}>
              Single and Working Adults
            </Text>
            <Spacer />
            <LinkBox>
              <LinkOverlay
                href="https://www.instagram.com/lifeathk/"
                isExternal
              >
                <Button
                  leftIcon={<AiOutlineInstagram size="20px" />}
                  colorScheme="whiteAlpha"
                  borderColor="#fff"
                  color="#fff"
                  size="sm"
                  variant="outline"
                >
                  @LIFEATHK
                </Button>
              </LinkOverlay>
            </LinkBox>
          </Flex>
          <Flex
            px={2}
            py={4}
            borderWidth="1px"
            borderRadius="20"
            bgImage={`linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${process.env.PUBLIC_URL}/images/connect/covenant.jpg')`}
            bgPosition="center"
            bgSize="cover"
            shadow="lg"
            color="#fff"
            textAlign="center"
            flexDir="column"
          >
            <Heading as="h4" fontSize="3xl" fontWeight={700}>
              COVENANT
            </Heading>
            <Text fontSize={[".75em", "1em"]} mb={4}>
              Married Couples and Families
            </Text>
            <Spacer />
            <LinkBox>
              <LinkOverlay
                href="https://www.instagram.com/lifeathk/"
                isExternal
              >
                <Button
                  leftIcon={<AiOutlineInstagram size="20px" />}
                  colorScheme="whiteAlpha"
                  borderColor="#fff"
                  color="#fff"
                  size="sm"
                  variant="outline"
                >
                  @LIFEATHK
                </Button>
              </LinkOverlay>
            </LinkBox>
          </Flex>
        </SimpleGrid>
      </Box>
      <Heading
        as="h2"
        fontSize={["2xl", "3xl", "5xl"]}
        fontWeight={800}
        textAlign="center"
        px={[4, 16]}
        mb={4}
      >
        What our members have to say about LIFE Groups
      </Heading>
      <Slider {...sliderSettings} className="full-width">
        {testimoniesList.length > 0 &&
          testimoniesList.map((testimonyInfo, i) => (
            <TestimonyCard
              key={"testimony" + i}
              testimonyInfo={testimonyInfo}
            />
          ))}
      </Slider>
    </Box>
  );
};

export default LifeGroups;
