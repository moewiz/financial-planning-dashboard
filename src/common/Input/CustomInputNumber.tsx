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
  emptyIcon?: boolean;
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
    const { value, calculateWidth, precision: precisionProp, emptyIcon } = this.props;
    const optionalProps: { [key: string]: any } = {};
    if (calculateWidth) {
      const intValue = Number.isNaN(Number.parseInt(value, 10)) ? 0 : Number.parseInt(value, 10);
      let valueLength = intValue.toString().length;
      const precision = isNumber(precisionProp) && precisionProp >= 0 ? precisionProp : 2;
      let extraWidth = 0;
      let numberSize = 14;
      let minimum = 24;
      if (emptyIcon) {
        numberSize = valueLength < 3 ? 17 : 16;
        minimum = 24;
      } else {
        if (precision) {
          valueLength += precision;
          numberSize = valueLength < 5 ? 16 : 13;
          extraWidth += 13 + (valueLength > 7 || valueLength === 4 ? -7 : 0);
          extraWidth += valueLength === 5 ? 4 : 0;
          minimum = 50;
        } else {
          numberSize = valueLength < 5 ? 18 : 16;
          extraWidth = valueLength < 3 ? 8 : 0;
          minimum = 34;
        }
      }
      const width = valueLength * numberSize + extraWidth;

      optionalProps.style = {
        width: `${width < minimum ? minimum : width}px`,
      };
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
