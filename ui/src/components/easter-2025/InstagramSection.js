import {
  Button,
  Container,
  Text,
  HStack,
  OrderedList,
  ListItem,
  VStack,
} from '@chakra-ui/react';

const InstagramSection = (props) => {
  return (
    <>
      <Container
        maxW="container.lg"
        py={10}
        fontFamily="Lexend Peta"
        borderRadius={24}
        background="radial-gradient(155.2% 134.86% at 50% -7.08%, #A6EFFF 0%, #FFFFFF 32.51%, rgba(255, 255, 255, 0.00) 52.22%), radial-gradient(106.2% 92.28% at 50% 115.06%, #FFF8A6 0%, #FFFBEA 54.46%)"
        overflow="unset"
      >
        <Text fontSize={['lg', '2xl']} fontWeight={700} textAlign="center">
          WE ARE SHARING TESTIMONIES!
        </Text>
        <HStack marginTop="1em" justify="center" spacing={8}>
          <Button>#hmccredeemed2025</Button>
          <Button>@hmcc_hk</Button>
        </HStack>

        <Text
          marginTop="3em"
          fontSize={['md', 'lg']}
          fontWeight={200}
          textAlign="center"
        >
          PARTICIATE IN THE TESTIMONY CAMPAIGN
        </Text>
        <HStack justify="center" marginTop="1em">
          <OrderedList style={{ listStyleType: 'none' }}>
            <ListItem paddingLeft="2em">
              <span
                style={{
                  display: 'inline-block',
                  width: '1.5rem',
                  height: '1.5rem',
                  lineHeight: '1.5rem',
                  borderRadius: '50%',
                  backgroundColor: '#C6F4FF',
                  color: 'black',
                  textAlign: 'center',
                  marginRight: '1em',
                  marginBottom: '1em',
                }}
              >
                1
              </span>
              <span>Post a Redeemed Testimony with the following prompt:</span>
            </ListItem>
            <ListItem
              style={{
                marginLeft: '4.5em',
                listStyle: 'none',
                paddingLeft: '0',
                display: 'flex',
                alignItems: 'center',
                marginBottom: '1em',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '0.2em',
                  height: '1.5em',
                  backgroundColor: '#8AC9D8',
                  borderRadius: '0.2rem',
                  marginRight: '0.5rem',
                }}
              ></span>
              <span>Jesus redeemed me from _____, now I am _____.</span>
            </ListItem>
            <ListItem paddingLeft="2em">
              <span
                style={{
                  display: 'inline-block',
                  width: '1.5rem',
                  height: '1.5rem',
                  lineHeight: '1.5rem',
                  borderRadius: '50%',
                  backgroundColor: '#C6F4FF',
                  color: 'black',
                  textAlign: 'center',
                  marginRight: '1em',
                  marginBottom: '1em',
                }}
              >
                2
              </span>
              <span>
                Include the hashtag #HMCCREDEEMED 2025 and tag @HMCC_HK in your
                post
              </span>
            </ListItem>
          </OrderedList>
        </HStack>

        <VStack justify="center" marginTop="2em" height="50vh">
          <Button marginBottom="2em">CHECK IT OUT ON INSTAGRAM</Button>
          <iframe title="instagram" src="https://widget.taggbox.com/2163216" style={{width: "75%", height: "100%", border: "none"}}></iframe>
        </VStack>
      </Container>
    </>
  );
};

export default InstagramSection;
