import { BrowserRouter } from "react-router-dom";
import MainContainer from "./components/MainContainer";
import { store, persistor } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import NavBar from "./components/NavigationBar/NavBar";
import FooterContainer from "./components/footer/FooterContainer";
import { Flex, CSSReset, VStack } from "@chakra-ui/react";

const App = () => {
  return (
    <Flex flexGrow={1} display="flex" h="100vh">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <>
              <Flex direction="column" align="center" justify="center">
                <NavBar h="12.5vh" />
                <Flex w="100vw" minHeight="87.5vh">
                  <VStack w="100vw">
                    <MainContainer />
                    <FooterContainer />
                  </VStack>
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
