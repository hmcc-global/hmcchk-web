import { Text, Stack, Box, Image, VStack } from '@chakra-ui/react';

const SpeakerSection = ({ id }) => {
  return (
    <>
      <div id={id}>
        <VStack w="full">
          <Text
            textStyle="sora"
            fontSize={['sm', 'lg', 'xl']}
            textAlign="center"
          >
            <b>Speaker</b>
          </Text>
          <Stack
            align="center"
            direction={['column', 'column', 'row']}
            w={'80%'}
            spacing={['9']}
            pt={[3]}
            pb={[6]}
          >
            <Box>
              <Image
                borderRadius="20px"
                mx={[0, 0, 5]}
                w={['80vw', '100vw', '100vw']}
                src={
                  process.env.PUBLIC_URL + '/images/retreat/pastor-brett.png'
                }
              />
            </Box>
            <Box
              border="1px solid #000"
              borderRadius="20px"
              bg="white"
              w={['80vw', '80vw', '100vw']}
              p={[3, 7, 8, 10]}
            >
              <Text
                textStyle="sora"
                fontSize={['12px', '16px', '10px', 'xs', 'sm']}
              >
                Brett Hilliard <br />
                Senior Pastor @ Island ECC <br /> <br />
              </Text>
              <Text
                textStyle="inter"
                fontSize={['12px', '16px', '10px', 'xs', 'sm']}
              >
                Brett Hilliard is the Senior Pastor of Island Evangelical
                Community Church (Island ECC), an English-speaking church in
                Quarry Bay. Brett arrived in the city in 2001 to serve as pastor
                of the then newly-planted church. A native of Texas, USA, Brett
                graduated in Accounting from Texas Tech University in 1986, was
                a campus minister specialising in leadership development for
                several years, served as an English teacher in Lanzhou, China,
                and was a missions pastor in Memphis, Tennessee. He is
                fascinated with the ever-changing global culture, and enjoys
                reading about the increasing demands on today’s cultural
                leaders. Brett is married to his college sweetheart, Shannon,
                and they have 4 beautifully diverse adult children: Abby,
                Hudson, Mary Grace, and Zane.
              </Text>
            </Box>
          </Stack>
        </VStack>
      </div>
    </>
  );
};

export default SpeakerSection;
