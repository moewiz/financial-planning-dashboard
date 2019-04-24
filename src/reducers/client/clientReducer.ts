import { Reducer } from 'redux';

import { ClientState, defaultClientState, ClientStateRecord, ClientActionTypes } from './clientTypes';
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
      default:
        return state;
    }
  }

  private static readonly initialState = new ClientStateRecord(defaultClientState);

  private static fetchDataEntry(state: ClientState, action: StandardAction<any>): ClientState {
    switch (action.type) {
      case ClientActionTypes.FETCH_DATA_ENTRY_REQUEST:
        return state.set('loading', true).set('error', '');

      case ClientActionTypes.FETCH_DATA_ENTRY_SUCCESS:
        const { clientId, taskName, tabName } = action.payload;
        const clients = state.clients.map((client) => {
          if (client.clientID !== clientId) {
            return client;
          }

          return {
            ...client,
            taskList: map(client.taskList, (task) => {
              if (task.name !== taskName) {
                return task;
              }

              return {
                ...task,
                dataEntries: map(task.dataEntries, (dataEntry) => {
                  if (dataEntry.tabName !== tabName) {
                    return dataEntry;
                  }

                  return (dataEntry.tables = action.payload.dataEntry);
                }),
              };
            }),
          };
        });

        return state
          .set('clients', clients)
          .set('loading', false)
          .set('error', '');

      case ClientActionTypes.FETCH_DATA_ENTRY_FAILURE:
        return state.set('loading', false).set('error', action.error);

      default:
        return state;
    }
  }
}
