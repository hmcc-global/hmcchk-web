import {
  AspectRatio,
  Box,
  Container,
  Flex,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';

const MissionsMonthVideo = () => {
  const missionsDesc = `As we experience God personally, the worthiness and majesty of Christ fuels our response to live on a mission for Him and be a witness for Him to those around us. 
  `;
  return (
    <Flex
      w="full"
      h="auto"
      direction="column"
      alignItems="center"
      paddingTop="2em"
      paddingBottom="2em"
    >
      <Container
        maxW="container.lg"
        justifyContent="center"
        display="flex"
        marginTop="2em"
      >
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: 8, md: 2 }}
        >
          <Stack
            direction="column"
            width={{ base: '100%', md: '50%' }}
            style={{ justifyContent: 'center' }}
            spacing={8}
          >
            <Box
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                src={`${process.env.PUBLIC_URL}/images/missions-month/missions_title2.png`}
                width="80%"
              />
            </Box>
            <Text
              style={{ textAlign: 'center' }}
              fontSize={{ base: '12px', md: '16px' }}
            >
              {missionsDesc}
            </Text>
          </Stack>
          <AspectRatio width={{ base: '100%', md: '50%' }} ratio={16 / 9}>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/1CdHr1bI3XM"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </AspectRatio>
        </Stack>
      </Container>
    </Flex>
  );
};

export default MissionsMonthVideo;
