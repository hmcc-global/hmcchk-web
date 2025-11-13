import { Box } from "@chakra-ui/react";

const VideoEmbed = (props) => {
  const { videoUrl } = props;
  console.log(videoUrl);
  let url = videoUrl.replace("youtu.be", "youtube.com/embed");

  return (
    <Box overflow="hidden" pb="56.25%" pos="relative" height={10}>
      <iframe
        title="video-embed"
        width="853"
        height="500"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        src={url}
      />
    </Box>
  );
};

export default VideoEmbed;
