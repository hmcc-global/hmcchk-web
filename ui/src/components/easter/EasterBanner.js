import {
  Flex,
  Center,
  Button,
  Link,
  Box
} from '@chakra-ui/react';
import { useHistory } from "react-router-dom";


const EasterBanner = () => {
  const isEasterSite = useHistory().location.pathname.includes("easter");

  return (
    <Flex
    w="100vw"
    bgImage={`url(${
        process.env.PUBLIC_URL + "/images/easter/easter-banner.gif"
    })`}
    h="6vh"
    p={2}
    bgPosition="center"
    bgSize="cover"
    justify="center"
    display={(isEasterSite) ? "none" : "flex"}
  >
    <Flex w="100vw" justify="space-around">
        <Center>
          <Link href="/easter" style={{ lineHeight: '0', textDecoration: 'none' }}>
            <Button
              h="3.5vh"
              lineHeight="0"
              w="95%"
              p={5}
              backgroundColor="rgba(0,0,0,0)"
              color="black"
              borderRadius={0}
              _hover={{
                borderBottom: "2px",
                // width: "94%"
              }}
            >
              <Box as='span' textStyle="NextSoutherlandSerif" fontSize={[10, 18]} whiteSpace="pre">
                {"CHECK OUT EASTER "}
              </Box>
              <Box as='span' textStyle="FogtwoNo5" fontSize={[15, 26]} whiteSpace="pre" marginTop={[0, 0.5]}>
                2022
              </Box>
              <Box as='span' textStyle="NextSoutherlandSerif" fontSize={[10, 18]} whiteSpace="pre">
                {" : BECAUSE "}
              </Box>
              <Box
                as='span'
                textStyle="NextSoutherlandSerif"
                fontSize={18}
                whiteSpace="pre"
                borderBottom="1px solid black"
                position="relative"
                top={2}
              >
                {"           "}
              </Box>
            </Button>
          </Link>
        </Center>
    </Flex>
  </Flex>
  )
}

export default EasterBanner;