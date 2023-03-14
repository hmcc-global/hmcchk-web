import {
  HStack,
  VStack,
  Box,
  Button,
  Stack,
  Image,
  Link,
  Text,
  Container,
  Tag,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { BsDot } from 'react-icons/bs';
import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router';
import { customAxios as axios } from '../../helpers/customAxios';
import { parseDescription } from '../../helpers/parseDescription';
import { DateTime } from 'luxon';
import { getPrayerTopic } from './EasterPrayerModal';

const TextDetails = (props) => {
  const [text, setTexts] = useState();
  const [allTexts, setAllTexts] = useState([]);
  const currId = props.match.params.id;
  const history = useHistory();

  const getData = useCallback(async () => {
    try {
      const { data, status } = await axios.get('/api/easter/get-published');
      if (status === 200) {
        let currentText = data.find(({ id }) => id === currId);
        console.log('currentText', currentText);
        if (!currentText) {
          history.push('/404');
        }
        setAllTexts([...data]);
        setTexts(currentText);
      } else {
        throw Error('Something went wrong');
      }
    } catch (err) {
      console.log(err);
    }
  }, [currId, history]);

  useEffect(() => {
    (async () => {
      await getData();
    })();
  }, [currId, getData]);

  return (
    <>
      {text && allTexts && (
        <Container maxW="container.lg">
          <Box mb="20px" mt="20px">
            <HStack alignItems="left" alignContent="left" spacing={5}>
              <Link href="/witness/prayers/text">
                <Button
                  variant="link"
                  fontSize={32}
                  color="black"
                  justifyContent="left"
                  leftIcon={<ArrowBackIcon />}
                  display="flex"
                />
              </Link>
              <VStack alignContent="left" alignItems="left">
                <HStack>
                  <Tag
                    fontSize={'md'}
                    borderRadius="full"
                    p={3}
                    colorScheme="gray"
                  >
                    {getPrayerTopic(text.topic)}
                  </Tag>
                </HStack>
                <Stack spacing={8}>
                  <Box>
                    <VStack alignItems="left" spacing={[4, 6]} px= {3}>
                      <VStack alignItems="left">
                      <Text display={['flex']}>{text.lifestage}</Text>
                      <HStack spacing={[0, 2]}>
                        <Text display={['flex']}>{text.fullName}</Text>
                        <BsDot />
                        <Text>
                          {DateTime.fromISO(text.createdAt).toFormat(
                            'LLLL dd, yyyy'
                          )}
                        </Text>
                        </ HStack>
                      <Text>{parseDescription(text.prayer)}</Text>
                      {text.image ? <Image /> : null}
                      </VStack>
                    </VStack>
                  </Box>
                </Stack>
              </VStack>
            </HStack>
          </Box>
        </Container>
      )}
    </>
  );
};

export default TextDetails;
