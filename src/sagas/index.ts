import { all } from 'redux-saga/effects';

import AuthSaga from './auth';
import ClientSaga from './client';

export default function* rootSaga() {
  yield all([AuthSaga.authFlow(), ClientSaga.clientFlow()]);
}
