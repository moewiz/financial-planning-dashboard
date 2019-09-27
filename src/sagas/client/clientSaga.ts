import { all, takeLatest, call, put, delay } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { get, find } from 'lodash';

import { ClientActionTypes, FetchDataEntryPayload, UpdateDataEntryPayload } from '../../reducers/client';
import ClientService from './clientService';
import { APIResponse, getAPIErrorMessage } from '../../utils/apiUtils';
import { POSITIONS } from '../../enums/client';

export default class ClientSaga {
  public static *fetchDataEntry({ payload }: { payload: FetchDataEntryPayload }) {
    try {
      const { clientId, tabName, tagName } = payload;
      const tabNameValue = get(find(POSITIONS, ({ slug }) => slug === tabName), 'value');
      if (tabNameValue) {
        const response: AxiosResponse<APIResponse> = yield call(ClientService.fetchDataEntry, clientId, tabNameValue);
        if (response.status === 200 && response.data.success) {
          yield put({
            type: ClientActionTypes.FETCH_DATA_ENTRY_SUCCESS,
            payload: {
              clientId,
              tagName,
              tabName,
              pageData: response.data.data,
            },
          });
        }
      } else {
        yield put({
          type: ClientActionTypes.FETCH_DATA_ENTRY_FAILURE,
          error: 'Missing param',
        });
      }
    } catch (error) {
      yield put({
        type: ClientActionTypes.FETCH_DATA_ENTRY_FAILURE,
        error: getAPIErrorMessage(error),
      });
    }
  }

  public static *updateDataEntry({ payload }: { payload: UpdateDataEntryPayload }) {
    try {
      const { tagName, tabName, ...body } = payload;
      const response: AxiosResponse<APIResponse> = yield call(ClientService.updateDataEntry, body);
      if (response.status === 200 && response.data.success) {
        yield put({
          type: ClientActionTypes.UPDATE_DATA_ENTRY_SUCCESS,
          payload: {
            clientId: payload.clientId,
            tagName,
            tabName,
            pageData: response.data.data,
          },
        });
      }
    } catch (error) {
      yield put({
        type: ClientActionTypes.UPDATE_DATA_ENTRY_FAILURE,
        error: getAPIErrorMessage(error),
      });
    }
  }

  public static *redrawGraphs({ payload }: { payload: string }) {
    yield put({
      type: ClientActionTypes.TOGGLE_PROCESSING,
      payload: {
        processing: true,
        tableProcessing: payload,
      },
    });

    yield delay(3000);

    yield put({
      type: ClientActionTypes.TOGGLE_PROCESSING,
      payload: {
        processing: false,
        tableProcessing: null,
      },
    });
  }

  public static *watchFetchDataEntry() {
    // @ts-ignore
    yield takeLatest(ClientActionTypes.FETCH_DATA_ENTRY_REQUEST, ClientSaga.fetchDataEntry);
  }

  public static *watchUpdateDataEntry() {
    // @ts-ignore
    yield takeLatest(ClientActionTypes.UPDATE_DATA_ENTRY_REQUEST, ClientSaga.updateDataEntry);
  }

  public static *watchRedrawGraphs() {
    // @ts-ignore
    yield takeLatest(ClientActionTypes.REDRAW_GRAPHS, ClientSaga.redrawGraphs);
  }

  public static *clientFlow() {
    yield all([ClientSaga.watchFetchDataEntry(), ClientSaga.watchUpdateDataEntry(), ClientSaga.watchRedrawGraphs()]);
  }
}
