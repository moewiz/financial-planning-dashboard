import React from 'react';
import { InputWrapper, InputLabel } from './styled';
import { FormikHandlers } from 'formik';
import { get, isFunction, isBoolean } from 'lodash';
import { Select } from 'antd';

interface InputProps {
  name: string;
  value: any;
  options: Array<{ value: any; label: string }>;
  // onChange: FormikHandlers['handleChange'];
  onBlur: FormikHandlers['handleBlur'];
  placeholder?: string;
  prefix?: React.ReactNode;
  autoFocus?: boolean;
  disabled?: boolean;
  ref?: React.RefObject<any>;
  handleChange?: (e: any, name?: string, value?: any) => void;
  handleBlur?: (e: React.FocusEvent | string) => void;
  setFieldValue?: (field: string, value: any) => void;
}

class CustomSelect extends React.PureComponent<InputProps> {
  public readonly myRef = React.createRef<any>();

  public focusInput = () => {
    if (get(this.myRef, 'current.focus')) {
      this.myRef.current.focus();
    }
  }

  public handleChange = (newValue: any) => {
    const { setFieldValue, name } = this.props;

    if (setFieldValue) {
      setFieldValue(name, newValue);
    }
  }

  public handleBlur = (e: React.FocusEvent | string) => {
    const { onBlur, handleBlur } = this.props;
    let value = e;

    if (isBoolean(e)) {
      value = e.toString();
    }

    onBlur(value);
    if (handleBlur && isFunction(handleBlur)) {
      handleBlur(value);
    }
  }

  public render(): JSX.Element {
    const { placeholder, options, disabled: propDisabled, ...props } = this.props;
    const disabled = propDisabled || options.length === 1;

    return (
      <InputWrapper>
        <Select {...props} onChange={this.handleChange} ref={this.myRef} onBlur={this.handleBlur} disabled={disabled}>
          {options &&
            options.length > 0 &&
            options.map((option) => (
              <Select.Option value={option.value} key={option.value}>
                {option.label}
              </Select.Option>
            ))}
        </Select>
        {placeholder && <InputLabel>{placeholder}</InputLabel>}
      </InputWrapper>
    );
  }
}

export default CustomSelect;
