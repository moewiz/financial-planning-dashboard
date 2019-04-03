import { Map, Record } from 'immutable';

import { PayloadAction } from '../reducerTypes';

export interface AuthState {
  page: number;
  loading?: boolean;
  error?: string;
  message?: string;
  token: Map<string, any>;

  [propsName: string]: any;
}

export const defaultAuthState = {
  page: 1,
  loading: false,
  error: '',
  message: '',
  token: Map({}),
};

export class AuthStateRecord extends Record(defaultAuthState) implements AuthState {
  // Set the params
  constructor(props: AuthState) {
    super(props);
  }
}

// Define action types
export enum AuthActionTypes {
  VERIFY_EMAIL_REQUEST = 'auth/VERIFY_EMAIL_REQUEST',
  VERIFY_EMAIL_SUCCESS = 'auth/VERIFY_EMAIL_SUCCESS',
  VERIFY_EMAIL_FAILURE = 'auth/VERIFY_EMAIL_FAILURE',
  VERIFY_PASSWORD_REQUEST = 'auth/VERIFY_PASSWORD_REQUEST',
  VERIFY_PASSWORD_SUCCESS = 'auth/VERIFY_PASSWORD_SUCCESS',
  VERIFY_PASSWORD_FAILURE = 'auth/VERIFY_PASSWORD_FAILURE',
  VERIFY_OTP_REQUEST = 'auth/VERIFY_OTP_REQUEST',
  VERIFY_OTP_SUCCESS = 'auth/VERIFY_OTP_SUCCESS',
  VERIFY_OTP_FAILURE = 'auth/VERIFY_OTP_FAILURE',
}

export interface CheckEmailPayload {
  email: string;
}

export interface LoginPayload {
  password: string;
  email?: string;
  message?: string;
}

export interface OTPPayload {
  otp: string;
  callback: (error?: string) => void;
}

export interface TokenPayload {
  token: string;
  refreshToken: string;
  expired?: any;
}

export type CheckEmailAction = PayloadAction<AuthActionTypes.VERIFY_EMAIL_REQUEST, CheckEmailPayload>;
export type LoginAction = PayloadAction<AuthActionTypes.VERIFY_PASSWORD_REQUEST, LoginPayload>;
export type VerifyOTPAction = PayloadAction<AuthActionTypes.VERIFY_OTP_REQUEST, OTPPayload>;
export type TokenAction = PayloadAction<AuthActionTypes.VERIFY_OTP_SUCCESS, TokenPayload>;
