import { fromJS } from 'immutable';
import { Reducer } from 'redux';

import { AuthState, defaultAuthState, AuthActionTypes, AuthStateRecord } from './authTypes';
import { StandardAction } from '../reducerTypes';

export default class AuthReducer {
  public static reducer: Reducer<AuthState, StandardAction<any>> = (
    state: AuthState = AuthReducer.initialState,
    action: StandardAction<any>,
  ): AuthState => {
    switch (action.type) {
      case AuthActionTypes.VERIFY_EMAIL_REQUEST:
      case AuthActionTypes.VERIFY_EMAIL_SUCCESS:
      case AuthActionTypes.VERIFY_EMAIL_FAILURE:
        return AuthReducer.verifyEmailHandler(state, action);
      case AuthActionTypes.VERIFY_PASSWORD_REQUEST:
      case AuthActionTypes.VERIFY_PASSWORD_SUCCESS:
      case AuthActionTypes.VERIFY_PASSWORD_FAILURE:
        return AuthReducer.verifyPasswordHandler(state, action);
      case AuthActionTypes.VERIFY_OTP_REQUEST:
      case AuthActionTypes.VERIFY_OTP_SUCCESS:
      case AuthActionTypes.VERIFY_OTP_FAILURE:
        return AuthReducer.verifyOTPHandler(state, action);
      case AuthActionTypes.REFRESH_TOKEN_REQUEST:
      case AuthActionTypes.REFRESH_TOKEN_SUCCESS:
      case AuthActionTypes.REFRESH_TOKEN_FAILURE:
        return AuthReducer.refreshTokenHandler(state, action);
      default:
        return state;
    }
  }

  private static readonly initialState = new AuthStateRecord(defaultAuthState);

  // private static readonly initialState = fromJS(defaultAuthState);

  private static verifyEmailHandler(state: AuthState, action: StandardAction<any>): AuthState {
    switch (action.type) {
      case AuthActionTypes.VERIFY_EMAIL_REQUEST:
        return state.set('loading', true).set('error', '');

      case AuthActionTypes.VERIFY_EMAIL_SUCCESS:
        return state.merge(
          fromJS({
            loading: false,
            page: 2,
          }),
        );

      case AuthActionTypes.VERIFY_EMAIL_FAILURE:
        return state.set('loading', false).set('error', action.error);

      default:
        return state;
    }
  }

  private static verifyPasswordHandler(state: AuthState, action: StandardAction<any>): AuthState {
    switch (action.type) {
      case AuthActionTypes.VERIFY_PASSWORD_REQUEST:
        return state
          .set('loading', true)
          .set('error', '')
          .set('message', '');

      case AuthActionTypes.VERIFY_PASSWORD_SUCCESS:
        return state.merge(
          fromJS({
            loading: false,
            message: action.payload.message,
            page: 3,
          }),
        );

      case AuthActionTypes.VERIFY_PASSWORD_FAILURE:
        return state
          .set('loading', false)
          .set('error', action.error)
          .set('message', '');

      default:
        return state;
    }
  }

  private static verifyOTPHandler(state: AuthState, action: StandardAction<any>): AuthState {
    switch (action.type) {
      case AuthActionTypes.VERIFY_OTP_REQUEST:
        return state
          .set('loading', true)
          .set('error', '')
          .set('token', '')
          .set('refreshToken', '')
          .set('expired', '');

      case AuthActionTypes.VERIFY_OTP_SUCCESS: {
        const userId = action.payload.userId;
        const token = action.payload.token;
        const expired = action.payload.expired;
        const refreshToken = action.payload.refreshToken;

        return state.merge(
          fromJS({
            loading: false,
            message: '',
            userId,
            token,
            expired,
            refreshToken,
          }),
        );
      }

      case AuthActionTypes.VERIFY_OTP_FAILURE:
        return state.set('loading', false).set('error', action.error);

      default:
        return state;
    }
  }

  private static refreshTokenHandler(state: AuthState, action: StandardAction<any>): AuthState {
    switch (action.type) {
      case AuthActionTypes.REFRESH_TOKEN_REQUEST:
        return state
          .set('loading', true)
          .set('error', '')
          .set('token', '')
          .set('expired', '');

      case AuthActionTypes.REFRESH_TOKEN_SUCCESS: {
        const token = action.payload.token;
        const expired = action.payload.expired;

        return state.merge(
          fromJS({
            loading: false,
            message: '',
            token,
            expired,
          }),
        );
      }

      case AuthActionTypes.REFRESH_TOKEN_FAILURE:
        return state.set('loading', false).set('error', action.error);

      default:
        return state;
    }
  }
}
