import { BrowserRouter } from 'react-router-dom';
import MainContainer from './components/MainContainer';
import { store, persistor } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import NavBar from './components/NavigationBar/NavBar';
import { Flex } from '@chakra-ui/react';
import MobileNavBar from './components/NavigationBar/MobileNavBar';

const App = () => {
  return (
    <Flex
      flexGrow={1}
      display="flex"
      h="100%"
      overflow="auto"
      direction="column"
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <>
              <NavBar />
              <MainContainer />
              <MobileNavBar />
            </>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </Flex>
  );
};

export default App;
