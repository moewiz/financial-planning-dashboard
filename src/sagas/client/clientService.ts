import ApiUtils from '../../utils/apiUtils';
import current from '../../demo_jsons/step_1a.json';
import strategy from '../../demo_jsons/step_2a.json';
import updatedStrategy from '../../demo_jsons/step_2f.json';
import productOptimizer from '../../demo_jsons/step_3a.json';
import { PositionValue } from '../../enums/client';

export default class ClientService {
  public static async fetchClients(userId: string): Promise<any> {
    const url: string = `/homescreen/${userId}`;

    return ApiUtils.HTTP.get(url);
  }

  public static async fetchDataEntry(clientId: number, tabNameValue: number): Promise<any> {
    const params = [clientId, tabNameValue].join('/');
    const url: string = `/currentPosition/${params}`;

    // TODO we use the default data for Demo
    let data: any;
    switch (tabNameValue) {
      case PositionValue.Current:
        data = current;
        break;
      case PositionValue.Strategy:
        data = strategy;
        break;
      case PositionValue.ProductOptimizer:
        data = productOptimizer;
        break;
      case PositionValue.Documents:
        data = productOptimizer;
        break;

      default:
        break;
    }
    if (data) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            status: 200,
            data: {
              data,
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

  public static async demoUpdateStrategyPage(): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: 200,
          data: {
            data: updatedStrategy,
            error: null,
            message: null,
            success: true,
          },
        });
      }, 0);
    });
  }
}
