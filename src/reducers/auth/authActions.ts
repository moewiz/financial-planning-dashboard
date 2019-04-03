import {
  AuthActionTypes,
  LoginPayload,
  LoginAction,
  TokenPayload,
  TokenAction,
  CheckEmailAction,
  CheckEmailPayload,
  OTPPayload,
  VerifyOTPAction,
  RefreshTokenAction,
} from './authTypes';
import { createPayloadAction } from '../reducerHelpers';

export default class AuthActions {
  public static verifyEmail = (payload: CheckEmailPayload): CheckEmailAction =>
    createPayloadAction(AuthActionTypes.VERIFY_EMAIL_REQUEST, payload)

  public static verifyPassword = (payload: LoginPayload): LoginAction =>
    createPayloadAction(AuthActionTypes.VERIFY_PASSWORD_REQUEST, payload)

  public static verifyOTP = (payload: OTPPayload): VerifyOTPAction =>
    createPayloadAction(AuthActionTypes.VERIFY_OTP_REQUEST, payload)

  public static verifyOTPCompleted = (payload: TokenPayload): TokenAction =>
    createPayloadAction(AuthActionTypes.VERIFY_OTP_SUCCESS, payload)

  public static refreshToken = (): RefreshTokenAction => createPayloadAction(AuthActionTypes.REFRESH_TOKEN_REQUEST, {});

  public static refreshTokenCompleted = (payload: TokenPayload): TokenAction =>
    createPayloadAction(AuthActionTypes.REFRESH_TOKEN_SUCCESS, payload)
}
