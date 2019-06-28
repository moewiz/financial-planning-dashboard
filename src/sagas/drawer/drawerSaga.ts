import { all, takeLatest, call, put, select } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import { APIResponse, getAPIErrorMessage } from '../../utils/apiUtils';
import DrawerService from './drawerService';
import { DrawerActionTypes } from '../../reducers/drawer';

export default class DrawerSaga {
  public static *fetchDrawerData({ payload }: { payload: string }) {
    try {
      const type: string = payload;
      // const {} = yield select((state: RootState) => {
      //   return {
      //     clientId:
      //   }
      // });
      if (type) {
        const response: AxiosResponse<APIResponse> = yield call(DrawerService.fetchDrawerData);
        if (response.status === 200 && response.data.success) {
          yield put({
            type: DrawerActionTypes.FETCH_DRAWER_DATA_SUCCESS,
            payload: {
              // clientId,
              // tagName,
              // tabName,
              pageData: response.data.data,
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
