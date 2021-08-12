import { BrowserRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import MainContainer from "./components/MainContainer";
import { store, persistor } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

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
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <>
              <MainContainer />
            </>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </div>
  );
};

export default withStyles(styles)(App);
