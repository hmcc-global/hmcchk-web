import {
  Box,
  Container,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/layout";
import BeliefsSection from "./BeliefsSection";
import StaffSection from "./StaffSection";
import StorySection from "./StorySection";
import StrategySection from "./StrategySection";
import ValuesSection from "./ValuesSection";
import VisionMissionSection from "./VisionMissionSection";
import blurbs from "./about.json";
import { Fragment, useState } from "react";
import { Select } from "@chakra-ui/select";

const sections = [
  "Our Story",
  "Vision, Mission & Values",
  "Our Strategy",
  "Our Staff",
  "Beliefs",
];

const AboutUsContainer = (props) => {
  const [selected, setSelected] = useState(0);
  const banner = blurbs.banner;

  const handleChange = (e) => setSelected(parseInt(e.target.value));

  return (
    <Container maxW="container.lg" py={10}>
      <VStack>
        <Box
          borderWidth="1px"
          borderRadius="20"
          bgImage={`url('${process.env.PUBLIC_URL}/images/about/headerBg.png')`}
          bgPosition="center"
          bgSize="cover"
          px={[6, 12, 35]}
          py={5}
          mb={[4, 8]}
        >
          <Heading
            as="h2"
            fontSize={["4xl", "6xl"]}
            fontWeight={700}
            lineHeight={1}
            color="white"
            textAlign="center"
            mb={12}
          >
            {banner.title}
          </Heading>
          <Text
            color="white"
            fontSize={["sm", "md"]}
            fontWeight={600}
            textAlign="center"
            mb={[0, 10]}
          >
            {banner.blurb}
          </Text>
          <HStack
            justifyContent="space-evenly"
            display={{ base: "none", md: "flex" }}
          >
            {sections &&
              sections.map((e, i) => {
                return (
                  <Fragment key={i}>
                    <Text
                      color="white"
                      fontWeight={600}
                      textDecoration="none"
                      borderBottom="#FFFFFF 0.1em solid"
                      cursor="pointer"
                      onClick={() => setSelected(i)}
                    >
                      {e}
                    </Text>
                    {i < sections.length - 1 ? (
                      <Text
                        mx={[3, 4]}
                        color="white"
                        fontSize={["md", "2xl"]}
                        verticalAlign="baseline"
                      >
                        &bull;
                      </Text>
                    ) : null}
                  </Fragment>
                );
              })}
          </HStack>
          <Select
            mt={4}
            variant="flushed"
            display={{ base: "block", md: "none" }}
            value={selected}
            onChange={(e) => handleChange(e)}
          >
            {sections &&
              sections.map((e, i) => {
                return (
                  <option value={i} key={i}>
                    {e}
                  </option>
                );
              })}
          </Select>
        </Box>
        {selected === 0 && (
          <StorySection blurb={blurbs.story} title={sections[selected]} />
        )}
        {selected === 1 && (
          <ValuesSection
            blurb={blurbs.visionMissionValues}
            title={sections[selected]}
          />
        )}
        {selected === 2 && <StrategySection />}
        {selected === 3 && (
          <StaffSection blurb={blurbs.staff} title={sections[selected]} />
        )}
        {selected === 4 && (
          <BeliefsSection blurb={blurbs.beliefs} title={sections[selected]} />
        )}
      </VStack>
    </Container>
  );
};

export default AboutUsContainer;
