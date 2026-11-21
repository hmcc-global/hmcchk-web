import { BrowserRouter } from 'react-router-dom';
import MainContainer from './pages/MainContainer';
import { store, persistor } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import NavBar from 'components/NavigationBar/NavBar';
import { Flex } from 'components';
import MobileNavBar from 'components/NavigationBar/MobileNavBar';

// /events is server-rendered and must paint the same shell the server wrote, so
// it cannot wait on PersistGate's rehydration (which renders nothing until then).
const isServerRenderedPath = () =>
  window.location.pathname.replace(/\/+$/, '') === '/events';

const App = () => {
  const routes = (
    <BrowserRouter>
      <>
        <NavBar />
        <MainContainer />
        <MobileNavBar />
      </>
    </BrowserRouter>
  );

  return (
    <Flex
      flexGrow={1}
      display="flex"
      h="100%"
      overflow="auto"
      direction="column"
    >
      <Provider store={store}>
        {isServerRenderedPath() ? (
          routes
        ) : (
          <PersistGate loading={null} persistor={persistor}>
            {routes}
          </PersistGate>
        )}
      </Provider>
    </Flex>
  );
};

export default App;
