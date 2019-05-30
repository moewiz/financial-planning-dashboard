import React from 'react';
import { InputWrapper, InputLabel } from './styled';
import { InputNumber } from 'antd';
import { get, isFunction, isNumber } from 'lodash';
import { FormikHandlers } from 'formik';

interface CustomInputNumberProps {
  name: string;
  value: any;
  setFieldValue?: (field: string, value: any) => void;
  placeholder?: string;
  autoFocus?: boolean;
  precision?: number;
  customMin?: number;
  min?: number;
  calculateWidth?: boolean;
  smallInput?: boolean;
  ref?: React.RefObject<any>;
  onBlur: FormikHandlers['handleBlur'];
  handleBlur?: (e: React.FocusEvent) => void;
}

class CustomInputNumber extends React.PureComponent<CustomInputNumberProps> {
  public readonly myRef = React.createRef<any>();

  public componentDidUpdate(
    prevProps: Readonly<CustomInputNumberProps>,
    prevState: Readonly<{}>,
    snapshot?: any,
  ): void {
    const { customMin, value } = this.props;
    if (customMin !== prevProps.customMin) {
      if (customMin && value < customMin) {
        this.handleChange(customMin);
      }
    }
  }

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
    const { onBlur, handleBlur, customMin, value } = this.props;

    onBlur(e);

    if (handleBlur && isFunction(handleBlur)) {
      handleBlur(value);
    }

    if (customMin && value < customMin) {
      this.handleChange(customMin);
    }
  }

  public getOptionalProps = () => {
    const { value, calculateWidth, smallInput, precision: precisionProp } = this.props;
    const optionalProps: { [key: string]: any } = {};
    if (calculateWidth) {
      const intValue = Number.isNaN(Number.parseInt(value, 10)) ? 0 : Number.parseInt(value, 10);
      let valueLength = intValue.toString().length;
      const precision = isNumber(precisionProp) && precisionProp >= 0 ? precisionProp : 2;
      if (precision) {
        valueLength += 1 + precision;
      }
      const numberSize = valueLength < 6 ? 15 : 13;
      // const numberSize = 14;
      const width = valueLength * numberSize;
      optionalProps.style = { width: `${width > 50 ? width : 50}px` };
    }
    if (smallInput) {
      optionalProps.size = 'small';
    }

    return optionalProps;
  }

  public render(): JSX.Element {
    const { placeholder, setFieldValue, calculateWidth, precision: precisionProp, customMin, ...props } = this.props;
    const optionalProps: { [key: string]: any } = this.getOptionalProps();
    const precision = isNumber(precisionProp) && precisionProp >= 0 ? precisionProp : 2;

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
          precision={precision}
          {...optionalProps}
        />
        {placeholder && <InputLabel>{placeholder}</InputLabel>}
      </InputWrapper>
    );
  }
}

export default CustomInputNumber;
