import {
  AspectRatio,
  Box,
  Button,
  HStack,
  Image,
  VStack,
} from "@chakra-ui/react";

const EventsSectionCard = (props) => {
  const { width, height, url } = props;
  return (
    <Box borderRadius={10} w={width} h={height}>
      <VStack justifyContent="space-between">
        <AspectRatio mb="5" width="full" ratio={16 / 9}>
          <Image borderRadius={10} objectFit="cover" src={url} />
        </AspectRatio>
        <HStack direction="space-between">
          <Button>SIGN UP</Button>
          <Button>LEARN MORE</Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default EventsSectionCard;
