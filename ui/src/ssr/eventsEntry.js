import { renderToString } from 'react-dom/server';
import { Helmet } from 'react-helmet';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import createEmotionServer from '@emotion/server/create-instance';
import { Settings } from 'luxon';
import { ChakraProvider, Flex } from 'components';
import NavBar from 'components/NavigationBar/NavBar';
import MobileNavBar from 'components/NavigationBar/MobileNavBar';
import MainContainer from 'pages/MainContainer';
import userReducer from 'reducers/userSlice';
import { seoData } from 'pages/seo/seoData';
import {
  EVENTS_PAGE_DATA_ID,
  EventsInitialDataProvider,
} from 'pages/events/EventsInitialData';
import customTheme from 'theme';

// Must match ui/src/index.js so the server HTML and the hydrating browser agree
Settings.defaultZoneName = 'Asia/Hong_Kong';
Settings.defaultLocale = 'en-HK';

const EVENTS_PATH = '/events';

const escapeForScript = (value) =>
  JSON.stringify(value).replace(/</g, '\\u003c');

const renderEventsPage = ({ pathname, data }) => {
  const cache = createCache({ key: 'css' });
  const { renderStylesToString } = createEmotionServer(cache);
  const store = configureStore({ reducer: { user: userReducer } });

  const html = renderStylesToString(
    renderToString(
      <CacheProvider value={cache}>
        <ChakraProvider theme={customTheme}>
          <Flex
            flexGrow={1}
            display="flex"
            h="100%"
            overflow="auto"
            direction="column"
          >
            <Provider store={store}>
              <StaticRouter location={pathname}>
                <EventsInitialDataProvider data={data}>
                  <NavBar />
                  <MainContainer />
                  <MobileNavBar />
                </EventsInitialDataProvider>
              </StaticRouter>
            </Provider>
          </Flex>
        </ChakraProvider>
      </CacheProvider>
    )
  );

  // Helmet only emits its tags through renderStatic, so the JSON-LD that
  // StructuredData renders has to be collected here and spliced into <head>.
  const helmet = Helmet.renderStatic();

  return {
    html,
    dataScript: `<script id="${EVENTS_PAGE_DATA_ID}" type="application/json">${escapeForScript(
      data
    )}</script>`,
    helmetTags: helmet.script.toString(),
    seo: seoData[EVENTS_PATH],
  };
};

export { renderEventsPage };
