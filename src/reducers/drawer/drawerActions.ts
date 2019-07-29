import {
  ActiveTabAction,
  ChangePageAction,
  CloseDrawerAction,
  DrawerActionTypes,
  DrawerPayload,
  FetchDrawerDataAction,
  FetchDrawerDataSuccessAction,
  OpenDrawerAction,
} from './drawerTypes';
import { createPayloadAction } from '../reducerHelpers';

export default class ClientActions {
  public static openDrawer = (tabActive: string = 'client'): OpenDrawerAction =>
    createPayloadAction(DrawerActionTypes.OPEN_DRAWER, tabActive)
  public static closeDrawer = (title = ''): CloseDrawerAction =>
    createPayloadAction(DrawerActionTypes.CLOSE_DRAWER, title)
  public static activeTab = (tabActive = ''): ActiveTabAction =>
    createPayloadAction(DrawerActionTypes.ACTIVE_TAB, tabActive)
  public static changePage = (page = 1): ChangePageAction => createPayloadAction(DrawerActionTypes.CHANGE_PAGE, page);
  public static fetchDrawerData = (type = ''): FetchDrawerDataAction =>
    createPayloadAction(DrawerActionTypes.FETCH_DRAWER_DATA_REQUEST, type)
  public static fetchDrawerSuccess = (drawerPayload: DrawerPayload): FetchDrawerDataSuccessAction =>
    createPayloadAction(DrawerActionTypes.FETCH_DRAWER_DATA_SUCCESS, drawerPayload)
}
