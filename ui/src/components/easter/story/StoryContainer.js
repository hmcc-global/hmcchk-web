import { VStack, Text, Image, Box, Stack, Flex } from '@chakra-ui/react';

const StoryContainer = () => {
  return (
    <>
      <VStack justify="center" w={['40%']}>
        <Text textStyle="Quicksand">Story</Text>
        <Box>
          <Flex>
            <Image
              boxSize={['25%']}
              src={process.env.PUBLIC_URL + '/images/easter/birds2.png'}
            />
            <Text textStyle="Quicksand" color="#754156">
              <p align="center">
                A lot of people, if not most people, in this world go through
                every day on autopilot <b>without</b> knowing why we do what we
                do.
              </p>
            </Text>
            <Image
              boxSize={['25%']}
              src={process.env.PUBLIC_URL + '/images/easter/birds1.png'}
            />
          </Flex>
          <Image
            src={process.env.PUBLIC_URL + '/images/easter/story1-tomb.png'}
          />
        </Box>
        <Box>
          <Text textStyle="Quicksand" color="#685255">
            <p align="center">
              Life becomes <b>mundane</b> because we are <b>not inspired</b> or
              motivated by something greater and beyond ourselves.
            </p>
          </Text>
          <Image
            src={process.env.PUBLIC_URL + '/images/easter/story2-notext.png'}
          />
        </Box>
        <Box>
          <Text textStyle="Quicksand" color="#147076">
            <p align="center">
              When we <b>seek</b> to know the reason and purpose behind things,
              we open doors to deeper connections, desires, motivations, and
              stories <b>beyond the surface</b>.
            </p>
          </Text>
          <Image
            src={process.env.PUBLIC_URL + '/images/easter/story3-notext.png'}
          />
        </Box>
        <Box>
          <Text textStyle="Quicksand" color="#00367A">
            <p align="center">
              We want to keep emphasizing that the <b>reason</b> we do anything
              is the
              <b></b>GOSPEL and it revolves around{' '}
              <b>who Jesus is and what He has done</b>.
            </p>
          </Text>
          <Image
            src={process.env.PUBLIC_URL + '/images/easter/story4-notext.png'}
          />
        </Box>
      </VStack>
    </>
  );
};

export default StoryContainer;
