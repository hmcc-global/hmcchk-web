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
  import { DATE_FULL } from "luxon/src/impl/formats";
  
  const RelatedSermonCard = ({sermonData, allSermons}) => {
    let sermonDate = DateTime.fromISO(sermonData.datePreached).toLocaleString(DATE_FULL);
    let sermonImage = "";
    if(sermonData.sermonSeries[0].image !== null)
      sermonImage = sermonData.sermonSeries[0].image.sourceUrl;
    return (
      <>
			<Box
        borderWidth="1px"
        borderRadius="20"
        overflow="hidden"
        bg="white"
        shadow="lg"
        >
					<Stack direction="row">
            <Link to={{pathname:`/sermons/${sermonData.id}`, state:{sermonData:sermonData, allSermons:allSermons}}}>	
						  <AspectRatio w={{base:"81px", md:"324px"}} ratio={16/9}>
								<Image borderLeftRadius="20" src={sermonImage} objectFit="cover" />
						  </AspectRatio>
            </Link>
          <Link to={{pathname:`/sermons/${sermonData.id}`, state:{sermonData:sermonData, allSermons:allSermons}}}>
            <Box overflow="hidden" position="relative" p={[2,6]}>
              <VStack alignItems="left">
                <Text textShadow="1px 0px 0px black" fontSize={{base:"sm", md:"md"}} isTruncated>
                  {sermonData.title}
                </Text> 
                <Text fontSize={{base:"xs", md:"md"}} isTruncated>
                  {sermonData.sermonSeries[0].name}
                </Text>
                <HStack>
                  <Text fontSize={{base:"xs", md:"md"}} isTruncated> 
                    {sermonData.speaker[0].name}
                  </Text>
                  <Text alignSelf="flex-end" alignContent="flex-end" alignItems="flex-end" textAlign="right" fontSize={{base:"xs", md:"md"}} isTruncated>
                    {sermonDate}
                  </Text>
                </HStack>
              </VStack>   
            </Box>
          </Link>
					</Stack>
				</Box>
      </>
    );
  };
  
  export default RelatedSermonCard;
  