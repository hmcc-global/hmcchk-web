import { Text, Center, Box, Image, flex } from '@chakra-ui/react';

import { Parallax } from 'react-scroll-parallax';

const BecauseJesus = () => {
  return (
    <>
      <Parallax>
        <div className="thing">
          <h1>dwdwdw</h1>
        </div>
        {/* <Box w="10em">
          <Box>
            <Text
              textStyle="NextSoutherlandSerif"
              textAlign="center"
              fontSize="5xl"
            >
              Because, Jesus.
            </Text>
          </Box>
          <Box>
            <Image
              src={process.env.PUBLIC_URL + '/images/easter/EasterCross.png'}
            />
          </Box>
        </Box> */}
      </Parallax>
    </>
  );
};
export default BecauseJesus;
