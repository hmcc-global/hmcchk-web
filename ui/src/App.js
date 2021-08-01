import { BrowserRouter } from "react-router-dom";
import MainContainer from "./components/MainContainer";
import { store, persistor } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Flex } from "@chakra-ui/react";
import NavBar from "./components/NavigationBar/NavBar";
import { Flex, CSSReset } from "@chakra-ui/react";

const App = () => {
  return (
    <Flex flexGrow={1} display="flex" h="100vh">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <>
              <Flex direction="column" align="center" justify="center">
                <NavBar h="12.5vh" />
                <Flex w="100%" minHeight="87.5vh">
                  <MainContainer />
                </Flex>
              </Flex>
            </>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </Flex>
  );
};

export default App;
