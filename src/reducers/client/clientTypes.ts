import { Record } from 'immutable';

export interface Client {
  clientID: string;
  clientName: string;
  taskList?: object[];
}

export interface ClientState {
  clients: Client[];
}

export const defaultClientState: ClientState = {
  clients: [
    {
      clientID: '123456',
      clientName: 'John Samual',
      taskList: [],
    },
  ],
};

export class ClientStateRecord extends Record(defaultClientState) implements ClientState {
  // Set the params
  constructor(props: ClientState) {
    super(props);
  }
}

// Define action types
export enum ClientActionTypes {
  FETCH_CLIENT_REQUEST = 'client/FETCH_CLIENT_REQUEST',
  FETCH_CLIENT_SUCCESS = 'client/FETCH_CLIENT_SUCCESS',
  FETCH_CLIENT_FAILURE = 'client/FETCH_CLIENT_FAILURE',
}
