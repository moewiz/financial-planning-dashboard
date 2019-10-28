import React, { CSSProperties, PureComponent, useEffect, useState } from 'react';
import { get, isEqual } from 'lodash';
import { InputNumber } from 'antd';

interface NewInputNumberProps {
  value: any;
  onChange: (value: any) => void;
  options?: any;
  dollar?: boolean;
  calculateWidth?: boolean;
  disabled?: boolean;
  allowEmpty?: boolean;
}

interface NewInputNumberState {
  value: any;
}

const hideStyles: CSSProperties = {
  position: 'absolute',
  height: 0,
  overflow: 'hidden',
  whiteSpace: 'pre',
  fontSize: 13,
  fontWeight: 600,
};

interface AutoScalingInputProps {
  className: string;
  onChange: (value: number | undefined) => void;
  value: any;
  disabled?: boolean;
  options?: any;
  optionalProps: { [key: string]: any };
}

const AutoScalingInputNumber = (props: AutoScalingInputProps) => {
  const { onChange, value, disabled, options, optionalProps } = props;
  const [inputWidth, setInputWidth] = useState();
  const hideRef = React.createRef<HTMLSpanElement>();
  const inputNumber = React.createRef();

  useEffect(() => {
    if (inputNumber && hideRef && hideRef.current) {
      hideRef.current.textContent = get(inputNumber, 'current.inputNumberRef.input.value');
      setInputWidth(hideRef.current.offsetWidth + 6 + 'px');
    }
  }, [value]);

  return (
    <>
      <span style={hideStyles} ref={hideRef} />
      <InputNumber
        onChange={onChange}
        value={value}
        className={'edit-cell'}
        disabled={disabled}
        {...optionalProps}
        {...options}
        ref={inputNumber}
        style={{ width: inputWidth }}
      />
    </>
  );
};

class NewInputNumber extends PureComponent<NewInputNumberProps, NewInputNumberState> {
  constructor(props: NewInputNumberProps) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  public componentWillReceiveProps(nextProps: Readonly<NewInputNumberProps>, nextContext: any): void {
    if (!isEqual(this.props.value, nextProps.value)) {
      this.setState({ value: nextProps.value });
    }
  }

  public onChange = (value: number | undefined) => {
    const { onChange } = this.props;

    this.setState({ value });
    onChange(value);
  }

  public render() {
    const { options, dollar, calculateWidth, disabled } = this.props;
    const { value: stateValue } = this.state;
    let value = stateValue ? stateValue : 0;
    if (options && options.allowEmpty) {
      value = stateValue;
    }
    const optionalProps: { [key: string]: any } = {};

    optionalProps.precision = 0;
    if (dollar) {
      optionalProps.formatter = (valueNumber: number) => `$${valueNumber}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      optionalProps.parser = (displayValue: string) => displayValue.replace(/\$\s?|(,*)/g, '');
    } else {
      optionalProps.formatter = (valueNumber: number) => `${valueNumber}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      optionalProps.parser = (displayValue: string) => displayValue.replace(/\$\s?|(,*)/g, '');
    }
    if (options && options.integer) {
      optionalProps.formatter = undefined;
      optionalProps.parser = undefined;
    }

    if (calculateWidth) {
      return (
        <AutoScalingInputNumber
          onChange={this.onChange}
          value={value}
          className={'edit-cell'}
          disabled={disabled}
          optionalProps={optionalProps}
          options={options}
        />
      );
    }

    return (
      <InputNumber
        onChange={this.onChange}
        value={value}
        className={'edit-cell'}
        disabled={disabled}
        {...optionalProps}
        {...options}
      />
    );
  }
}

export default NewInputNumber;
