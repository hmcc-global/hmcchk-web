import { Text, Stack, Box, Image, VStack } from '@chakra-ui/react';

const ThemeSection = ({ id }) => {
  return (
    <div id={id}>
      <VStack justifyContent="center">
        <Text textStyle="sora" fontSize={['sm', 'lg', 'xl']} textAlign="center">
          <b>Theme</b>
        </Text>
        <Stack
          align="center"
          direction={['column', 'column', 'row']}
          w={['80%']}
          spacing={['6', '9']}
          pt={[3]}
          pb={[6]}
        >
          <Box>
            <Image
              borderRadius="20px"
              // mx={[0, 0, 5]}
              w={['100%']}
              src={
                process.env.PUBLIC_URL +
                '/images/retreat/with-everything-retreat.png'
              }
            />
          </Box>
          <Box
            border="1px solid #000"
            borderRadius="20px"
            bg="white"
            w={['100%']}
            p={[3, 7, 8, 10]}
          >
            <Text
              textStyle="inter"
              fontSize={['12px', '16px', '10px', 'xs', 'sm']}
            >
              We believe that God has given us everything that we need, and in
              response to that, we want to worship Him with everything that we
              have. We want to believe that as we respond with everything, God
              is going to do great things in our lives and in our church.
              <br /> <br />
              Matthew 13:44 (English Standard Version)
              <br /> “The kingdom of heaven is like treasure hidden in a field,
              which a man found and covered up. Then in his joy he goes and
              sells all that he has and buys that field." <br /> <br />
              <b>
                <p align="right">
                  With Everything - Church-wide Conference 2022
                </p>
              </b>
            </Text>
          </Box>
        </Stack>
      </VStack>
    </div>
  );
};

export default ThemeSection;
