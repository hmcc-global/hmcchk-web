import { withStyles } from '@material-ui/core/styles';

const styles = {
  container: {
    flex: 1
  },
  video: {
    overflow: "hidden",
    paddingBottom: "56.25%",
    position: "relative",
    height: 0
  }
};

const VideoEmbed = props => {
  const { classes, videoUrl } = props;
  console.log(videoUrl);
  let url = videoUrl.replace("youtu.be", "youtube.com/embed");
  
  return (
    <div className={classes.video}>
      <iframe 
        title="video-embed"
        width="853"
        height="500"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        src={url}
      />
    </div>
  );
};

export default withStyles(styles)(VideoEmbed);