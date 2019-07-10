import React, { PureComponent } from 'react';
import { get, isEqual } from 'lodash';
import { InputNumber } from 'antd';
interface NewInputNumberProps {
  value: any;
  onChange: (value: any) => void;
  options?: any;
  dollar?: boolean;
  calculateWidth?: boolean;
}
class NewInputNumber extends PureComponent<NewInputNumberProps> {
  public state = {
    value: this.props.value,
    open: false,
  };

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
    const { options, dollar, calculateWidth } = this.props;
    const { value: stateValue } = this.state;
    const value = stateValue ? stateValue : 0;
    const optionalProps: { [key: string]: any } = {};

    if (dollar) {
      optionalProps.formatter = (valueNumber: number) => `$${valueNumber}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      optionalProps.parser = (displayValue: string) => displayValue.replace(/\$\s?|(,*)/g, '');
      optionalProps.precision = 2;
    }
    if (options && options.integer) {
      optionalProps.formatter = undefined;
      optionalProps.parser = undefined;
    }

    const precision = get(optionalProps, 'precision', get(options, 'precision', 0));
    if (calculateWidth) {
      const intValue = Number.isNaN(Number.parseInt(value, 10)) ? 0 : Number.parseInt(value, 10);
      let valueLength = intValue.toString().length;
      let extraWidth = 0;
      let numberSize = 14;
      let minimum = 24;
      if (options && options.integer) {
        numberSize = valueLength < 3 ? 14 : 13;
        extraWidth = valueLength < 3 ? 8 : 1;
        minimum = precision ? 36 : 30;
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

    return (
      <InputNumber onChange={this.onChange} value={value} className={'edit-cell'} {...optionalProps} {...options} />
    );
  }
}

export default NewInputNumber;
