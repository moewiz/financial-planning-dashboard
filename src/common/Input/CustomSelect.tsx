import React from 'react';
import { InputWrapper, InputLabel } from './styled';
import { FormikHandlers } from 'formik';
import { get, isFunction, isBoolean, isNumber, isEqual } from 'lodash';
import { Select, Modal } from 'antd';
const confirm = Modal.confirm;

interface InputProps {
  name: string;
  value: any;
  error?: any;
  defaultValue?: any;
  options: Array<{ value: any; label: string }>;
  onBlur: FormikHandlers['handleBlur'];
  placeholder?: string;
  prefix?: React.ReactNode;
  autoFocus?: boolean;
  disabled?: boolean;
  ref?: React.RefObject<any>;
  handleChange?: (e: any, name?: string, value?: any) => void;
  handleBlur?: (e: React.FocusEvent | string) => void;
  setFieldValue?: (field: string, value: any) => void;
  confirmTitle?: { title: string; fieldValue: any };
}

class CustomSelect extends React.Component<InputProps> {
  public readonly myRef = React.createRef<any>();

  public shouldComponentUpdate(nextProps: InputProps) {
    const { value, error } = this.props;
    const { value: nextValue, error: nextError } = nextProps;

    return !isEqual({ value, error }, { value: nextValue, error: nextError });
  }

  public focusInput = () => {
    if (get(this.myRef, 'current.focus')) {
      this.myRef.current.focus();
    }
  }

  public componentDidMount(): void {
    const { value, defaultValue } = this.props;
    if ((value === null || value === undefined) && defaultValue) {
      this.handleChange(defaultValue);
    }
  }

  public handleChange = (newValue: any) => {
    const { setFieldValue, name } = this.props;

    if (setFieldValue) {
      setFieldValue(name, newValue);

      setTimeout(() => {
        // handle save editable cell
        this.handleBlur(newValue.toString());
      }, 0);
    }
  }

  public handleSelect = (value: any) => {
    const { confirmTitle } = this.props;
    if (confirmTitle) {
      const { fieldValue, ...confirmConfig } = confirmTitle;
      if (fieldValue && value === fieldValue) {
        confirm({
          ...confirmConfig,
          onOk: () => {
            this.handleChange(value);
          },
          onCancel: () => {},
        });
      } else {
        this.handleChange(value);
      }
    } else {
      this.handleChange(value);
    }
  }

  public handleBlur = (e: React.FocusEvent | string) => {
    const { onBlur, handleBlur } = this.props;
    let value = e;

    if (isNumber(e) || isBoolean(e)) {
      value = e.toString();
    }

    if (value) {
      onBlur(value);
      if (handleBlur && isFunction(handleBlur)) {
        handleBlur(value);
      }
    }
  }

  public render(): JSX.Element {
    const { placeholder, onBlur, options, ...props } = this.props;

    return (
      <InputWrapper>
        <Select {...props} onSelect={this.handleSelect} onBlur={this.handleBlur} ref={this.myRef}>
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
