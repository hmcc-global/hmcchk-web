import { Box, Icon, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { MdOutlineSmartDisplay } from 'react-icons/md';

const SermonCard = ({ sermonData }) => {
  const [sermonTitlePrefix, setSermonTitlePrefix] = useState('');

  const pathId = useLocation().pathname.split('/').reverse()[0];

  const isSelected = pathId === sermonData.id.toString();

  useEffect(() => {
    if (sermonData.title.includes('Part')) {
      setSermonTitlePrefix(
        sermonData.sermonSeries[0].name + ' Sermon Series - '
      );
    } else {
      setSermonTitlePrefix('');
    }
  }, [sermonData]);

  const sermonCardStyle = {
    overflow: 'hidden',
    align: 'stretch',
    maxW: '100%',
  };

  return (
    <Link
      style={sermonCardStyle}
      to={{
        pathname: `/sermons/${sermonData.id}`,
        state: { sermonData: sermonData },
      }}
    >
      <Box
        display="flex"
        flexDir={'row'}
        alignItems={'center'}
        justifyContent={'flex-start'}
        gap={'1rem'}
        px={'1rem'}
        py={'0.75rem'}
        border="1px solid"
        borderColor={isSelected ? '#4A6EEB' : '#DFE7FF'}
        borderRadius={'5px'}
        bg={isSelected ? '#DFE7FF' : 'transparent'}
        _hover={{ borderColor: '#4A6EEB' }}
      >
        <Icon as={MdOutlineSmartDisplay} boxSize="2rem" color={'#4A6EEB'} />
        <VStack alignItems={'left'} spacing={'0.25rem'}>
          <Text
            fontSize={{ base: '0.75rem', md: '0.875rem' }}
            fontWeight={isSelected ? 700 : 400}
            noOfLines={2}
          >
            {sermonTitlePrefix + sermonData.title}
          </Text>
          <Text
            fontSize={{ base: '0.625rem', md: '0.75rem' }}
            color={isSelected ? 'black' : '#818181'}
            isTruncated
          >
            {'Speaker: ' + sermonData.speaker[0].name}
          </Text>
          <Text
            fontSize={{ base: '0.625rem', md: '0.75rem' }}
            color={isSelected ? 'black' : '#818181'}
            isTruncated
          >
            {'Passage: ' + sermonData.passage}
          </Text>
        </VStack>
      </Box>
    </Link>
  );
};

export default SermonCard;
