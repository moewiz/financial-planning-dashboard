import React, { PureComponent } from 'react';
import moment, { Moment } from 'moment';
import numeral from 'numeral';
import { isEqual } from 'lodash';
import { DatePicker, Input, InputNumber, Select } from 'antd';
import { EntryPickerTable } from '../../../common/EntryPicker/styled';
import { ddFreeTextOptions } from '../../../enums/strategySentences';
import { DDFreeText } from './styled';
const { MonthPicker } = DatePicker;

interface EditCellProps {
  name: string;
  type?: EditCellType;
  value: any;
  onChange: (value: any) => void;
  className?: string;
  options?: any;
  defaultFullValue?: any;
  calculateWidth?: boolean;
}

interface EditaCellState {
  value: any;
}

export enum EditCellType {
  text,
  number,
  date,
  select,
  dropdownFreeText,
}

class EditCell extends PureComponent<EditCellProps, EditaCellState> {
  public state = {
    value: this.props.value,
    open: false,
  };

  public componentWillReceiveProps(nextProps: Readonly<EditCellProps>, nextContext: any): void {
    if (!isEqual(this.props.value, nextProps.value)) {
      this.setState({ value: nextProps.value });
    }
  }

  // public shouldComponentUpdate(
  //   nextProps: Readonly<EditCellProps>,
  //   nextState: Readonly<EditaCellState>,
  //   nextContext: any,
  // ): boolean {
  //   // const { value } = this.props;
  //   // const { value: nextValue } = nextProps;
  //   const { value } = this.state;
  //   const { value: nextValue } = nextState;
  //
  //   return !isEqual(value, nextValue);
  // }

  public onChange = (value: number | undefined) => {
    const { onChange } = this.props;

    this.setState({ value });
    onChange(value);
  }

  public onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { onChange } = this.props;
    const value = e.target.value;

    this.setState({ value });
    onChange(value);
  }

  public handleSelect = (value: any) => {
    this.setState({ value });
  }

  public handleDropdownFreeText = (value: any) => {
    if (value === 'customAmount') {
      this.setState({ value: 0 });
    } else {
      this.setState({ value });
    }
  }

  public renderSelect = () => {
    const { options } = this.props;
    const { value: stateValue } = this.state;
    const value = stateValue ? stateValue : options[0].value;

    return (
      <Select onChange={this.handleSelect} value={value}>
        {options &&
          options.length > 0 &&
          options.map((option: { value: any; label: string }) => (
            <Select.Option value={option.value} key={option.value}>
              {option.label}
            </Select.Option>
          ))}
      </Select>
    );
  }

  public handleChangeDate = (date: Moment, dateString: string | number) => {
    if (date) {
      this.setState({ value: date.toISOString() });
    }
  }

  public renderDate = () => {
    const { value } = this.state;
    const format = 'MMM YYYY';
    const momentValue = moment(value);

    return (
      <EntryPickerTable>
        <MonthPicker
          defaultValue={momentValue}
          onChange={this.handleChangeDate}
          placeholder={'Select month, year'}
          format={format}
          allowClear={false}
        />
      </EntryPickerTable>
    );
  }

  public renderDropdownFreeText = () => {
    const { defaultFullValue } = this.props;
    const { value: stateValue } = this.state;
    const value = stateValue ? stateValue : 0;
    const options = ddFreeTextOptions.map((option: { value: string; label: string }) => {
      if (option.value === 'full_value') {
        return { value: option.value, label: `${option.label} (${numeral(defaultFullValue).format('$0,0.00')})` };
      }
      return option;
    });
    const selectValue = value === 'full_value' ? 'full_value' : 'customAmount';

    return (
      <DDFreeText>
        <Select onChange={this.handleDropdownFreeText} value={selectValue}>
          {options &&
            options.length > 0 &&
            options.map(
              (option) =>
                option && (
                  <Select.Option value={option.value} key={option.value}>
                    {option.label}
                  </Select.Option>
                ),
            )}
        </Select>
        {selectValue !== 'full_value' && <InputNumber onChange={this.onChange} value={value} className={'edit-cell'} />}
      </DDFreeText>
    );
  }

  public renderInputNumber = () => {
    const { options } = this.props;
    const { value: stateValue } = this.state;
    const value = stateValue ? stateValue : 0;
    const precision = options.precision ? options.precision : 2;
    const optionalProps: { [key: string]: any } = {};
    if (options.integer) {
      optionalProps.formatter = undefined;
      optionalProps.parser = undefined;
    } else {
      optionalProps.formatter = (valueNumber: number) => `$${valueNumber}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      optionalProps.parser = (displayValue: string) => displayValue.replace(/\$\s?|(,*)/g, '');
    }

    return (
      <InputNumber
        onChange={this.onChange}
        value={value}
        className={'edit-cell'}
        {...options}
        {...optionalProps}
        precision={precision}
      />
    );
  }

  public renderInputText = () => {
    const { value: stateValue } = this.state;
    const value = stateValue ? stateValue : '';
    return <Input value={value} onChange={this.onChangeText} className={'edit-cell text'} />;
  }

  public render() {
    const { type } = this.props;

    switch (type) {
      case EditCellType.number:
        return this.renderInputNumber();
      case EditCellType.select:
        return this.renderSelect();
      case EditCellType.date:
        return this.renderDate();
      case EditCellType.dropdownFreeText:
        return this.renderDropdownFreeText();
      case EditCellType.text:
        return this.renderInputText();
      default:
        return this.renderInputText();
    }
  }
}

export default EditCell;
