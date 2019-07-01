// Define action types
import { PayloadAction } from '../reducerTypes';
import { Record } from 'immutable';
import { RowData } from '../../components/StrategyPage/Drawer/DrawerItem';

export interface DrawerState {
  drawerOpen: boolean;
  tabActive: string;
  loading: boolean;
  page: number;
  error?: string;
  client: RowData[];
  partner?: RowData[];

  [key: string]: any;
}

export const defaultDrawerState: DrawerState = {
  drawerOpen: false,
  tabActive: '',
  page: 1,
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
  ACTIVE_TAB = 'client/ACTIVE_TAB',
  CHANGE_PAGE = 'client/CHANGE_PAGE',
  FETCH_DRAWER_DATA_REQUEST = 'client/FETCH_DRAWER_DATA_REQUEST',
  FETCH_DRAWER_DATA_SUCCESS = 'client/FETCH_DRAWER_DATA_SUCCESS',
  FETCH_DRAWER_DATA_FAILURE = 'client/FETCH_DRAWER_DATA_FAILURE',
}

export type OpenDrawerAction = PayloadAction<DrawerActionTypes.OPEN_DRAWER, string>;
export type CloseDrawerAction = PayloadAction<DrawerActionTypes.CLOSE_DRAWER, string>;
export type ChangePageAction = PayloadAction<DrawerActionTypes.CHANGE_PAGE, number>;
export type ActiveTabAction = PayloadAction<DrawerActionTypes.ACTIVE_TAB, string>;
export type FetchDrawerDataAction = PayloadAction<DrawerActionTypes.FETCH_DRAWER_DATA_REQUEST, string>;
