import ReactGA from 'react-ga';
import { isLocalhost } from '../serviceWorker';

const GOOGLE_ANALYTICS_ID: string = 'UA-137783509-1';

// Initialize Google Analytics
function initializeGASession(): void {
  const isDevelop = isLocalhost;

  return ReactGA.initialize(GOOGLE_ANALYTICS_ID, { debug: isDevelop });
}

// "Create client" button clicked
function sendGAEvent() {

}

export { initializeGASession };
