import React from 'react';
import * as Yup from 'yup';
import { Row, Col } from 'antd';
import { LoginFormWrap } from './styled';
import Heading from '../Heading/Heading';
import { Formik, FormikActions } from 'formik';
import LoginWizard from './LoginWizard';
import { bindActionCreators, Dispatch } from 'redux';
import { StandardAction, RootState } from '../../reducers/reducerTypes';
import {
  AuthActions,
  CheckEmailPayload,
  CheckEmailAction,
  LoginPayload,
  LoginAction,
  OTPPayload,
  VerifyOTPAction,
} from '../../reducers/auth';
import { connect } from 'react-redux';

export interface LoginFormValues {
  email: string;
  password: string;
  code: string[] | undefined;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Enter an email')
    .required('Enter an email'),
  password: Yup.string().required('Enter a password'),
  code: Yup.array().of(Yup.string().required('Enter an OTP')),
});

interface LoginProp {
  page: number;
  loading?: boolean;
  error?: string;
  message?: string;
  verifyEmail: (payload: CheckEmailPayload) => CheckEmailAction;
  verifyPassword: (payload: LoginPayload) => LoginAction;
  verifyOTP: (payload: OTPPayload) => VerifyOTPAction;
}

const LoginForm: React.FC<LoginProp> = (props) => {
  return (
    <LoginFormWrap>
      <Row gutter={16}>
        <Col xs={{ span: 18, offset: 3 }} lg={{ span: 18, offset: 3 }}>
          {props.page !== 3 && <Heading titleText={'Sign In'} level={2} className="default" />}
          <Formik
            onSubmit={(values: LoginFormValues, actions: FormikActions<LoginFormValues>) => {
              if (values.code && values.code.length === 4) {
                props.verifyOTP({
                  otp: values.code.join(''),
                  callback: () => {
                    console.log('formik submitted')
                    actions.setSubmitting(false);
                  },
                });
              }
            }}
            initialValues={{ email: '', password: '', code: [] }}
            validationSchema={LoginSchema}
            enableReinitialize
            render={(formProps) => <LoginWizard {...props} formProps={formProps} />}
          />
        </Col>
      </Row>
    </LoginFormWrap>
  );
};

const mapStateToProps = (state: RootState) => ({
  page: state.auth.page,
  loading: state.auth.loading,
  error: state.auth.error,
  message: state.auth.message,
});

const mapDispatchToProps = (dispatch: Dispatch<StandardAction<any>>) =>
  bindActionCreators(
    {
      verifyEmail: AuthActions.verifyEmail,
      verifyPassword: AuthActions.verifyPassword,
      verifyOTP: AuthActions.verifyOTP,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginForm);
