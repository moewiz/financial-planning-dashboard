import { Reducer } from 'redux';

import { ClientState, defaultClientState, ClientStateRecord } from './clientTypes';
import { StandardAction } from '../reducerTypes';

export default class ClientReducer {
  public static reducer: Reducer<ClientState, StandardAction<any>> = (
    state: ClientState = ClientReducer.initialState,
    action: StandardAction<any>,
  ): ClientState => {
    switch (action.type) {
      default:
        return state;
    }
  }

  private static readonly initialState = new ClientStateRecord(defaultClientState);
}
