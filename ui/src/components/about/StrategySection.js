import { Flex, Text, Box, Container, Heading, HStack, UnorderedList, ListItem, Center, Stack} from "@chakra-ui/react";

const StrategySection = (props) => {
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
    <Flex direction="column">
      <Box  borderWidth="2px"
            borderRadius="5"
            shadow="lg"
            bg="#3182CE"
            px={[4, 8]}
            pt={[4, 6]}
            pb={[4, 6]}
            m={4}
            bgImage={`url('${process.env.PUBLIC_URL}/images/about-us/strategy.png')`}
            bgPosition="center"
            bgSize="cover">
            
        <Heading
        as="h3"
        fontSize={["4xl", "6xl"]}
        fontWeight={700}
        lineHeight={1}
        color="#000000"
        textAlign="center"
        mb={4}>
          Our Strategy
        </Heading>
        <Container maxW="container.lg" py={4}>
        
        <Stack direction={["column", "row"]} spacing="24px">
        

        <Box borderWidth="2px"
            borderRadius="5"
            shadow="lg"
            bg="#FFFFFF"
            px={[4, 8]}
            pt={[4, 6]}
            pb={[4, 6]}
            m={0}
            h={["40em", "40em"]}
            w={["13em", "25em"]}>
          
          <Heading 
          color="#3182CE"
          textAlign="center">
            Gather
          </Heading>

          <Text alignText="center" fontWeight="bold" py="3" px = "6">
          Corporate Gatherings & Community Gatherings
          </Text>
          <Text>
            We gather to foster a greater sense of unity and to continue to build up the church body:
          </Text>
          <UnorderedList>
              <ListItem>Corporate Gatherings are what we do together as the local body of Christ, such as Sunday Celebration, retreats, and baptism services.</ListItem>
              <ListItem>Community Gatherings are what we do in biblical community, specifically LIFE Group.</ListItem>
            </UnorderedList>
        </Box>
        <Box borderWidth="2px"
            borderRadius="5"
            shadow="lg"
            bg="#FFFFFF"
            px={[4, 8]}
            pt={[4, 6]}
            pb={[4, 6]}
            m={4}
            h={["50em", "40em"]}
            w={["13em", "25em"]}>
          
          <Heading 
          color="#3182CE"
          textAlign="center">
            Grow
          </Heading>
          
          <Text alignText="center" fontWeight="bold" py="3" px = "6">
          Life-on-Life & Equipping
          </Text>
          <Text>
          We believe it is crucial that we do not grow stagnant in our faith, but that we are continually learning and being challenged:

          </Text>
          <UnorderedList>
              <ListItem>Life-on-Life involves intentional relationships like Life Change Groups (LCG) and discipleship, which allows us to sharpen each other as Christ-followers.</ListItem>
              <ListItem>Equipping entails purposeful investment in people to live a transformed life through opportunities such as Experiencing Classes, Freedom Class, ministry team service, and learning to study the Bible and pray.</ListItem>
            </UnorderedList>
        </Box>
        <Box borderWidth="2px"
            borderRadius="5"
            shadow="lg"
            bg="#FFFFFF"
            px={[4, 8]}
            pt={[4, 6]}
            pb={[4, 6]}
            m={4}
            h={["50em", "40em"]}
            w={["13em", "25em"]}>
          
          <Heading 
          color="#3182CE"
          textAlign="center">
            Go
          </Heading>
          
          <Text alignText="center" fontWeight="bold" py="3" px = "6">
          Personal Mission & 
                    Team-Based Mission
          </Text>
          <Text>
          We have been called to go out and make disciples, by sharing the Good News and testifying of the work God has done in our lives:

          </Text>
          <UnorderedList>
              <ListItem>Personal Mission happens when an individual lives as the salt and light in our world, shares his/her faith with others and invites people into our community.</ListItem>
              <ListItem>Team-Based Mission happens when we partner together for God’s kingdom purposes through opportunities like missional initiatives, missions teams, and church plant teams.</ListItem>
            </UnorderedList>
        </Box>
        </Stack>
        </Container>
       
      </Box>
    </Flex>
  );
};

export default StrategySection;
