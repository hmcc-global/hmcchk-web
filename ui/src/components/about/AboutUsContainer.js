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

const sections = [
  "Our Story",
  "Vision & Mission",
  "Our Strategy",
  "Our Staff",
  "Beliefs",
  "Values",
];

const AboutUsContainer = (props) => {
  const [selected, setSelected] = useState(0);
  const banner = blurbs.banner;

  return (
    <Container maxW="container.lg" py={10}>
      <VStack>
        <Box
          borderWidth="1px"
          borderRadius="20"
          // TODO-aparedan: change bgimage
          bgImage={`url('${process.env.PUBLIC_URL}/images/visitus/header-banner.jpg')`}
          bgPosition="center"
          bgSize="cover"
          px={[6, 12, 35]}
          py={[8, 16, 20]}
          mb={[4, 8]}
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
            {banner.title}
          </Heading>
          <Text
            color="white"
            fontSize={["sm", "md"]}
            fontWeight={600}
            textAlign="center"
            mb={[0, 5]}
          >
            {banner.blurb}
          </Text>
          <HStack justifyContent="space-evenly">
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
                        // display="inline-block"
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
          {/* TODO-aparedan: navigation menu */}
        </Box>
        {selected == 0 && (
          <StorySection blurb={blurbs.story} title={sections[selected]} />
        )}
        {selected == 1 && <VisionMissionSection blurb={blurbs.visionMission} />}
        {selected == 2 && <StrategySection />}
        {selected == 3 && <StaffSection />}
        {selected == 4 && <BeliefsSection blurb={blurbs.beliefs} />}
        {selected == 5 && <ValuesSection blurb={blurbs.values} />}
      </VStack>
    </Container>
  );
};

export default AboutUsContainer;
