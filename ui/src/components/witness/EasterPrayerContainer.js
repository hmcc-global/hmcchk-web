import {
  Box,
  Container,
  Image,
  Text,
  Stack,
  Button,
  Link,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import SubmitPrayerButton from './text-prayer/SubmitPrayerButton';
import TextPrayerContainer from './text-prayer/TextPrayerContainer';

const EasterContainer = (props) => {
  return (
    <>
      <Container maxW="100vw" m={0} p={0}>
        <Box justifyContent="center" py={[7, 5]}>
          <Link href="/witness/home">
            <Button
              variant="link"
              fontSize={32}
              color="#7C2D6B"
              justifyContent="left"
              leftIcon={<ArrowBackIcon />}
              display="flex"
              mb={5}
              ml={[5, 10]}
            />
          </Link>
          <Stack
            direction="column"
            justifyContent={['center', 'space-evenly']}
            spacing={2}
            textAlign="center"
            mb={[5, 10]}
          >
            <Container maxW="100%" centerContent>
              <Text
                textStyle={'concrete_demo'}
                textColor="#E60053"
                fontWeight="1000"
                lineHeight="110%"
                fontSize={['20px', '40px']}
                marginBottom="15px"
              >
                PRAYER WALL
              </Text>
              <Text
                w={['80%', '60%']}
                textStyle={'dm_sans'}
                textColor="#000000"
                fontWeight="800"
                fontSize={['14px', '18px']}
                marginBottom="15px"
                textAlign="center"
              >
                As we enter Lent, we want to prepare our hearts and continue
                witnessing God work through our prayers! Please feel free to
                lift up a prayer for whatever God is putting on your heart.
              </Text>
              <Text
                w={['80%', '60%']}
                textStyle={'dm_sans'}
                fontWeight="black"
                textColor="#000000"
                fontSize={['14px', '18px']}
                marginBottom="15px"
                textAlign="center"
              >
                This week we are praying for:
              </Text>
              <Text
                textStyle={'dm_sans'}
                textColor="#E60053"
                fontWeight="700"
                fontSize={['20px', '27px']}
                marginBottom="15px"
              >
                JOY IN THE JOURNEY
              </Text>

              <Box w="100%">
                <Image
                  mx="auto"
                  w={{ base: '40px', md: '40px' }}
                  src={
                    process.env.PUBLIC_URL + '/images/witness/triangleicon.svg'
                  }
                  mb={1}
                />
                <Box
                  w={{ base: '70%', sm: '35%', md: '27%', lg: '22%' }}
                  mx="auto"
                >
                  <SubmitPrayerButton />
                </Box>
              </Box>
            </Container>
          </Stack>
        </Box>
        <TextPrayerContainer />
      </Container>
    </>
  );
};

export default EasterContainer;
