import { Box } from "@chakra-ui/react";

const AudioEmbed = (props) => {
  const { audioUrl } = props;

  return (
    <Box overflow="hidden" pb="56.25%" pos="relative" h={10}>
      <audio controls src={audioUrl} />
    </Box>
  );
};

export default AudioEmbed;
