import React from 'react';
import { PasswordWrapper, PasswordLogin, InputLabel } from './styled';
import { FormikHandlers } from 'formik';
import { isEqual } from 'lodash';

export interface InputProps {
  placeholder?: string;
  autoFocus?: boolean;
  name: string;
  value: any;
  error?: any;
  onChange: FormikHandlers['handleChange'];
  onBlur: FormikHandlers['handleBlur'];
}

class Password extends React.Component<InputProps> {
  public shouldComponentUpdate(nextProps: InputProps) {
    const { value, error } = this.props;
    const { value: nextValue, error: nextError } = nextProps;

    return !isEqual({ value, error }, { value: nextValue, error: nextError });
  }

  public render(): JSX.Element {
    const { placeholder, ...props } = this.props;

    return (
      <PasswordWrapper>
        <InputLabel className="title">{placeholder}</InputLabel>
        <PasswordLogin {...props} />
      </PasswordWrapper>
    );
  }
}

export default Password;
