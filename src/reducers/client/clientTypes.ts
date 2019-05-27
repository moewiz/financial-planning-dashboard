import { Record } from 'immutable';
import { map } from 'lodash';
import { PayloadAction } from '../reducerTypes';

export interface Table {
  basicInformation?: object[];
  income?: object[];
  expenditure?: object[];
  assets?: object[];
  liabilities?: object[];
  insurance?: object[];
}

export interface DataEntry {
  tabName: string;
  tables: Table;
}

export interface Tag {
  name: string;
  date: string;
  dataEntries?: DataEntry[];
}

export interface Client {
  clientId: string;
  clientName: string;
  tagList?: Tag[];
}

export interface ClientState {
  clients: Client[];
  loading?: boolean;
  error?: string;
  maritalState: string;
  empStatus: string;
  assets: Array<{ refId: number; description: string; type: string }>;

  [propsName: string]: any;
}

export const getDefaultTagList = () => {
  const tagList = ['new', 'position', 'strategy', 'products', 'advice', 'done'];
  const tabList = ['current', 'strategy', 'switching', 'documents', 'presentation'];

  return map(tagList, (tag) => ({
    name: tag,
    date: '20/03/2019',
    dataEntries: map(tabList, (tab) => ({
      tabName: tab,
      tables: {},
    })),
  }));
};

export const defaultClientState: ClientState = {
  clients: [
    {
      clientId: '123456',
      clientName: 'John Samual',
      tagList: getDefaultTagList(),
    },
  ],
  assets: [],
  maritalState: '',
  empStatus: '',
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
  FETCH_CLIENTS_REQUEST = 'client/FETCH_CLIENTS_REQUEST',
  FETCH_CLIENTS_SUCCESS = 'client/FETCH_CLIENTS_SUCCESS',
  FETCH_CLIENTS_FAILURE = 'client/FETCH_CLIENTS_FAILURE',
  FETCH_DATA_ENTRY_REQUEST = 'client/FETCH_DATA_ENTRY_REQUEST',
  FETCH_DATA_ENTRY_SUCCESS = 'client/FETCH_DATA_ENTRY_SUCCESS',
  FETCH_DATA_ENTRY_FAILURE = 'client/FETCH_DATA_ENTRY_FAILURE',
  UPDATE_MARITAL_STATE = 'client/UPDATE_MARITAL_STATE',
  UPDATE_EMP_STATUS = 'client/UPDATE_EMP_STATUS',
  UPDATE_ASSETS = 'client/UPDATE_ASSETS',
}

export interface FetchDataEntryPayload {
  clientId: string;
  tagName: string;
  tabName: string;
}

export type FetchDataEntryAction = PayloadAction<ClientActionTypes.FETCH_DATA_ENTRY_REQUEST, FetchDataEntryPayload>;
export type UpdateMaritalStateAction = PayloadAction<ClientActionTypes.UPDATE_MARITAL_STATE, string>;
export type UpdateEmpStatus = PayloadAction<ClientActionTypes.UPDATE_EMP_STATUS, string>;
export type UpdateAssetsAction = PayloadAction<
  ClientActionTypes.UPDATE_ASSETS,
  Array<{ description: string; type: string; refId: number }>
>;
