// import ApiUtils, { RequestConfig } from '../../utils/apiUtils';
import superannuationDrawer from './superannuationDrawer.json';

export default class DrawerService {
  public static async fetchDrawerData(): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ status: 200, data: { data: superannuationDrawer, error: null, message: null, success: true } });
      }, 1500);
    });
  }
}
