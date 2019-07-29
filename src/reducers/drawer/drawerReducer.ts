import { Reducer } from 'redux';
import { get } from 'lodash';

import { StandardAction } from '../reducerTypes';
import { defaultDrawerState, DrawerActionTypes, DrawerState, DrawerStateRecord } from './drawerTypes';

export default class DrawerReducer {
  public static reducer: Reducer<DrawerState, StandardAction<any>> = (
    state: DrawerState = DrawerReducer.initialState,
    action: StandardAction<any>,
  ): DrawerState => {
    switch (action.type) {
      case DrawerActionTypes.OPEN_DRAWER:
        return state.set('drawerOpen', true).set('tabActive', action.payload).set('page', 1);
      case DrawerActionTypes.CLOSE_DRAWER:
        return state.set('drawerOpen', false).set('tabActive', '').set('page', 1);
      case DrawerActionTypes.ACTIVE_TAB:
        return state.set('activeTab', action.payload).set('page', 1);
      case DrawerActionTypes.CHANGE_PAGE:
        return state.set('page', action.payload);
      case DrawerActionTypes.FETCH_DRAWER_DATA_REQUEST:
      case DrawerActionTypes.FETCH_DRAWER_DATA_SUCCESS:
      case DrawerActionTypes.FETCH_DRAWER_DATA_FAILURE:
        return DrawerReducer.fetchDrawerData(state, action);
      default:
        return state;
    }
  }

  private static readonly initialState = new DrawerStateRecord(defaultDrawerState);

  private static fetchDrawerData(state: DrawerState, action: StandardAction<any>): DrawerState {
    switch (action.type) {
      case DrawerActionTypes.FETCH_DRAWER_DATA_REQUEST:
        return state.set('loading', true).set('error', '');

      case DrawerActionTypes.FETCH_DRAWER_DATA_SUCCESS: {
        return state
          .set('loading', false)
          .set('error', '')
          .set('client', get(action.payload, 'client', {}))
          .set('partner', get(action.payload, 'partner', {}));
      }

      case DrawerActionTypes.FETCH_DRAWER_DATA_FAILURE:
        return state.set('loading', false).set('error', action.error);

      default:
        return state;
    }
  }
}
