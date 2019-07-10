import React, { PureComponent } from 'react';
import moment, { Moment } from 'moment';
import { isEqual } from 'lodash';
import { DatePicker, Input, InputNumber, Select } from 'antd';
import { InputWrapper } from '../../../common/Input/styled';
import { EntryPickerTable } from '../../../common/EntryPicker/styled';
const { MonthPicker } = DatePicker;

interface EditCellProps {
  name: string;
  type?: EditCellType;
  value: any;
  onChange: (value: any) => void;
  className?: string;
  options?: any;
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

  public renderSelect = () => {
    const { options } = this.props;
    const { value } = this.state;

    return (
      <InputWrapper>
        <Select onChange={this.handleSelect} value={value}>
          {options &&
            options.length > 0 &&
            options.map((option: { value: any; label: string }) => (
              <Select.Option value={option.value} key={option.value}>
                {option.label}
              </Select.Option>
            ))}
        </Select>
      </InputWrapper>
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
        />
      </EntryPickerTable>
    );
  }

  public render() {
    const { name, type } = this.props;
    const { value } = this.state;

    switch (type) {
      case EditCellType.number:
        return <InputNumber name={name} onChange={this.onChange} value={value} className={'edit-cell'} />;
      case EditCellType.select:
        return this.renderSelect();
      case EditCellType.date:
        return this.renderDate();
      case EditCellType.text:
        return <Input name={name} value={value} onChange={this.onChangeText} className={'edit-cell text'} />;
      default:
        return <Input name={name} value={value} onChange={this.onChangeText} className={'edit-cell text'} />;
    }
  }
}

export default EditCell;
