import { all, takeLatest, call, put } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { get, isFunction } from 'lodash-es';

import { AuthActionTypes, LoginPayload, CheckEmailPayload, OTPPayload, AuthActions } from '../../reducers/auth';
import AuthService from './authService';

interface APIResponse {
  data: string;
  error: string;
  message: string;
  success: boolean;
}

function getErrorMessage(error: any, defaultMessage: string = 'Internal server error') {
  return get(error, 'response.data.error', defaultMessage);
}

export default class AuthSaga {
  public static *verifyEmail({ payload }: { payload: CheckEmailPayload }) {
    try {
      const { email } = payload;
      const response: AxiosResponse<APIResponse> = yield call(AuthService.verifyEmail, email);
      if (response.status === 200 && response.data.success) {
        yield put({
          type: AuthActionTypes.VERIFY_EMAIL_SUCCESS,
        });
      }
    } catch (error) {
      yield put({
        type: AuthActionTypes.VERIFY_EMAIL_FAILURE,
        error: getErrorMessage(error),
      });
    }
  }

  public static *verifyPassword({ payload }: { payload: LoginPayload }) {
    try {
      const { email, password } = payload;
      const response: AxiosResponse<APIResponse> = yield call(AuthService.verifyPassword, password);
      if (response.status === 200 && response.data.success) {
        yield put({
          type: AuthActionTypes.VERIFY_PASSWORD_SUCCESS,
          payload: {
            message: response.data.message,
          },
        });
      }
    } catch (error) {
      yield put({
        type: AuthActionTypes.VERIFY_PASSWORD_FAILURE,
        error: getErrorMessage(error),
      });
    }
  }

  public static *verifyOTP({ payload }: { payload: OTPPayload }) {
    const { otp, callback } = payload;
    try {
      const response: AxiosResponse<APIResponse> = yield call(AuthService.verifyOTP, otp);
      if (response.status === 200 && response.data.success) {
        yield put(
          AuthActions.verifyOTPCompleted({
            token: 'test-token',
            refreshToken: 'refresh-token',
            expired: new Date(),
          }),
        );
      }
      if (callback && isFunction(callback)) {
        callback();
      }
    } catch (error) {
      const errorMsg = getErrorMessage(error);
      yield put({
        type: AuthActionTypes.VERIFY_OTP_FAILURE,
        error: errorMsg,
      });
      if (callback && isFunction(callback)) {
        callback(errorMsg);
      }
    }
  }

  public static *watchVerifyEmail() {
    // @ts-ignore
    yield takeLatest(AuthActionTypes.VERIFY_EMAIL_REQUEST, AuthSaga.verifyEmail);
  }

  public static *watchVerifyPassword() {
    // @ts-ignore
    yield takeLatest(AuthActionTypes.VERIFY_PASSWORD_REQUEST, AuthSaga.verifyPassword);
  }

  public static *watchVerifyOTP() {
    // @ts-ignore
    yield takeLatest(AuthActionTypes.VERIFY_OTP_REQUEST, AuthSaga.verifyOTP);
  }

  public static *authFlow() {
    yield all([AuthSaga.watchVerifyEmail(), AuthSaga.watchVerifyPassword(), AuthSaga.watchVerifyOTP()]);
  }
}
