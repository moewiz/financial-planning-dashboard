import React from 'react';
import { InputWrapper, InputLabel } from './styled';
import { InputNumber } from 'antd';
import { get } from 'lodash';

interface CustomInputNumberProps {
  name: string;
  value: any;
  setFieldValue?: (field: string, value: any) => void;
  placeholder?: string;
  autoFocus?: boolean;
  ref?: React.RefObject<any>;
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

    // if (handleChange && isFunction(handleChange)) {
    //   handleChange(e, name, e.currentTarget.value);
    // }
  }

  // public handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   const { onKeyUp, value } = this.props;
  //   if (onKeyUp && isFunction(onKeyUp)) {
  //     onKeyUp(e, value);
  //   }
  // }

  // public handleBlur = (e: React.FocusEvent) => {
  //   const { onBlur, handleBlur } = this.props;
  //
  //   onBlur(e);
  //   if (handleBlur && isFunction(handleBlur)) {
  //     handleBlur(e);
  //   }
  // }

  // public formatter = (value: number | string | undefined): string => {
  //   return numeral(value).format('0,0.00');
  // }
  // public parser = (displayValue: string | undefined): number => {
  //   return numeral(displayValue).value();
  // }

  public render(): JSX.Element {
    const { placeholder, setFieldValue, ...props } = this.props;

    return (
      <InputWrapper>
        <InputNumber
          {...props}
          onChange={this.handleChange}
          ref={this.myRef}
          formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          // @ts-ignore
          parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
        />
        {placeholder && <InputLabel>{placeholder}</InputLabel>}
      </InputWrapper>
    );
  }
}

export default CustomInputNumber;
