import React, { PureComponent } from 'react';
import { isEqual } from 'lodash';
import { Checkbox } from 'antd';
import { CheckboxCustomize, CheckboxCustomizeX } from '../StrategyTable/styled';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

interface CheckboxInputProps {
  value: boolean;
  onChange: (checked: boolean) => void;
  custom?: boolean;
}

class CheckboxInput extends PureComponent<CheckboxInputProps> {
  public state = {
    value: this.props.value,
  };

  public componentWillReceiveProps(nextProps: Readonly<CheckboxInputProps>, nextContext: any): void {
    if (!isEqual(this.props.value, nextProps.value)) {
      this.setState({ value: nextProps.value });
    }
  }

  public onChange = (e: CheckboxChangeEvent) => {
    const { onChange } = this.props;
    const value = e.target.checked;
    onChange(value);
    this.setState({ value });
  }

  public render() {
    const { custom } = this.props;
    const { value } = this.state;
    const Wrapper = custom ? CheckboxCustomizeX : CheckboxCustomize;

    return (
      <Wrapper>
        <Checkbox checked={value} onChange={this.onChange} />
      </Wrapper>
    );
  }
}

export default CheckboxInput;
