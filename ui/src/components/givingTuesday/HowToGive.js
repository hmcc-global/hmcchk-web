import {
  Stack,
  Link,
  Box,
  Text,
  UnorderedList,
  ListItem,
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
              <ListItem>GT Local</ListItem>
              <ListItem>GT Global</ListItem>
              <ListItem>GT Saturate</ListItem>
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
            GT Local Amount1, Global Amount2, Saturate Amount 3
          </Text>
          <Text fontSize={['14', '20']} fontFamily="Manrope">
            <b>Example Remark Note:</b>
            <br />
            GT Local 1000, Global 500, Saturate 300
          </Text>
          <Text fontSize={['14', '20']} fontFamily="Manrope">
            Note: Please email{' '}
            <Link href="mailto:hk@hmccglobal.org">
              <u>
                <i>hk@hmccglobal.org</i>
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
