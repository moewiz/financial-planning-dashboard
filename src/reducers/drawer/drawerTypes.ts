// Define action types
import { PayloadAction } from '../reducerTypes';
import { Record } from 'immutable';
import { RowData } from '../../components/StrategyPage/Drawer/DrawerItem';

export interface DrawerState {
  drawerOpen: boolean;
  drawerTitle: string;
  loading: boolean;
  error?: string;
  client: RowData[];
  partner?: RowData[];

  [key: string]: any;
}

export const defaultDrawerState: DrawerState = {
  drawerOpen: false,
  drawerTitle: '',
  loading: false,
  error: '',
  client: [],
  partner: [],
};

export class DrawerStateRecord extends Record(defaultDrawerState) implements DrawerState {
  // Set the params
  constructor(props: DrawerState) {
    super(props);
  }
}

export enum DrawerActionTypes {
  OPEN_DRAWER = 'client/OPEN_DRAWER',
  CLOSE_DRAWER = 'client/CLOSE_DRAWER',
  FETCH_DRAWER_DATA_REQUEST = 'client/FETCH_DRAWER_DATA_REQUEST',
  FETCH_DRAWER_DATA_SUCCESS = 'client/FETCH_DRAWER_DATA_SUCCESS',
  FETCH_DRAWER_DATA_FAILURE = 'client/FETCH_DRAWER_DATA_FAILURE',
}

export type OpenDrawerAction = PayloadAction<DrawerActionTypes.OPEN_DRAWER, string>;
export type CloseDrawerAction = PayloadAction<DrawerActionTypes.CLOSE_DRAWER, string>;
export type FetchDrawerDataAction = PayloadAction<DrawerActionTypes.FETCH_DRAWER_DATA_REQUEST, string>;
