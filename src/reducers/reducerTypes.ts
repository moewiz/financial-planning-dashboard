import { AuthState } from './auth';
import { Action, ReducersMapObject } from 'redux';

export interface StandardAction<T> {
  type: string;
  payload?: T;
  error?: boolean;
  meta?: any;
}

export interface RootState {
  readonly auth: AuthState;
}

export type Reducers = ReducersMapObject<RootState>;

export type LoadedState = Partial<RootState>;

export type LoadedReducers = Partial<Reducers>;

export type MetaAction<Type, Meta, Error> = Action<Type> & {
  meta?: Meta;
  error?: Error;
};

export type PayloadAction<Type, Payload, Meta = void, Error = void> = MetaAction<Type, Meta, Error> & {
  readonly payload: Payload;
};
