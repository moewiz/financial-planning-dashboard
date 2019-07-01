import {
  ActiveTabAction,
  CloseDrawerAction,
  DrawerActionTypes,
  FetchDrawerDataAction,
  OpenDrawerAction,
} from './drawerTypes';
import { createPayloadAction } from '../reducerHelpers';

export default class ClientActions {
  public static openDrawer = (title: string = 'client'): OpenDrawerAction =>
    createPayloadAction(DrawerActionTypes.OPEN_DRAWER, title)
  public static closeDrawer = (title = ''): CloseDrawerAction =>
    createPayloadAction(DrawerActionTypes.CLOSE_DRAWER, title)
  public static activeTab = (tabActive = ''): ActiveTabAction =>
    createPayloadAction(DrawerActionTypes.ACTIVE_TAB, tabActive)
  public static fetchDrawerData = (type = ''): FetchDrawerDataAction =>
    createPayloadAction(DrawerActionTypes.FETCH_DRAWER_DATA_REQUEST, type)
}
