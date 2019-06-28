import { CloseDrawerAction, DrawerActionTypes, FetchDrawerDataAction, OpenDrawerAction } from './drawerTypes';
import { createPayloadAction } from '../reducerHelpers';

export default class ClientActions {
  public static openDrawer = (title: string = 'Superannuation'): OpenDrawerAction =>
    createPayloadAction(DrawerActionTypes.OPEN_DRAWER, title)
  public static closeDrawer = (title = ''): CloseDrawerAction =>
    createPayloadAction(DrawerActionTypes.CLOSE_DRAWER, title)
  public static fetchDrawerData = (type = ''): FetchDrawerDataAction =>
    createPayloadAction(DrawerActionTypes.FETCH_DRAWER_DATA_REQUEST, type)
}
