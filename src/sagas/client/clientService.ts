import ApiUtils, { RequestConfig } from '../../utils/apiUtils';
import data from './data.json';

export default class AuthService {
  public static async fetchClients(userId: string): Promise<any> {
    const url: string = `/homescreen/${userId}`;

    return ApiUtils.HTTP.get(url);
  }

  public static async fetchDataEntry(): Promise<any> {
    const url: string = '/dataEntry';

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ status: 200, data: { data, error: null, message: null, success: true } });
      }, 500);
    });
  }
}
