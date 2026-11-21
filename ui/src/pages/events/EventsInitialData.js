import { createContext, useContext } from 'react';

export const EVENTS_PAGE_DATA_ID = 'events-page-data';

const EventsInitialDataContext = createContext(null);

let pageData;
let isPageDataRead = false;

// Read once per page load so the value stays referentially stable across renders
const readEventsPageData = () => {
  if (isPageDataRead) return pageData;
  isPageDataRead = true;
  pageData = null;

  const element =
    typeof document === 'undefined'
      ? null
      : document.getElementById(EVENTS_PAGE_DATA_ID);

  if (element) {
    try {
      pageData = JSON.parse(element.textContent);
    } catch (err) {
      pageData = null;
    }
  }

  return pageData;
};

export const EventsInitialDataProvider = ({ data, children }) => (
  <EventsInitialDataContext.Provider value={data}>
    {children}
  </EventsInitialDataContext.Provider>
);

// Server render passes the data through context; in the browser it is read from
// the JSON script tag the server wrote into the page.
export const useEventsInitialData = () => {
  const provided = useContext(EventsInitialDataContext);
  return provided ?? readEventsPageData();
};
