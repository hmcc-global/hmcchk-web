import { BrowserRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import MainContainer from "./components/MainContainer";
import NavBar from './components/NavigationBar/NavBar';
import  FooterContainer   from "./components/footer/FooterContainer"
import {
	Flex,
	CSSReset
} from '@chakra-ui/react';

const styles = {
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    height: "100vh",
  },
};

const App = (props) => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <BrowserRouter>
        <>
        <Flex direction='column' align='center' justify='center' >
					<NavBar h='12.5vh' />
					<Flex w='100%' minHeight='87.5vh'>
          <MainContainer />
          <FooterContainer />
					</Flex>
				</Flex>
        </>
      </BrowserRouter>
    </div>
  );
};

export default withStyles(styles)(App);
