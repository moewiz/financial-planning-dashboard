import React from 'react';
import { InputWrapper, InputLogin, InputLabel } from './styled';
import { FormikHandlers } from 'formik';
import { get, isFunction } from 'lodash';

interface InputProps {
  name: string;
  value: any;
  onChange: FormikHandlers['handleChange'];
  onBlur: FormikHandlers['handleBlur'];
  placeholder?: string;
  prefix?: React.ReactNode;
  autoFocus?: boolean;
  smallInput?: boolean;
  calculateWidth?: boolean;
  useNumberOnly?: boolean;
  ref?: React.RefObject<any>;
  handleChange?: (e: any, name?: string, value?: any) => void;
  handleBlur?: (e: React.FocusEvent) => void;
  onPressEnter?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>, value: any) => void;
}

class Input extends React.PureComponent<InputProps> {
  public readonly myRef = React.createRef<any>();

  public focusInput = () => {
    if (get(this.myRef, 'current.focus')) {
      this.myRef.current.focus();
    }
  }

  public handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { useNumberOnly, onChange, handleChange, name } = this.props;
    if (useNumberOnly) {
      const mustANumber = !isNaN(Number(e.currentTarget.value));
      if (mustANumber) {
        onChange(e);
      }
    } else {
      onChange(e);
    }
    if (handleChange && isFunction(handleChange)) {
      handleChange(e, name, e.currentTarget.value);
    }
  }

  public handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { onKeyUp, value } = this.props;
    if (onKeyUp && isFunction(onKeyUp)) {
      onKeyUp(e, value);
    }
  }

  public handleBlur = (e: React.FocusEvent) => {
    const { onBlur, handleBlur } = this.props;

    onBlur(e);
    if (handleBlur && isFunction(handleBlur)) {
      handleBlur(e);
    }
  }

  public getOptionalProps = () => {
    const { value, calculateWidth, smallInput } = this.props;
    const optionalProps: { [key: string]: any } = {};
    let valueLength = 1;
    if (calculateWidth) {
      valueLength = value && value.toString().length ? value.toString().length + 1 : 1;
      const numberSize = valueLength > 3 ? 14 : 15;
      const width = valueLength * numberSize;
      optionalProps.style = { width: `${width > 36 ? width : 36}px` };
    }
    if (smallInput) {
      optionalProps.size = 'small';
    }

    return optionalProps;
  }

  public render(): JSX.Element {
    const {
      placeholder,
      onChange,
      onKeyUp,
      useNumberOnly,
      handleBlur,
      smallInput,
      calculateWidth,
      ...props
    } = this.props;
    const optionalProps: { [key: string]: any } = this.getOptionalProps();

    return (
      <InputWrapper>
        <InputLogin
          {...props}
          ref={this.myRef}
          onChange={this.handleChange}
          onKeyUp={this.handleKeyUp}
          onBlur={this.handleBlur}
          {...optionalProps}
        />
        {placeholder && <InputLabel>{placeholder}</InputLabel>}
      </InputWrapper>
    );
  }
}

export default Input;
