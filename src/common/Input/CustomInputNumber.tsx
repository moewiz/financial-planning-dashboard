import React from 'react';
import { InputWrapper, InputLabel } from './styled';
import { InputNumber } from 'antd';
import { get, isFunction, isNumber, isEqual } from 'lodash';
import { FormikHandlers } from 'formik';

interface CustomInputNumberProps {
  name: string;
  value: any;
  error?: any;
  setFieldValue?: (field: string, value: any) => void;
  placeholder?: string;
  sign?: string;
  autoFocus?: boolean;
  precision?: number;
  customMin?: number;
  min?: number;
  calculateWidth?: boolean;
  smallInput?: boolean;
  emptyIcon?: boolean;
  ref?: React.RefObject<any>;
  setFieldTouched: (field: string, isTouched?: boolean | undefined) => void;
  handleBlur?: (e: React.FocusEvent) => void;
}

class CustomInputNumber extends React.Component<CustomInputNumberProps> {
  public readonly myRef = React.createRef<any>();


  public shouldComponentUpdate(nextProps: CustomInputNumberProps) {
    const { value, error } = this.props;
    const { value: nextValue, error: nextError } = nextProps;

    return !isEqual({ value, error }, { value: nextValue, error: nextError });
  }

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
    const { setFieldTouched, handleBlur, customMin, value, name } = this.props;

    setFieldTouched(name);

    if (handleBlur && isFunction(handleBlur)) {
      handleBlur(name);
    }

    if (customMin && value < customMin) {
      this.handleChange(customMin);
    }
  }

  public getOptionalProps = () => {
    const { value, calculateWidth, precision, emptyIcon, sign } = this.props;
    const optionalProps: { [key: string]: any } = {};
    if (calculateWidth) {
      const intValue = Number.isNaN(Number.parseInt(value, 10)) ? 0 : Number.parseInt(value, 10);
      let valueLength = intValue.toString().length;
      let extraWidth = 0;
      let numberSize = 14;
      let minimum = 24;
      if (emptyIcon) {
        numberSize = valueLength < 3 ? 14 : 13;
        minimum = 20;
      } else {
        if (precision) {
          valueLength += precision;
          numberSize = valueLength < 5 ? 15 : 13;
          extraWidth += 13 + (valueLength > 7 || valueLength === 4 ? -7 : 0);
          extraWidth += valueLength === 5 ? 4 : 0;
          minimum = 50;
        } else {
          numberSize = valueLength < 5 ? 18 : 14;
          extraWidth = valueLength < 3 ? 8 : 1;
          minimum = 30;
        }
      }
      const width = valueLength * numberSize + extraWidth;

      optionalProps.style = {
        width: `${width < minimum ? minimum : width}px`,
      };
    }

    switch (sign) {
      case 'dollar': {
        optionalProps.formatter = (valueNumber: number) => `$${valueNumber}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        optionalProps.parser = (displayValue: string) => displayValue.replace(/\$\s?|(,*)/g, '');
        break;
      }
      case 'percent': {
        optionalProps.formatter = (valueNumber: number) => `${valueNumber}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '%';
        optionalProps.parser = (displayValue: string) => displayValue.replace(/%\s?|(,*)/g, '');
        break;
      }
      default: {
        optionalProps.formatter = (valueNumber: number) => `${valueNumber}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        optionalProps.parser = (displayValue: string) => displayValue.replace(/\$\s?|(,*)/g, '');
        break;
      }
    }

    return optionalProps;
  }

  public render(): JSX.Element {
    const { placeholder, setFieldValue, calculateWidth, precision: precisionProp, customMin, ...props } = this.props;
    const precision = isNumber(precisionProp) && precisionProp >= 0 ? precisionProp : 0;
    const optionalProps: { [key: string]: any } = this.getOptionalProps();

    return (
      <InputWrapper>
        <InputNumber
          {...props}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          ref={this.myRef}
          precision={precision}
          {...optionalProps}
        />
        {placeholder && <InputLabel>{placeholder}</InputLabel>}
      </InputWrapper>
    );
  }
}

export default CustomInputNumber;
