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
import { getTopics } from './home-sections/EasterHomeTextSection';

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
                fontFamily={'concrete_demo'}
                textColor="#E60053"
                fontWeight="1000"
                lineHeight="110%"
                fontSize={['20px', '40px']}
                marginBottom="15px"
              >
                J-E-S-U-S PRAYER CAMPAIGN
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
                As we enter Lent, we want to witness God work through our
                prayers! That’s why throughout Lent, we’ll be re-focusing on
                JESUS through the JESUS Prayer Campaign as we prepare our hearts
                for Easter.
              </Text>
              <Text
                w={['80%', '60%']}
                textStyle={'dm_sans'}
                fontWeight="800"
                textColor="#000000"
                fontSize={['14px', '18px']}
                marginBottom="15px"
                textAlign="center"
              >
                Please feel free to lift up a prayer for whatever God is putting
                on your heart.
              </Text>
              <Text
                w={['80%', '60%']}
                textStyle={'dm_sans'}
                fontWeight="500"
                textColor="#000000"
                fontSize={['14px', '18px']}
                marginBottom="15px"
                marginTop="15px"
                textAlign="center"
              >
                This week we will be praying for:
              </Text>
              <Text
                textStyle={'dm_sans'}
                textColor="#E60053"
                fontWeight="700"
                fontSize={['20px', '27px']}
                marginBottom="15px"
              >
                {getTopics()}
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
