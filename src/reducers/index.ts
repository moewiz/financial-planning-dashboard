import { persistReducer, persistCombineReducers } from 'redux-persist';
import { Reducer, ReducersMapObject, Store, combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// @ts-ignore
import immutableTransform from 'redux-persist-transform-immutable';
// import { TransformConfig } from 'redux-persist-transform-immutable';

import { Reducers, LoadedState, LoadedReducers } from './reducerTypes';

// Import other reducers
import AuthReducer from './auth';

const config = {
  key: 'root',
  storage,
  whitelist: [ 'auth' ],
  transforms: [ immutableTransform() ],
};

let asyncReducers: LoadedReducers = {};
export const createRootReducer = (): Reducer => {
  // const initialReducers: ReducersMapObject = {
  //   auth: AuthReducer.reducer,
  //   ...asyncReducers,
  // } as Reducers;
  // return persistCombineReducers(config, initialReducers);
  const initialReducers = combineReducers({
    auth: AuthReducer.reducer,
    ...asyncReducers,
  });
  return persistReducer(config, initialReducers);
};

export const injectReducer = (store: Store<LoadedState>, reducers: Reducer<LoadedState>) => {
  asyncReducers = { ...asyncReducers, ...reducers };
  store.replaceReducer(createRootReducer());
};
