import { withStyles } from '@material-ui/core/styles';

const styles = {
  container: {
    flex: 1
  },
  audio: {
    overflow: "hidden",
    paddingBottom: "56.25%",
    position: "relative",
    height: 0
  }
};

const AudioEmbed = props => {
  const { classes, audioUrl } = props;
  
  return (
    <div className={classes.audio}>
      <audio 
        controls
        src={audioUrl}
      />
    </div>
  );
};

export default withStyles(styles)(AudioEmbed);
