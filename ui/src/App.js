import { BrowserRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import MainContainer from './components/MainContainer';

const styles = {
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    height: '100vh'
  }
};

const App = (props) => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <BrowserRouter>
        <>
          <MainContainer />
        </>
      </BrowserRouter>
    </div>
  );
};

export default withStyles(styles)(App);
