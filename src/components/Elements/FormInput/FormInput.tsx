import React, { PureComponent, createRef } from 'react';
import { FastField, Field, FieldProps } from 'formik';
import { Form, Checkbox } from 'antd';
import { Input, Password } from '../../../common/Input';
import EntryPicker from '../../../common/EntryPicker/EntryPicker';
import Select from '../../../common/Input/CustomSelect';
import CustomInputNumber from '../../../common/Input/CustomInputNumber';

interface InputProps {
  type: InputType;
  name: string;
  className?: string;
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  prefix?: React.ReactNode;
  autoFocus?: boolean;
  useNumberOnly?: boolean;
  useFastField?: boolean;
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
  calculateWidth?: boolean;
  // Select
  options?: Array<{ value: any; label: string }>;
  showSearch?: boolean;
  defaultOpen?: boolean;
}

export declare type InputType = 'text' | 'password' | 'number' | 'checkbox' | 'select' | 'date' | 'textarea';

type CustomProps = FieldProps<any> & InputProps;

class FormInput extends PureComponent<InputProps, {}> {
  protected static defaultProps = {
    placeholder: '',
  };

  private myInput = createRef<any>();

  public focusInput = () => {
    this.myInput.current.focusInput();
  }

  public render(): React.ReactNode {
    if (this.props.useFastField) {
      return <FastField {...this.props} component={this.renderFormInput} />;
    }
    return <Field {...this.props} component={this.renderFormInput} />;
  }

  private renderInputText = (props: CustomProps): React.ReactNode => {
    const { field, form, ref, useFastField, ...restProps } = props;
    const { touched, errors } = form;
    const errorMsg = touched[field.name] && errors[field.name];
    const InputComponent = restProps.type === 'password' ? Password : Input;

    return (
      <Form.Item validateStatus={errorMsg ? 'error' : ''} help={errorMsg || ''}>
        <InputComponent ref={this.myInput} {...field} {...restProps} />
      </Form.Item>
    );
  }

  private renderInputNumber = (props: CustomProps): React.ReactNode => {
    const { field, form, prefix, type, onKeyUp, handleChange, useFastField, ...restProps } = props;
    const { touched, errors, setFieldValue } = form;
    const errorMsg = touched[field.name] && errors[field.name];

    return (
      <Form.Item validateStatus={errorMsg ? 'error' : ''} help={errorMsg || ''}>
        <CustomInputNumber ref={this.myInput} {...field} {...restProps} setFieldValue={setFieldValue} />
      </Form.Item>
    );
  }

  private renderSelect = (props: CustomProps): React.ReactNode => {
    const {
      field: { onChange, ...field },
      form: { touched, errors, setFieldValue },
      type,
      options = [],
      ...restProps
    } = props;
    const errorMsg = touched[field.name] && errors[field.name];

    return (
      <Form.Item validateStatus={errorMsg ? 'error' : ''} help={errorMsg || ''}>
        <Select ref={this.myInput} {...field} {...restProps} setFieldValue={setFieldValue} options={options} />
      </Form.Item>
    );
  }

  private renderCheckbox = (props: CustomProps): React.ReactNode => {
    const { field, form, ...restProps } = props;
    const { touched, errors } = form;
    const errorMsg = touched[field.name] && errors[field.name];

    return (
      <Form.Item validateStatus={errorMsg ? 'error' : ''} help={errorMsg || ''}>
        <Checkbox {...field} {...restProps}>
          {restProps.placeholder}
        </Checkbox>
      </Form.Item>
    );
  }

  private renderDatePicker = (props: CustomProps): React.ReactNode => {
    const {
      field: { onChange, onBlur, ...field },
      form,
      type,
      ...restProps
    } = props;
    const { touched, errors, setFieldValue } = form;
    const errorMsg = touched[field.name] && errors[field.name];

    return (
      <Form.Item validateStatus={errorMsg ? 'error' : ''} help={errorMsg || ''}>
        <EntryPicker ref={this.myInput} border="none" {...field} {...restProps} setFieldValue={setFieldValue} />
      </Form.Item>
    );
  }

  private renderFormInput = (props: CustomProps): React.ReactNode => {
    const { type } = props;
    switch (type) {
      case 'text':
      case 'password':
      case 'textarea':
        return this.renderInputText(props);
      case 'number':
        return this.renderInputNumber(props);
      case 'select':
        return this.renderSelect(props);
      case 'checkbox':
        return this.renderCheckbox(props);
      case 'date':
        return this.renderDatePicker(props);
      default:
        return this.renderInputText(props);
    }
  }
}

export default FormInput;
