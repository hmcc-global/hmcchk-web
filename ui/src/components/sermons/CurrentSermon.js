import { useEffect, useState } from 'react';
import { Stack, Text, Box, AspectRatio, Image, Button } from '@chakra-ui/react';
import { useHistory } from 'react-router';

const headers = ['Current Series', 'HMCC is ONLINE'];

const CurrentSermon = ({ currentSermon, isOnline }) => {
  const [header, setHeader] = useState(headers[0]);
  const [sermonSeriesName, setSermonSeriesName] = useState('');
  const [sermonDesc, setSermonDesc] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (currentSermon) {
      if (isOnline) {
        setSermonSeriesName(currentSermon.sermonSeries);
        setSermonDesc(currentSermon.sermonDescription);
        setMediaUrl(currentSermon.sermonSeriesUrl);
        setHeader(headers[1]);
      } else {
        currentSermon.sermonSeries[0] &&
          setSermonSeriesName(currentSermon.sermonSeries[0].name);
        setSermonDesc(currentSermon.sermonDesc);
        setMediaUrl(
          currentSermon.sermonVideoUrl.split('/')[
            currentSermon.sermonVideoUrl.split('/').length - 1
          ]
        );
      }
    }
  }, [currentSermon, isOnline]);

  const onClickHandler = () => {
    history.push('/online');
  };

  const WatchButton = () => {
    return (
      <>
        {isOnline && (
          <>
            <div display={'flex'}></div>
            <Button onClick={onClickHandler}>Watch Now</Button>
          </>
        )}
      </>
    );
  };

  return (
    <>
      <Box
        border="4px solid #0628A3"
        boxSizing="border-box"
        borderRadius="20px"
        marginTop="20px"
        p={[4, 8]}
        paddingTop={[0, 8]}
      >
        <Stack direction={{ base: 'column', md: 'row' }}>
          <Stack
            alignItems="left"
            width="35vw"
            direction="column"
            display={{ base: 'none', md: 'flex' }}
          >
            <Text
              fontWeight="bold"
              fontSize="2em"
              color="#0628A3"
              marginTop="-10px"
            >
              {header}
            </Text>
            <Text fontWeight="bold" fontSize="2em">
              {sermonSeriesName}
            </Text>
            <Text fontSize="sm">{sermonDesc}</Text>
            <WatchButton />
          </Stack>
          <Text
            fontWeight="bold"
            fontSize="2em"
            color="#0628A3"
            display={{ base: 'flex', md: 'none' }}
            marginTop="0"
          >
            {header}
          </Text>
          <Stack alignContent="center" alignItems="center">
            <AspectRatio
              borderRadius="20px"
              width="80%"
              ratio={16 / 9}
              display={{ base: 'unset', md: 'none' }}
            >
              {isOnline ? (
                <Image src={mediaUrl} objectFit="cover" />
              ) : (
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${mediaUrl}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </AspectRatio>
          </Stack>
          <AspectRatio
            borderRadius="20px"
            width="80%"
            ratio={16 / 9}
            display={{ base: 'none', md: 'usnet' }}
          >
            {isOnline ? (
              <Image src={mediaUrl} objectFit="cover" />
            ) : (
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${mediaUrl}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </AspectRatio>
          <Stack
            alignItems="left"
            direction="column"
            display={{ base: 'flex', md: 'none' }}
          >
            <Text fontWeight="bold" fontSize="1.2em">
              {sermonSeriesName}
            </Text>
            <Text fontSize="sm" lineHeight="shorter">
              {sermonDesc}
            </Text>
            <WatchButton />
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default CurrentSermon;
