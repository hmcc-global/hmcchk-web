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

  const sermonCardStyle = {
    borderWidth:"1px",
    borderRadius:"20px",
    overflow:"hidden",
    bg:"white",
    boxShadow:"0px 4px 8px rgba(0, 0, 0, 0.15)",
    align:"stretch"
  };

    return (
      <>
			<Link
        style={sermonCardStyle}
        to={{pathname:`/sermons/${sermonData.id}`, state:{sermonData:sermonData, allSermons:allSermons}}}
        >
					<Stack direction="row">
						<AspectRatio w={{base:"105px", md:"160px"}} ratio={1}>
							<Image borderLeftRadius="20" src={sermonImage} objectFit="cover" />
						</AspectRatio>
              <Box overflow="hidden" position="relative" p={[2,6]}>
                <VStack alignItems="left" spacing={{base:1, md: 2}}>
                  <Text textShadow="1px 0px 0px black" fontSize={{base:"sm", md:"md"}} isTruncated>
                    {sermonData.title}
                  </Text> 
                  <Text fontSize={{base:"xs", md:"md"}} isTruncated>
                    {sermonData.sermonSeries[0].name}
                  </Text>
                  <Stack spacing={{base:1, md:"auto"}} direction={{base:"column", md:"row"}}>
                    <Text fontSize={{base:"xs", md:"md"}} isTruncated> 
                      {sermonData.speaker[0].name}
                    </Text>
                    <Text fontSize={{base:"xs", md:"md"}} isTruncated>
                      {sermonDate}
                    </Text>
                  </Stack>
                </VStack>   
              </Box>
					</Stack>
				</Link>
      </>
    );
  };
  
  export default RelatedSermonCard;
  