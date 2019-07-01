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
        const title = action.payload;
        return state.set('drawerOpen', true).set('drawerTitle', title);
      case DrawerActionTypes.CLOSE_DRAWER:
        return state.set('drawerOpen', false).set('drawerTitle', '');
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
        const { payload } = action;
        return state
          .set('loading', false)
          .set('error', '')
          .set('client', get(payload, 'client', []))
          .set('partner', get(payload, 'partner', []));
      }

      case DrawerActionTypes.FETCH_DRAWER_DATA_FAILURE:
        return state.set('loading', false).set('error', action.error);

      default:
        return state;
    }
  }
}
