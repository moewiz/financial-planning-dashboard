import React from 'react';
import { InputWrapper, InputLabel } from './styled';
import { InputNumber } from 'antd';
import { get, isFunction } from 'lodash';
import { FormikHandlers } from 'formik';

interface CustomInputNumberProps {
  name: string;
  value: any;
  setFieldValue?: (field: string, value: any) => void;
  placeholder?: string;
  autoFocus?: boolean;
  calculateWidth?: boolean;
  smallInput?: boolean;
  ref?: React.RefObject<any>;
  onBlur: FormikHandlers['handleBlur'];
  handleBlur?: (e: React.FocusEvent) => void;
}

class CustomInputNumber extends React.PureComponent<CustomInputNumberProps> {
  public readonly myRef = React.createRef<any>();

  public focusInput = () => {
    if (get(this.myRef, 'current.focus')) {
      this.myRef.current.focus();
    }
  }

  public handleChange = (value: any) => {
    const { setFieldValue, name } = this.props;

    if (setFieldValue) {
      setFieldValue(name, value);
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
    const { placeholder, setFieldValue, calculateWidth, ...props } = this.props;
    const optionalProps: { [key: string]: any } = this.getOptionalProps();

    return (
      <InputWrapper>
        <InputNumber
          {...props}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          ref={this.myRef}
          formatter={(valueNumber) => `${valueNumber}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          // @ts-ignore
          parser={(displayValue) => displayValue.replace(/\$\s?|(,*)/g, '')}
          // precision={2}
          {...optionalProps}
        />
        {placeholder && <InputLabel>{placeholder}</InputLabel>}
      </InputWrapper>
    );
  }
}

export default CustomInputNumber;
