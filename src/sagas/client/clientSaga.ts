import { all, takeLatest, call, put } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import { ClientActionTypes, FetchDataEntryPayload } from '../../reducers/client/clientTypes';
import ClientService from './clientService';
import { APIResponse, getAPIErrorMessage } from '../../utils/apiUtils';

export default class ClientSaga {
  public static *fetchDataEntry({ payload }: { payload: FetchDataEntryPayload }) {
    try {
      const { clientId, taskName, tabName } = payload;
      const response: AxiosResponse<APIResponse> = yield call(ClientService.fetchDataEntry);
      if (response.status === 200 && response.data.success) {
        yield put({
          type: ClientActionTypes.FETCH_DATA_ENTRY_SUCCESS,
          payload: {
            clientId,
            taskName,
            tabName,
            dataEntry: response.data.data,
          },
        });
      }
    } catch (error) {
      yield put({
        type: ClientActionTypes.FETCH_DATA_ENTRY_FAILURE,
        error: getAPIErrorMessage(error),
      });
    }
  }

  public static *watchFetchDataEntry() {
    // @ts-ignore
    yield takeLatest(ClientActionTypes.FETCH_DATA_ENTRY_REQUEST, ClientSaga.fetchDataEntry);
  }

  public static *clientFlow() {
    yield all([ClientSaga.watchFetchDataEntry()]);
  }
}
