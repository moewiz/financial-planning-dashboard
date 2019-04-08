import ReactGA from 'react-ga';
import { isLocalhost } from '../serviceWorker';

declare type EventCategory = 'new_client';
declare type EventAction = 'create_button_clicked' | 'client_saved';
const GOOGLE_ANALYTICS_ID: string = 'UA-137783509-1';

// Initialize Google Analytics
function initializeGASession(): void {
  const isDevelop = isLocalhost;

  return ReactGA.initialize(GOOGLE_ANALYTICS_ID, { debug: isDevelop });
}

/**
 * Send GA Event creator
 */
function sendGAEvent({ category, action }: { category: EventCategory; action: EventAction; }) {
  return ReactGA.event({
    category,
    action,
  });
}

/**
 * "Create client" button clicked
 * event_category = new_client
 * event_label = create_button_clicked
 */
function sendGAEventCreateClientButtonClicked(): void {
  return sendGAEvent({ category: 'new_client', action: 'create_button_clicked' });
}

/**
 * New client created
 * event_category = new_client
 * event_label = client_saved
 */
function sendGAEventNewClientCreated(): void {
  return sendGAEvent({ category: 'new_client', action: 'client_saved' });
}

export { initializeGASession, sendGAEventCreateClientButtonClicked, sendGAEventNewClientCreated };
