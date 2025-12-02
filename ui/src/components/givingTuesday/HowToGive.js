import {
  Stack,
  Link,
  Box,
  Text,
  UnorderedList,
  ListItem,
  OrderedList,
} from '@chakra-ui/react';

const HowToGive = (props) => {
  return (
    <Stack direction="column" spacing={0}>
      <Box textAlign="left">
        <Text
          color="#00328D"
          fontWeight="900"
          fontSize={['26', '40']}
          pt={7}
          fontFamily="DMserifText"
        >
          How to Give
        </Text>
      </Box>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        p={[3, 10]}
        pt={[3, 4]}
        pb={[3, 7]}
        spacing={[5, 10]}
        fontSize={{ base: '0.7rem', sm: '0.9rem', md: 'md' }}
        borderRadius="3xl"
        borderColor="white"
        background="white"
      >
        <Box alignSelf="center" w={{ base: '100%', md: '45%' }}>
          <Text
            flex="1"
            py={[3, 12]}
            ml={[3, 0]}
            mr={[3, 0]}
            pl={[5, 5]}
            pr={[3, '8vw']}
            borderColor="#C14C44"
            borderWidth={3}
            fontSize={['14', '20']}
            fontFamily="Manrope"
          >
            <b>Category Codes:</b>
            <UnorderedList>
              <OrderedList>
                <ListItem>
                  <b>2ND</b>: For second site
                </ListItem>
                <ListItem>
                  <b>LNE</b>: Local needs (CityServe, Shine, TaiPo)
                </ListItem>
              </OrderedList>
              <OrderedList>
                <ListItem>
                  <b>HMG</b>: 10 year commitment
                </ListItem>
              </OrderedList>
            </UnorderedList>
          </Text>
        </Box>
        <Stack direction="column" flex={['1', '2']} spacing={3} p={2} pt={0}>
          <Text fontSize={['14', '20']} fontFamily="Manrope">
            <b>
              When giving, please <u>always</u> leave a note in the transfer
              remark that states:
            </b>
            <br />
            GT: 2ND $XXX, LNE $XXX, HMG $XXX
          </Text>
          <Text fontSize={['14', '20']} fontFamily="Manrope">
            <b>Example Remark Note:</b>
            <br />
            GT: 2ND 1000, LNE 2000, HMG 3000
          </Text>
          <Text fontSize={['14', '20']} fontFamily="Manrope">
            Note: Please email{' '}
            <Link href="mailto:stewardship@hongkong.hmcc.net">
              <u>
                <i>stewardship@hongkong.hmcc.net</i>
              </u>
            </Link>{' '}
            with the appropriate category and amount allocations if you forgot
            to leave a remark or memo in the online giving process
          </Text>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default HowToGive;
