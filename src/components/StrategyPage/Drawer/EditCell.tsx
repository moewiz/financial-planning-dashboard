import React, { PureComponent } from 'react';
import moment, { Moment } from 'moment';
import numeral from 'numeral';
import { isEqual } from 'lodash';
import { DatePicker, Input, Select } from 'antd';
import { EntryPickerTable } from '../../../common/EntryPicker/styled';
import { ddFreeTextOptions } from '../../../enums/strategySentences';
import { DDFreeText, DrawerTableRows } from './styled';
import NewInputNumber from './NewInputNumber';

const { MonthPicker } = DatePicker;
const { Option } = Select;

interface EditCellProps {
  name: string;
  type?: EditCellType;
  value: any;
  onChange: (value: any) => void;
  className?: string;
  options?: any;
  defaultFullValue?: any;
  dollar?: boolean;
  yearFi?: boolean;
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
    const { onChange } = this.props;
    onChange(value);
  }

  public handleDropdownFreeText = (value: any) => {
    if (value === 'customAmount') {
      this.setState({ value: 0 });
    } else {
      this.setState({ value });
    }
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

  public renderSelect = () => {
    const { options, yearFi } = this.props;
    const { value: stateValue } = this.state;
    const value = stateValue ? stateValue : options[0].value;

    return (
      <Select onChange={this.handleSelect} value={value} optionLabelProp={yearFi ? 'title' : ''} showArrow={false}>
        {options &&
          options.length > 0 &&
          options.map((option: { value: any; label: string; renderedLabel?: string }) => (
            <Option value={option.value} key={option.value} title={option.renderedLabel}>
              {option.label}
            </Option>
          ))}
      </Select>
    );
  }

  public renderDropdownFreeText = () => {
    const { defaultFullValue } = this.props;
    const { value: stateValue } = this.state;
    const value = stateValue ? stateValue : 0;
    const options = ddFreeTextOptions.map((option: { value: string; label: string }) => {
      if (option.value === 'full_value') {
        return { value: option.value, label: `$${numeral(defaultFullValue).format('0,0')} (${option.label})` };
      }
      return option;
    });
    const selectValue = value === 'full_value' ? 'full_value' : 'customAmount';

    return (
      <DDFreeText>
        <Select onChange={this.handleDropdownFreeText} value={selectValue} showArrow={false}>
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
        {selectValue === 'customAmount' && (
          <NewInputNumber {...this.props} value={value} onChange={this.onChange} dollar={true} calculateWidth={true} />
        )}
      </DDFreeText>
    );
  }

  public renderInputNumber = () => {
    const { value: stateValue } = this.state;
    const value = stateValue ? stateValue : 0;
    return <NewInputNumber {...this.props} value={value} onChange={this.onChange} />;
  }

  public renderInputText = () => {
    const { value: stateValue } = this.state;
    const value = stateValue ? stateValue : '';

    return <Input value={value} onChange={this.onChangeText} className={'edit-cell text'} />;
  }

  public render() {
    const { type } = this.props;
    let input = this.renderInputText();

    switch (type) {
      case EditCellType.number:
        input = this.renderInputNumber();
        break;
      case EditCellType.select:
        input = this.renderSelect();
        break;
      case EditCellType.date:
        input = this.renderDate();
        break;
      case EditCellType.dropdownFreeText:
        input = this.renderDropdownFreeText();
        break;
      case EditCellType.text:
        input = this.renderInputText();
        break;
      default:
        break;
    }

    return (
      <DrawerTableRows noBorder className={'strategy-item'}>
        {input}
      </DrawerTableRows>
    );
  }
}

export default EditCell;
