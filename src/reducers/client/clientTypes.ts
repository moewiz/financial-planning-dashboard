import { Record } from 'immutable';
import { PayloadAction } from '../reducerTypes';

export interface TaskList {
  name: string;
  date: string;
  dataEntries?: Array<{
    tabName: string;
    tables: Array<{ tableKey: string; tableName: string; [key: string]: any }>;
  }>;
}

export interface Client {
  clientID: string;
  clientName: string;
  taskList?: TaskList[];
}

export interface ClientState {
  clients: Client[];
  loading?: boolean;
  error?: string;

  [propsName: string]: any;
}

export const defaultClientState: ClientState = {
  clients: [
    {
      clientID: '123456',
      clientName: 'John Samual',
      taskList: [
        {
          name: 'New',
          date: '20/03/2019',
          dataEntries: [
            {
              tabName: 'Current',
              tables: [
                // { tableKey: 'basicInformation', tableName: 'Basic Information' },
                // { tableKey: 'income', tableName: 'Income' },
                // { tableKey: 'expenditure', tableName: 'Expenditure' },
                // { tableKey: 'assets', tableName: 'Assets' },
                // { tableKey: 'liabilities', tableName: 'Liabilities' },
                // { tableKey: 'insurance', tableName: 'Insurance' },
              ],
            },
          ],
        },
      ],
    },
  ],
  loading: false,
  error: '',
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
  FETCH_DATA_ENTRY_REQUEST = 'client/FETCH_DATA_ENTRY_REQUEST',
  FETCH_DATA_ENTRY_SUCCESS = 'client/FETCH_DATA_ENTRY_SUCCESS',
  FETCH_DATA_ENTRY_FAILURE = 'client/FETCH_DATA_ENTRY_FAILURE',
}

export interface FetchDataEntryPayload {
  clientId: string;
  taskName: string;
  tabName: string;
}

export type FetchDataEntryAction = PayloadAction<ClientActionTypes.FETCH_DATA_ENTRY_REQUEST, FetchDataEntryPayload>;
