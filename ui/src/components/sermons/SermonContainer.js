import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import {
  Paper,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";
import { useSelector } from "react-redux";

const styles = (theme) => ({
  app: {
    backgroundColor: "#282c34",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "calc(10px + 2vmin)",
    color: "white",
  },
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  // paper: {
  //   display: 'flex',
  //   flexWrap: 'wrap',
  //   backgroundColor: '#000',
  //   justifyContent: 'space-between'
  // },
});

const SermonContainer = (props) => {
  const { classes } = props;
  const [sermons, setSermons] = useState([]);
  const user = useSelector((state) => state.user);

  const getData = async () => {
    try {
      const { data } = await axios.get("/api/sermons/get-sermons");
      console.log(data);
      console.log(user);
      // setSermons(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={classes.app}>
      <Paper className={classes.paper}>
        {/* {
          sermons.map(s => (
            <Card key={s.id}>
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  {s.sermonSeries}
                </Typography>
                <Typography variant="h5" component="h2">
                  {`${s.title}`}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {s.speaker[0]}
                </Typography>
                <Typography variant="body2" component="p">
                  {s.sermonDesc}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">
                  <Link to={'/sermons/' + s.id.toString()}>Learn More</Link>
                </Button>
              </CardActions>
            </Card>
          ))
        } */}
      </Paper>
    </div>
  );
};

export default withStyles(styles)(SermonContainer);
