import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Divider, Paper, Typography, Button } from '@material-ui/core';
import VideoEmbed from '../helpers/VideoEmbed';
import AudioEmbed from '../helpers/AudioEmbed';

const styles = {
  container: {
    flex: 1 
  },
  button: {
    backgroundColor: "#282c34",
    color: "white",
  }
};

const SermonCard = props => {
  const { classes } = props;
  const [sermon, setSermon] = useState(null);
  
  const populateData = async() => {
    const { id } = props.match.params;
    const { data } = await axios.get('/api/sermons/get-sermon-by-id', {params: {id}})
    setSermon(data[0]);
  };

  useEffect(() => {
    populateData();
  }, []);

  const refreshHandler = () => {
    populateData();
  };

    // title: he.decode(sermon.title.rendered),
    // speaker: getSpeakers(sermon.wpfc_preacher, speakers),
    // datePreached: DateTime.fromSeconds(sermon.sermon_date),
    // sermonSeries: sermonSeries[sermon.wpfc_sermon_series[0]],
    // sermonDesc: sermon.sermon_description,
    // sermonAudioUrl: sermon.sermon_audio,
    // sermonAudioDuration: sermon.sermon_audio_duration,
    // sermonVideoUrl: sermon.sermon_video_url,
    // status: sermon.status

    // Can be extracted to a helper component
  return (
    <>
      {
        sermon &&
        <Paper className={classes.container}>
          <Button className={classes.button} onClick={() => refreshHandler()} >
            Refresh
          </Button>
          <Typography>
            {sermon.title}
          </Typography>
          <Typography>
            {sermon.speaker}
          </Typography>
          <Typography>
            Date: {sermon.datePreached}
          </Typography>
          <Typography>
            {sermon.sermonDesc}
          </Typography>
          <VideoEmbed videoUrl={sermon.sermonVideoUrl} />
          <Divider />
          <AudioEmbed audioUrl={sermon.sermonAudioUrl} />
        </Paper>
      }
    </>
  );
};

export default withStyles(styles)(SermonCard);