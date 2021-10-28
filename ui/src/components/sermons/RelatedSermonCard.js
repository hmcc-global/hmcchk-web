import {
    AspectRatio,
    Box,
    Image,
    Text,
    Button,
    HStack,
		Stack,
    VStack
  } from "@chakra-ui/react";
  import { useState } from "react";
  import {Link} from "react-router-dom";
  import { DateTime } from "luxon";
  import parse, { domToReact, attributesToProps } from "html-react-parser";
  import { DATE_FULL } from "luxon/src/impl/formats";
  
  const RelatedSermonCard = ({sermonData, allSermons}, props) => {
    let sermonDate = DateTime.fromISO(sermonData.datePreached).toLocaleString(DATE_FULL);
    
    return (
      <>
			<Box
          borderWidth="1px"
          borderRadius="20"
          overflow="hidden"
          h="auto"
          bg="white"
          shadow="lg"
        >
					<Stack direction="row">
						<AspectRatio width="25%" ratio={1 / 1}>
							<Link to={{pathname:`/sermons/${sermonData.id}`, state:{sermonData:sermonData, allSermons:allSermons}}}>	
								<Image borderLeftRadius="20" src="https://bit.ly/sage-adebayo" objectFit="cover" />
							</Link>
						</AspectRatio>
          <Box overflow="hidden" position="relative" p={[3,6]}>
            <VStack alignItems="left">
              <Text as="h4" size="md" fontWeight="900" isTruncated>
                {sermonData.title}
              </Text> 
              <Text>
								{sermonData.sermonSeries[0].name}
              </Text>
              <HStack>
                <Text>
                  {sermonData.speaker[0].name}
                </Text>
                <Text align="right">
                  {sermonDate}
                </Text>
						  </HStack>
            </VStack>   
          </Box>
					</Stack>
				</Box>
      </>
    );
  };
  
  export default RelatedSermonCard;
  