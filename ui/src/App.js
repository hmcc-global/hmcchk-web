import { BrowserRouter } from "react-router-dom";
import MainContainer from "./components/MainContainer";
<<<<<<< HEAD
import NavBar from './components/NavigationBar/NavBar';
import  FooterContainer   from "./components/footer/FooterContainer"
import {
	Flex,
	CSSReset
} from '@chakra-ui/react';
=======
import { store, persistor } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import NavBar from "./components/NavigationBar/NavBar";
import FooterContainer from "./components/footer/FooterContainer";
import { Flex, CSSReset, VStack, Box } from "@chakra-ui/react";
>>>>>>> 80e2fd6ac471f2dc433aa8bc7b6ef92e321c85b0

const App = () => {
  return (
<<<<<<< HEAD
    <div className={classes.root}>
      <BrowserRouter>
        <>
        <Flex direction='column' align='center' justify='center' >
					<NavBar h='12.5vh' />
					<Flex direction='column' w='100%' minHeight='87.5vh'>
            <MainContainer />
					</Flex>
				</Flex>
        </>
      </BrowserRouter>
    </div>
=======
    <Flex flexGrow={1} display="flex" h="100vh" direction="column">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <>
              <NavBar />
              <MainContainer />
            </>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </Flex>
>>>>>>> 80e2fd6ac471f2dc433aa8bc7b6ef92e321c85b0
  );
};

export default App;
