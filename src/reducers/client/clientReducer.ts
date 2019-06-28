import { Reducer } from 'redux';

import {
  ClientState,
  defaultClientState,
  ClientStateRecord,
  ClientActionTypes,
  DataEntry,
  Tag,
  getDefaultTagList,
  Client,
} from './clientTypes';
import { StandardAction } from '../reducerTypes';
import { map } from 'lodash';

export default class ClientReducer {
  public static reducer: Reducer<ClientState, StandardAction<any>> = (
    state: ClientState = ClientReducer.initialState,
    action: StandardAction<any>,
  ): ClientState => {
    switch (action.type) {
      case ClientActionTypes.FETCH_DATA_ENTRY_REQUEST:
      case ClientActionTypes.FETCH_DATA_ENTRY_SUCCESS:
      case ClientActionTypes.FETCH_DATA_ENTRY_FAILURE:
        return ClientReducer.fetchDataEntry(state, action);
      case ClientActionTypes.UPDATE_DATA_ENTRY_REQUEST:
      case ClientActionTypes.UPDATE_DATA_ENTRY_SUCCESS:
      case ClientActionTypes.UPDATE_DATA_ENTRY_FAILURE:
        return ClientReducer.updateDataEntry(state, action);
      case ClientActionTypes.UPDATE_MARITAL_STATE:
        return ClientReducer.updateMaritalStatus(state, action);
      case ClientActionTypes.UPDATE_EMP_STATUS:
        return ClientReducer.updateEmpStatus(state, action);
      case ClientActionTypes.UPDATE_ASSETS:
        return ClientReducer.updateAssets(state, action);
      default:
        return state;
    }
  }

  private static readonly initialState = new ClientStateRecord(defaultClientState);

  private static fetchDataEntry(state: ClientState, action: StandardAction<any>): ClientState {
    switch (action.type) {
      case ClientActionTypes.FETCH_DATA_ENTRY_REQUEST:
        return state.set('loading', true).set('error', '');

      case ClientActionTypes.FETCH_DATA_ENTRY_SUCCESS: {
        return ClientReducer.updateClientDataEntry(state, action);
      }

      case ClientActionTypes.FETCH_DATA_ENTRY_FAILURE:
        return state.set('loading', false).set('error', action.error);

      default:
        return state;
    }
  }

  private static updateDataEntry(state: ClientState, action: StandardAction<any>): ClientState {
    switch (action.type) {
      case ClientActionTypes.UPDATE_DATA_ENTRY_REQUEST:
        return state.set('submitting', true).set('error', '');
      case ClientActionTypes.UPDATE_DATA_ENTRY_SUCCESS:
        return ClientReducer.updateClientDataEntry(state, action);
      case ClientActionTypes.UPDATE_DATA_ENTRY_FAILURE:
        return state.set('submitting', false).set('error', action.error);
      default:
        return state;
    }
  }

  private static updateClientDataEntry(state: ClientState, action: StandardAction<any>): ClientState {
    const { clientId, tabName, tagName } = action.payload;

    const clientIndex = state.clients.findIndex((client: Client) => client.clientId === clientId);

    // add new record for client
    if (clientIndex === -1) {
      state.clients.push({ clientId, clientName: '', tagList: getDefaultTagList() });
    }

    // update existing client record
    const clients = state.clients.map((client: Client) => {
      if (client.clientId !== clientId) {
        return client;
      }

      return {
        ...client,
        tagList: map(client.tagList, (tag: Tag) => {
          if (tag.name !== tagName) {
            return tag;
          }

          return {
            ...tag,
            dataEntries: map(tag.dataEntries, (dataEntry: DataEntry) => {
              if (dataEntry.tabName !== tabName) {
                return dataEntry;
              }

              return {
                tabName,
                pageData: action.payload.pageData,
              };
            }),
          };
        }),
      };
    });

    return state
      .set('clients', clients)
      .set('loading', false)
      .set('submitting', false)
      .set('error', '');
  }

  private static updateMaritalStatus(state: ClientState, action: StandardAction<any>): ClientState {
    return state.set('maritalStatus', action.payload);
  }

  private static updateEmpStatus(state: ClientState, action: StandardAction<any>): ClientState {
    return state.set('empStatus', action.payload);
  }

  private static updateAssets(state: ClientState, action: StandardAction<any>): ClientState {
    return state.set('assets', action.payload);
  }
}
