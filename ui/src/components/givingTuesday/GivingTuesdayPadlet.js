import React from 'react';
import { Box, Stack, Text } from '@chakra-ui/react';
const GivingTuesdayPadlet = () => {
  return (
    <Stack direction="column" spacing={5}>
      <Box pt={[3, 3]} pb={[1]} pl={[3, 38]} pr={[3, 38]} textAlign="center">
        <Text
          color="#00328D"
          fontWeight="900"
          fontSize={['1.4rem', '1.875rem']}
          fontFamily="DMSerifDisplay_Italic"
        >
          Share a Prayer or Testimony
        </Text>

        <>
          <Text mt={3} fontSize={['0.7rem', 'md']}>
            Join us as we commit pray for our giving this tuesday
          </Text>
        </>
      </Box>
      <div
        className="padlet-embed"
        style={{
          border: '1px solid rgba(0,0,0,0.1)',
          borderRadius: '2px',
          boxSizing: 'border-box',
          overflow: 'hidden',
          position: 'relative',
          width: '100%',
          background: '#F4F4F4',
        }}
      >
        <p style={{ padding: 0, margin: 0 }}>
          <iframe
            src="https://padlet.com/embed/xvjjzlt0of0f2b66"
            frameBorder="0"
            allow="camera;microphone;geolocation;display-capture;clipboard-write"
            style={{
              width: '100%',
              height: '608px',
              display: 'block',
              padding: 0,
              margin: 0,
            }}
            title="Padlet Embed"
          />
        </p>
      </div>
    </Stack>
  );
};

export default GivingTuesdayPadlet;
