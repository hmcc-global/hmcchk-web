import { Image, Box, Text } from '@chakra-ui/react';
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
      <Text
        fontFamily="LettersForLearners"
        zIndex={11}
        fontWeight="bold"
        position="absolute"
        fontSize={['2xl']}
        left="40%"
        transform="rotate(0.05turn)"
      >
        Click here ~
      </Text>
      <Image
        src={process.env.PUBLIC_URL + '/images/advent/adventCalendar/music.png'}
        w={['50%', '40%', '35%']}
        position="relative"
        top={['24vh', '5vh', '10vh', '8vh', '5vh', '0vh']}
        left={['5vw', '7vw', '12vw', '12vw', '10vw']}
        zIndex={10}
        onClick={togglePlaying}
      />
      {playing && (
        <Image
          src={
            process.env.PUBLIC_URL + '/images/advent/adventCalendar/notes.gif'
          }
          w="30%"
          position="absolute"
          zIndex={11}
          right="27vw"
          bottom={['1vh', '5vh', '10vh', '11vh', '17vh']}
          transform="scaleX(-1)"
        />
      )}
    </Box>
  );
};

export default AudioPlayer;
