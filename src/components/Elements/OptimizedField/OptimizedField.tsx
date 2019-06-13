import React, { PureComponent, createRef } from 'react';
import { Form, Checkbox } from 'antd';
import { Input, Password } from '../../../common/Input';
import EntryPicker from '../../../common/EntryPicker/EntryPicker';
import Select from '../../../common/Input/CustomSelect';
import CustomInputNumber from '../../../common/Input/CustomInputNumber';

interface OptimizedFieldProps {
  type: InputType;
  name: string;
  value: any;
  error?: any;
  setFieldValue: (field: string, value: any) => void;
  setFieldTouched: (field: string, isTouched?: boolean | undefined) => void;
  className?: string;
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  prefix?: React.ReactNode;
  autoFocus?: boolean;
  ref?: React.RefObject<any>;
  handleChange?: (e: any, name?: string, value?: any) => void;
  handleBlur?: (e: React.FocusEvent | string) => void;
  onPressEnter?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>, value: any) => void;
  // Input
  maxLength?: number;
  // CustomInputNumber Number
  min?: number;
  max?: number;
  precision?: number;
  calculateWidth?: boolean;
  sign?: string;
  // Select
  options?: Array<{ value: any; label: string }>;
  showSearch?: boolean;
  defaultOpen?: boolean;
}

export declare type InputType = 'text' | 'number' | 'checkbox' | 'select' | 'date' | 'textarea';

class OptimizedField extends PureComponent<OptimizedFieldProps, {}> {
  protected static defaultProps = {
    placeholder: '',
  };

  private myInput = createRef<any>();

  public focusInput = () => {
    this.myInput.current.focusInput();
  }

  public render = (): React.ReactNode => {
    const { type } = this.props;
    switch (type) {
      case 'text':
      case 'textarea':
        return this.renderInputText();
      case 'number':
        return this.renderInputNumber();
      case 'select':
        return this.renderSelect();
      case 'checkbox':
        return this.renderCheckbox();
      case 'date':
        return this.renderDatePicker();
      default:
        return this.renderInputText();
    }
  }

  private renderInputText = (): React.ReactNode => {
    const { ref, useFastField, error, ...restProps } = this.props;

    return (
      <Form.Item validateStatus={errorMsg ? 'error' : ''} help={errorMsg || ''}>
        <Input ref={this.myInput} {...restProps} />
      </Form.Item>
    );
  }

  private renderInputNumber = (): React.ReactNode => {
    const { prefix, type, onKeyUp, error, setFieldValue, setFieldTouched, ...restProps } = this.props;

    return (
      <Form.Item validateStatus={error ? 'error' : ''} help={error || ''}>
        <CustomInputNumber
          ref={this.myInput}
          {...restProps}
          setFieldValue={setFieldValue}
          setFieldTouched={setFieldTouched}
        />
      </Form.Item>
    );
  }

  private renderSelect = (): React.ReactNode => {
    const { setFieldValue, setFieldTouched, error, type, options = [], ...restProps } = this.props;

    return (
      <Form.Item validateStatus={error ? 'error' : ''} help={error || ''}>
        <Select
          ref={this.myInput}
          {...restProps}
          setFieldValue={setFieldValue}
          setFieldTouched={setFieldTouched}
          options={options}
        />
      </Form.Item>
    );
  }

  private renderCheckbox = (): React.ReactNode => {
    const { setFieldTouched, setFieldValue, error, ...restProps } = this.props;

    return (
      <Form.Item validateStatus={error ? 'error' : ''} help={error || ''}>
        <Checkbox {...restProps}>{restProps.placeholder}</Checkbox>
      </Form.Item>
    );
  }

  private renderDatePicker = (): React.ReactNode => {
    const { setFieldValue, error, type, ...restProps } = this.props;

    return (
      <Form.Item validateStatus={error ? 'error' : ''} help={error || ''}>
        <EntryPicker ref={this.myInput} border="none" {...restProps} setFieldValue={setFieldValue} />
      </Form.Item>
    );
  }
}

export default OptimizedField;
