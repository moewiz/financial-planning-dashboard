import { Record } from 'immutable';
import { map } from 'lodash';
import { PayloadAction, StandardAction } from '../reducerTypes';
import { Product } from '../../components/ProductOptimizer/Drawer/DrawerProduct';

export interface Table {
  basicInformation?: object[];
  income?: object[];
  expenditure?: object[];
  assets?: object[];
  liabilities?: object[];
  insurance?: object[];
}
export interface StandardText {
  text: string;
  params?: string[];
}
export interface Strategy {
  kpi: object[];
  graph: [];
  standardText: StandardText[];
  strategies: [];
}
export interface DynamicData {
  name: string;
  superannuation: {
    value: any;
    label: string;
  };
  investments: {
    value: any;
    label: string;
  };
  loans: {
    value: any;
    label: string;
  };
}
export interface GraphData {
  xAxis: string[];
  current: number[];
  proposed: number[];
}
export interface StrategyEntry {
  superannuation?: Strategy;
  pension?: Strategy;
  investments?: Strategy;
  debt?: Strategy;
  centrelink?: Strategy;
  insurance?: Strategy;
  estatePlanning?: Strategy;
  client?: DynamicData;
  partner?: DynamicData;
  joint?: DynamicData;
  defaultFullValue?: any;
  netAssets: GraphData;
  cashflowComparisons: GraphData;
  tax: GraphData;
  retirementFunding: GraphData;
}

export interface ProductOptimizerPage {
  client: {
    current: Product[];
    proposed: Product[];
  };
  partner: {
    current: Product[];
    proposed: Product[];
  };
}

export interface DataEntry {
  tabName: string;
  pageData: any;
}

export interface Tag {
  name: string;
  date: string;
  dataEntries?: DataEntry[];
}

export interface Client {
  clientId: number;
  clientName: string;
  tagList?: Tag[];
}

export interface ClientState {
  clients: Client[];
  processingDraw: boolean;
  tableProcessing: string | null;
  loading?: boolean;
  submitting?: boolean;
  error?: string;
  maritalStatus: string;
  empStatus: string;
  assets: Array<{ refId: number; description: string; type: string }>;

  [key: string]: any;
}

export const getDefaultTagList = () => {
  const tagList = ['new', 'position', 'strategy', 'products', 'advice', 'done'];
  const tabList = ['current', 'strategy', 'switching', 'documents', 'presentation'];

  return map(tagList, (tag) => ({
    name: tag,
    date: '20/03/2019',
    dataEntries: map(tabList, (tab) => ({
      tabName: tab,
      pageData: {},
    })),
  }));
};

export const defaultClientState: ClientState = {
  clients: [
    {
      clientId: 5,
      clientName: 'John Samual',
      tagList: getDefaultTagList(),
    },
    {
      clientId: 999,
      clientName: 'Jane Empty',
      tagList: getDefaultTagList(),
    },
  ],
  assets: [],
  maritalStatus: '',
  empStatus: '',
  loading: false,
  submitting: false,
  processingDraw: false,
  tableProcessing: null,
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
  UPDATE_DATA_ENTRY_REQUEST = 'client/UPDATE_DATA_ENTRY_REQUEST',
  UPDATE_DATA_ENTRY_SUCCESS = 'client/UPDATE_DATA_ENTRY_SUCCESS',
  UPDATE_DATA_ENTRY_FAILURE = 'client/UPDATE_DATA_ENTRY_FAILURE',
  UPDATE_MARITAL_STATE = 'client/UPDATE_MARITAL_STATE',
  UPDATE_EMP_STATUS = 'client/UPDATE_EMP_STATUS',
  UPDATE_ASSETS = 'client/UPDATE_ASSETS',
  REDRAW_GRAPHS = 'client/REDRAW_GRAPHS',
  TOGGLE_PROCESSING = 'client/TOGGLE_PROCESSING',
}

export interface FetchDataEntryPayload {
  clientId: number;
  tagName: string;
  tabName: string;
}

export interface UpdateDataEntryPayload {
  clientId: number;
  soaId: number;
  inflationCPI: number;
  salaryInflation: number;
  sgcRate: number;
  benefitDefaultAge: number;

  tagName: string;
  tabName: string;
}

export type FetchDataEntryAction = PayloadAction<ClientActionTypes.FETCH_DATA_ENTRY_REQUEST, FetchDataEntryPayload>;
export type UpdateDataEntryAction = PayloadAction<
  ClientActionTypes.UPDATE_DATA_ENTRY_REQUEST,
  UpdateDataEntryPayload & Table
>;
export type UpdateMaritalStatusAction = PayloadAction<ClientActionTypes.UPDATE_MARITAL_STATE, string>;
export type UpdateEmpStatus = PayloadAction<ClientActionTypes.UPDATE_EMP_STATUS, string>;
export type UpdateAssetsAction = PayloadAction<
  ClientActionTypes.UPDATE_ASSETS,
  Array<{ description: string; type: string; refId: number }>
>;
export type RedrawGraphs = PayloadAction<
  ClientActionTypes.REDRAW_GRAPHS,
  { type: string; shouldUpdateGraphs?: boolean }
>;
