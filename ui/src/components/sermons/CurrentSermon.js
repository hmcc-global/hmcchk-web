import React from "react";
import {Stack, 
				Text, 
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
				p={[4,8]}>
				<Stack direction={{base:"column", md:"row"}}>
					<Stack alignItems="left" width="35vw" direction="column" display={{base:"none", md:"flex"}}>
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
					</Stack>
          <Text 
							decoration="underline" 
							fontWeight="medium"
							fontSize="2em"
							fontStyle="italic"
							color="#0628A3"
              display={{base:"flex", md:"none"}}
						>
							Current Series
						</Text>
					<AspectRatio mb="5" borderRadius="20px" width="100%" ratio={16 / 9}>
						<iframe 
						width="560" 
						height="315" 
						src= "https://www.youtube.com/embed/HPN9oPptTnE"
						title="YouTube video player" 
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
						allowfullscreen>
						</iframe>
					</AspectRatio>
          <Stack alignItems="left" direction="column" display={{base:"flex", md:"none"}}>
						<Text
							fontWeight="bold"
							fontSize="1.2em"
						>
							The Simple Gospel
							{/* {currentSermon.sermonSeries[0].name} */}
						</Text>
						<Text fontSize="sm" lineHeight="shorter">
						We want to gain a deeper and complete understanding of the Gospel so 
						that we can experience the true transforming power of the Gospel. 
						We will go in-depth and study the books of Romans in this sermon series. 
						Let’s learn and experience the power of the Gospel together!
							{/* {currentSermon.sermonDesc} */}
						</Text>
					</Stack>
				</Stack>
			</Box>
    </>
  );
}

export default CurrentSermon;