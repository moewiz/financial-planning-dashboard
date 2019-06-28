import { Reducer } from 'redux';

import { StandardAction } from '../reducerTypes';
import { defaultDrawerState, DrawerActionTypes, DrawerState, DrawerStateRecord } from './drawerTypes';

export default class DrawerReducer {
  public static reducer: Reducer<DrawerState, StandardAction<any>> = (
    state: DrawerState = DrawerReducer.initialState,
    action: StandardAction<any>,
  ): DrawerState => {
    switch (action.type) {
      case DrawerActionTypes.OPEN_DRAWER:
        const title = action.payload;
        return state.set('drawerOpen', true).set('drawerTitle', title);
      case DrawerActionTypes.CLOSE_DRAWER:
        return state.set('drawerOpen', false).set('drawerTitle', '');
      default:
        return state;
    }
  }

  private static readonly initialState = new DrawerStateRecord(defaultDrawerState);
}
