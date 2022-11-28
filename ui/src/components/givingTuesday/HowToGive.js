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
    <Stack
      direction="column"
      spacing={0}
      borderWidth={1}
      borderRadius="3xl"
      borderColor="white"
      background="white"
      shadow="md"
    >
      <Box textAlign="center">
        <Text
          color="#F9916B"
          fontWeight="900"
          fontSize={['1.3rem', '1.75rem']}
          pt={7}
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
      >
        <Box alignSelf="center" w={{ base: '100%', md: '45%' }}>
          <Text
            flex="1"
            py={[3, 12]}
            ml={[3, 0]}
            mr={[3, 0]}
            pl={[5, 5]}
            pr={[3, '8vw']}
            borderColor="#F9916B"
            borderWidth={3}
          >
            <b>Category Codes:</b>
            <UnorderedList>
              <ListItem>GC: Our Global Church </ListItem>
              <ListItem>LC: Our Local Church</ListItem>
            </UnorderedList>
          </Text>
        </Box>
        <Stack direction="column" flex={['1', '2']} spacing={3} p={2} pt={0}>
          <Text>
            <b>
              When giving, please <u>always</u> leave a note in the transfer
              remark that states:
            </b>
            <br />
            GT: GC Amount1, LC Amount2
          </Text>
          <Text>
            <b>Example Remark Note:</b>
            <br />
            GT: GC 1000, LC 500
          </Text>
          <Text>
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
