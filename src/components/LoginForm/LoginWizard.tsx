import React from 'react';
import posed, { PoseGroup } from 'react-pose';
import { Form as Formk, FormikProps } from 'formik';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import {
  CheckEmailAction,
  CheckEmailPayload,
  LoginPayload,
  LoginAction,
  OTPPayload,
  VerifyOTPAction,
} from '../../reducers/auth';

const EmailAnimation = posed.div({
  enter: {
    x: 0,
    transition: { duration: 300 },
  },
  exit: {
    x: -500,
  },
});
const PasswordAnimation = posed.div({
  enter: {
    x: 0,
    transition: { duration: 300 },
  },
  exit: {
    x: ({ isMoveToRight }: { isMoveToRight: boolean }) => {
      return isMoveToRight ? 500 : -500;
    },
  },
});
const VerifyCodeAnimation = posed.div({
  enter: {
    x: 0,
    transition: { duration: 300 },
  },
  exit: {
    x: 500,
  },
});

export interface LoginFormValues {
  email: string;
  password: string;
  code: string[] | undefined;
}

interface LoginProp {
  page: number;
  loading?: boolean;
  error?: string;
  message?: string;
  formProps: FormikProps<LoginFormValues>;
  verifyEmail: (payload: CheckEmailPayload) => CheckEmailAction;
  verifyPassword: (payload: LoginPayload) => LoginAction;
  verifyOTP: (payload: OTPPayload) => VerifyOTPAction;
}

interface LoginState {
  isMoveToRight: boolean;
}

class LoginWizard extends React.PureComponent<LoginProp, LoginState> {
  public readonly state = {
    isMoveToRight: true,
  };

  public render(): React.ReactNode {
    const { page, loading = false, error, formProps, message } = this.props;
    const { isMoveToRight } = this.state;

    return (
      <Formk className="login-form">
        <PoseGroup isMoveToRight={isMoveToRight}>
          {page === 1 && (
            <EmailAnimation key="1">
              <Page1
                loading={loading}
                formProps={formProps}
                onSubmit={this.verifyEmail}
                error={error}
              />
            </EmailAnimation>
          )}
          {page === 2 && (
            <PasswordAnimation key="2">
              <Page2
                loading={loading}
                formProps={formProps}
                onSubmit={this.verifyPassword}
                error={error}
              />
            </PasswordAnimation>
          )}
          {page === 3 && (
            <VerifyCodeAnimation key="3">
              <Page3
                loading={loading}
                formProps={formProps}
                onSubmit={formProps.submitForm}
                message={message}
                error={error}
              />
            </VerifyCodeAnimation>
          )}
        </PoseGroup>
      </Formk>
    );
  }

  public componentWillUpdate(nextProps: LoginProp, nextState: LoginState) {
    const { page: nextPage } = nextProps;
    const { page } = this.props;

    if (page === 1 && nextPage === 2) {
      this.setMoveToRight(true);
    }
    if (page === 2 && nextPage === 3) {
      this.setMoveToRight(false);
    }
    if (page === 3 && nextPage === 2) {
      this.setMoveToRight(false);
    }
    if (page === 2 && nextPage === 1) {
      this.setMoveToRight(true);
    }
  }

  private setMoveToRight = (isMoveToRight: boolean) => {
    this.setState({ isMoveToRight });
  }

  private verifyEmail = () => {
    const { formProps, verifyEmail } = this.props;
    const {
      values: { email },
    } = formProps;
    if (email) {
      verifyEmail({ email });
    }
  }

  private verifyPassword = () => {
    const { formProps, verifyPassword } = this.props;
    const {
      values: { email, password },
    } = formProps;
    if (email && password) {
      verifyPassword({ email, password });
    }
  }
}

export default LoginWizard;
