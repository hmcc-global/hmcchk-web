import { Image, Box } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

const AudioPlayer = () => {
  const [audio, setAudio] = useState(
    new Audio(`${process.env.PUBLIC_URL}/assets/advent/audio.mp3`)
  );
  const [playing, setPlaying] = useState(false);

  const togglePlaying = () => {
    setPlaying(!playing);
  };

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return (
    <Box position="relative" top="0" left="0">
      <Image
        src={process.env.PUBLIC_URL + '/images/advent/adventCalendar/music.png'}
        w="66%"
        position="relative"
        top={['28vh', '19vh', '13vh', '7vh', '2vh']}
        right={'0'}
        onClick={togglePlaying}
      />
      {playing && (
        <Image
          src={
            process.env.PUBLIC_URL + '/images/advent/adventCalendar/notes.gif'
          }
          w="50%"
          position="absolute"
          right="20vw"
          bottom={['1vh', '5vh', '10vh', '11vh', '17vh']}
          transform="scaleX(-1)"
        />
      )}
    </Box>
  );
};

export default AudioPlayer;
