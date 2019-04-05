import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import moment from 'moment';
import { store } from '../App';
import { AuthActions } from '../reducers/auth';
import https from 'https';

export interface RequestConfig extends AxiosRequestConfig {
  apiVersion?: string;

  [propName: string]: any;
}

class ApiUtils {
  public static BASE_URL: string = 'https://bookings.odoc.life/';
  public static API_VERSION_NONE: string = '';
  public static API_VERSION_1: string = 'v1';
  public static API_VERSION_2: string = 'v2';
  public static HTTP = axios.create({
    withCredentials: true,
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
    baseURL: ApiUtils.BASE_URL,
  });

  public static getAccessToken(): string | undefined {
    const rootState = store.getState();
    return rootState.auth && rootState.auth.get('token');
  }

  public static getExpiredAt(): number | null {
    const rootState = store.getState();
    return rootState.auth && rootState.auth.get('expired');
  }

  public static shouldRefreshToken(): boolean {
    const token = ApiUtils.getAccessToken();
    const expiredAt = ApiUtils.getExpiredAt();

    if (token && expiredAt) {
      return moment().unix() > expiredAt;
    }

    return false;
  }

  public static handleLogout() {
    return 'test';
  }
}

ApiUtils.HTTP.interceptors.request.use((extendedConfig: RequestConfig) => {
  const config: RequestConfig = Object.assign({}, extendedConfig);
  const accessToken = ApiUtils.getAccessToken() || null;

  if (ApiUtils.shouldRefreshToken()) {
    store.dispatch(AuthActions.refreshToken());
  }

  if (!config.headers.Authorization) {
    config.headers.Authorization = accessToken && `Bearer ${accessToken}`;
  }

  let endPoint;
  switch (config.apiVersion) {
    case ApiUtils.API_VERSION_2:
      endPoint = ApiUtils.BASE_URL + ApiUtils.API_VERSION_2;
      break;
    case ApiUtils.API_VERSION_NONE:
      endPoint = ApiUtils.BASE_URL.slice(0, ApiUtils.BASE_URL.lastIndexOf('/'));
      break;
    case ApiUtils.API_VERSION_1:
      endPoint = ApiUtils.BASE_URL + ApiUtils.API_VERSION_1;
    default:
      endPoint = ApiUtils.BASE_URL + ApiUtils.API_VERSION_1;
      break;
  }

  if (!config.absoluteUrl) {
    config.url = endPoint + config.url;
  } else {
    config.url = endPoint;
  }

  return config;
});

ApiUtils.HTTP.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error && error.response && error.response.status === 401) {
      ApiUtils.handleLogout();
    }
    return Promise.reject(error);
  },
);

export default ApiUtils;
