import ReactGA, { EventArgs } from 'react-ga';
import { isLocalhost } from '../serviceWorker';

const GOOGLE_ANALYTICS_ID: string = 'UA-137783509-1';

/**
 * Initialize Google Analytics
 */
function initializeGA(userId: string, trackingID?: string): void {
  const isDevelop = isLocalhost;
  // Set up Options
  const options = {
    userId,
  };

  return ReactGA.initialize(trackingID || GOOGLE_ANALYTICS_ID, { debug: isDevelop, gaOptions: options });
}

/**
 * Track user navigate
 */
function updatePageView(pathName?: string) {
  const path = pathName || window.location.pathname + window.location.search;
  ReactGA.pageview(path);
}

/**
 * Event - Add custom tracking event
 */
function createEvent(category: string, action: string, label?: string, value?: number): void {
  const args: EventArgs = {
    category,
    action,
    label,
    value,
  };
  return ReactGA.event(args);
}

/**
 * "Create client" button clicked
 * event_category = new_client
 * event_label = create_button_clicked
 */
function sendGAEventCreateClientButtonClicked(): void {
  return createEvent('new_client', 'create_button_clicked');
}

/**
 * New client created
 * event_category = new_client
 * event_label = client_saved
 */
function sendGAEventNewClientCreated(): void {
  return createEvent('new_client', 'client_saved');
}

export { initializeGA, sendGAEventCreateClientButtonClicked, sendGAEventNewClientCreated, createEvent, updatePageView };
