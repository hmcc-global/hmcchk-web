import React, { useState, useEffect } from 'react';
import { Box, Grid, Text, HStack, Button, Link } from '@chakra-ui/react';
import { BsDot } from 'react-icons/bs';
import TextCard from '../text-testimony/TextCard';
import { customAxios as axios } from '../../helpers/customAxios';

const WitnessHomeTextSection = () => {
  const [texts, setTexts] = useState([]);

  useEffect(() => {
    getTexts();
  }, []);

  const getTexts = async () => {
    try {
      const { data, status } = await axios.get('/api/testimony/get-published');
      if (status === 200) {
        data.forEach((wv) => {
          wv.renderDate = wv.endDate;
        });
        data.sort((a, b) => (a.renderDate > b.renderDate ? 1 : -1));
        setTexts([...data]);
      } else {
        throw Error('Something went wrong');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box w="100%">
      <HStack mt={4} mb={6} spacing="auto">
        <Box
          w={['100%', 'auto']}
          textAlign="center"
          display="flex"
          justifyContent="center"
        >
          <Text
            textStyle="dm_sans"
            size="md"
            color="#D07E78"
            fontWeight={600}
            fontSize={['1rem', '1.5rem']}
            pl={[0, 4]}
            display="flex"
          >
            HIGHLIGHT <BsDot />
            READ TESTIMONIES
          </Text>
        </Box>
        <Button
          textStyle="dm_sans"
          as={Link}
          href="/witness/testimonies/texts"
          border="2px"
          borderColor="#D07E78"
          borderRadius={20}
          color="#D07E78"
          fontSize={20}
          mr={4}
          size="lg"
          variant="outline"
          display={{ base: 'none', md: 'flex' }}
        >
          READ ALL TESTIMONIES
        </Button>
      </HStack>
      <Grid
        mr={['3', '5']}
        ml={['3', '5']}
        mt={['6', '12']}
        mb={['6', '12']}
        templateColumns={['repeat(2, 1fr)', 'repeat(3, 1fr)']}
        gap={[3, 6]}
      >
        {texts.length > 0 &&
          texts
            .slice(0, 3)
            .map((text) => <TextCard key={text.id} textData={text} />)}
      </Grid>
    </Box>
  );
};

export default WitnessHomeTextSection;
