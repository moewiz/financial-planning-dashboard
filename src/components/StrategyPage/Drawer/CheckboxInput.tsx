import React, { PureComponent } from 'react';
import { Checkbox } from 'antd';
import { CheckboxCustomize, CheckboxCustomizeX } from '../StrategyTable/styled';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

interface CheckboxInputProps {
  value: boolean;
  onChange: (checked: boolean) => void;
  custom?: boolean;
}

class CheckboxInput extends PureComponent<CheckboxInputProps> {
  public onChange = (e: CheckboxChangeEvent) => {
    const { onChange } = this.props;
    const value = e.target.checked;
    onChange(value);
  }

  public render() {
    const { custom, value } = this.props;
    const Wrapper = custom ? CheckboxCustomizeX : CheckboxCustomize;

    return (
      <Wrapper>
        <Checkbox checked={value} onChange={this.onChange} />
      </Wrapper>
    );
  }
}

export default CheckboxInput;
