import React from 'react';
import { Box, Stack, Text } from '@chakra-ui/react';
const GivingTuesdayPadlet = () => {
  return (
    <Stack direction="column" spacing={5}>
      <Box pt={[3, 3]} pb={[1]} textAlign="left">
        <Text
          color="#00328D"
          fontWeight="900"
          fontSize={['26', '40']}
          fontFamily="DMserifText"
        >
          Share a Prayer
        </Text>

        <>
          <Text mt={3} fontSize={['14', '20']} fontFamily="manrope">
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
            src="https://padlet.com/embed/39jq3o6qkaak396m"
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
