import React from "react";
import {HStack, 
				VStack, 
				Text, 
				Button,
				Box,
				Image,
        AspectRatio
} from "@chakra-ui/react";

const CurrentSermon = ({currentSermon}) =>{

  return(
    <>
			<Box
				border= "4px solid #0628A3"
				boxSizing= "border-box"
				borderRadius= "20px"
				marginTop="20px"
				p={[5,8]}>
				<HStack>
					<VStack alignItems="left" width="35vw">
						<Text 
							decoration="underline" 
							fontWeight="medium"
							fontSize="2em"
							fontStyle="italic"
							color="#0628A3"
						>
							Current Series
						</Text>
						<Text
							fontWeight="bold"
							fontSize="2em"
						>
							The Simple Gospel
							{/* {currentSermon.sermonSeries[0].name} */}
						</Text>
						<Text fontSize="sm">
						We want to gain a deeper and complete understanding of the Gospel so 
						that we can experience the true transforming power of the Gospel. 
						We will go in-depth and study the books of Romans in this sermon series. 
						Let’s learn and experience the power of the Gospel together!
							{/* {currentSermon.sermonDesc} */}
						</Text>
						<Button>
							Watch Latest Series Part
						</Button>
					</VStack>
					<AspectRatio mb="5" width="70%" ratio={16 / 9}>
						<Image src="" />
					</AspectRatio>
				</HStack>
			</Box>
    </>
  );
}

export default CurrentSermon;