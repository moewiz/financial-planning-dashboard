import ApiUtils, { RequestConfig } from '../../utils/apiUtils';

export default class AuthService {
  public static async verifyEmail(email: string): Promise<any> {
    const url: string = '/auth/email';
    const data = { email };
    const config: RequestConfig = {
      apiVersion: ApiUtils.API_VERSION_1, // default v1
    };
    return ApiUtils.HTTP.post(url, data, config);
  }
  public static async verifyPassword(password: string): Promise<any> {
    const url: string = '/auth/password';
    const data = { password };
    const config: RequestConfig = {
      apiVersion: ApiUtils.API_VERSION_1, // default v1
    };
    return ApiUtils.HTTP.post(url, data, config);
  }
  public static async verifyOTP(otp: string): Promise<any> {
    const url: string = '/auth/token';
    const data = { otp };
    const config: RequestConfig = {
      apiVersion: ApiUtils.API_VERSION_1, // default v1
    };
    return ApiUtils.HTTP.post(url, data, config);
  }
  public static async refreshToken(refreshToken: string): Promise<any> {
    const url: string = '/auth/refresh';
    const config: RequestConfig = {
      apiVersion: ApiUtils.API_VERSION_1,
    };
    config.headers.Authorization = `Bearer ${refreshToken}`;

    return ApiUtils.HTTP.get(url, config);
  }
}
