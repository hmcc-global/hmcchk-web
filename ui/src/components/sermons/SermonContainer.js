import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Box } from "@chakra-ui/react";

const SermonContainer = (props) => {
  const [sermons, setSermons] = useState([]);
  const user = useSelector((state) => state.user);

  const getData = async () => {
    try {
      const { data } = await axios.get("/api/sermons/get-sermons");
      setSermons(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    sermons && sermons.length > 0 && <Box color="white">{sermons[0].title}</Box>
    // <div className={classes.app}>
    //   <Paper className={classes.paper}>
    //     {sermons.map((s) => (
    //       <Card key={s.id}>
    //         <CardContent>
    //           <Typography
    //             className={classes.title}
    //             color="textSecondary"
    //             gutterBottom
    //           >
    //             {s.sermonSeries}
    //           </Typography>
    //           <Typography variant="h5" component="h2">
    //             {`${s.title}`}
    //           </Typography>
    //           <Typography className={classes.pos} color="textSecondary">
    //             {s.speaker[0]}
    //           </Typography>
    //           <Typography variant="body2" component="p">
    //             {s.sermonDesc}
    //           </Typography>
    //         </CardContent>
    //         <CardActions>
    //           <Button size="small">
    //             <Link to={"/sermons/" + s.id.toString()}>Learn More</Link>
    //           </Button>
    //         </CardActions>
    //       </Card>
    //     ))}
    //   </Paper>
    // </div>
  );
};

export default SermonContainer;
