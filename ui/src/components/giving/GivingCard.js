import * as React from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  LinkOverlay,
  VStack,
  HStack,
  Divider,
  Image,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

export function GivingCard(cardinfo) {
  return (
    <Box border="1px" w="30%" h="25%" borderRadius="lg">
      <VStack>
        <Heading as="h4" size="md" py="4">
          {cardinfo.text}
        </Heading>

        <Image boxSize="20vh" src={cardinfo.imageLink} />
        <Box paddingTop="4">
          <Button minW="15">
            <LinkOverlay href="">
              <HStack>
                <Text>Learn More</Text>
                <ChevronRightIcon />
              </HStack>
            </LinkOverlay>
          </Button>
        </Box>
      </VStack>
    </Box>
  );
}
export default GivingCard;
