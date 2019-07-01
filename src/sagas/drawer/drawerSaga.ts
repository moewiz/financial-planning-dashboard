import { all, takeLatest, call, put } from 'redux-saga/effects';
import { get } from 'lodash';
import { AxiosResponse } from 'axios';

import { APIResponse, getAPIErrorMessage } from '../../utils/apiUtils';
import DrawerService from './drawerService';
import { DrawerActionTypes } from '../../reducers/drawer';

export default class DrawerSaga {
  public static *fetchDrawerData({ payload }: { payload: string }) {
    try {
      const type: string = payload;
      if (type) {
        const response: AxiosResponse<APIResponse> = yield call(DrawerService.fetchDrawerData);
        if (response.status === 200 && response.data.success) {
          yield put({
            type: DrawerActionTypes.FETCH_DRAWER_DATA_SUCCESS,
            payload: {
              client: get(response.data.data, 'client', []),
              partner: get(response.data.data, 'partner', []),
            },
          });
        }
      } else {
        yield put({
          type: DrawerActionTypes.FETCH_DRAWER_DATA_FAILURE,
          error: 'Missing param',
        });
      }
    } catch (error) {
      yield put({
        type: DrawerActionTypes.FETCH_DRAWER_DATA_FAILURE,
        error: getAPIErrorMessage(error),
      });
    }
  }

  public static *watchFetchDrawerData() {
    // @ts-ignore
    yield takeLatest(DrawerActionTypes.FETCH_DRAWER_DATA_REQUEST, DrawerSaga.fetchDrawerData);
  }

  public static *drawerFlow() {
    yield all([DrawerSaga.watchFetchDrawerData()]);
  }
}
