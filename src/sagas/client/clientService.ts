import ApiUtils from '../../utils/apiUtils';
import data from './strategy.json';
import current from './data.json';
import { PositionValue } from '../../enums/client';

export default class ClientService {
  public static async fetchClients(userId: string): Promise<any> {
    const url: string = `/homescreen/${userId}`;

    return ApiUtils.HTTP.get(url);
  }

  public static async fetchDataEntry(clientId: number, tabNameValue: number): Promise<any> {
    const params = [clientId, tabNameValue].join('/');
    const url: string = `/currentPosition/${params}`;

    if (tabNameValue === PositionValue.Strategy || tabNameValue === PositionValue.Current) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            status: 200,
            data: {
              data: tabNameValue === PositionValue.Current ? current : data,
              error: null,
              message: null,
              success: true,
            },
          });
        }, 1000);
      });
    }
    return ApiUtils.HTTP.get(url);
  }

  public static async updateDataEntry(formData: object): Promise<any> {
    const url: string = '/currentPosition/';

    return ApiUtils.HTTP.post(url, formData);
  }
}
