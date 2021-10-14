import React from "react";
import {HStack, 
				VStack, 
				Text, 
				Button,
				Image,
        AspectRatio
} from "@chakra-ui/react";

const CurrentSermon = ({currentSermon}) =>{

  return(
    <>
			<HStack>
				<VStack alignItems="left" width="35vw">
					<Text 
						decoration="underline" 
						fontWeight="medium"
						fontSize="2em"
					>
						Current Series
					</Text>
					{/* <Text
						fontWeight="bold"
						fontSize="3em"
					>
						{currentSermon.sermonSeries[0].name}
					</Text>
					<Text>
						{currentSermon.sermonDesc}
					</Text> */}
					<Button>
						Watch Latest Series Part
					</Button>
				</VStack>
				<AspectRatio mb="5" width="100%" ratio={16 / 9}>
					<Image src="" />
				</AspectRatio>
			</HStack>
    </>
  );
}

export default CurrentSermon;