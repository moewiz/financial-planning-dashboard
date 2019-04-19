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
function updatePageView(_path?: string) {
  const path = _path || window.location.pathname + window.location.search;
  ReactGA.pageview(path);
}

/**
 * Event - Add custom tracking event
 */
function Event(category: string, action: string, label?: string): void {
  const args: EventArgs = {
    category,
    action,
    label,
  };
  return ReactGA.event(args);
}

/**
 * "Create client" button clicked
 * event_category = new_client
 * event_label = create_button_clicked
 */
function sendGAEventCreateClientButtonClicked(): void {
  return Event('new_client', 'create_button_clicked');
}

/**
 * New client created
 * event_category = new_client
 * event_label = client_saved
 */
function sendGAEventNewClientCreated(): void {
  return Event('new_client', 'client_saved');
}

export { initializeGA, sendGAEventCreateClientButtonClicked, sendGAEventNewClientCreated, updatePageView };
