import React, { Component } from 'react';
import moment, { Moment } from 'moment';
import numeral from 'numeral';
import { isEqual, get } from 'lodash';
import { DatePicker, Input, Select } from 'antd';
import { EntryPickerTable } from '../../../common/EntryPicker/styled';
import { ddFreeTextOptions } from '../../../enums/strategySentences';
import { DDFreeText, DrawerTableRows, QuotationMark } from './styled';
import NewInputNumber from './NewInputNumber';
import LinkCurrentProduct from './LinkCurrentProduct';
import YearPicker from './YearPicker';
import AutoScalingInput from './AutoScalingInput';
import AutoScalingPicker from './AutoScalingPicker';

const { Option } = Select;
const { TextArea } = Input;

export interface EditCellProps {
  name: string;
  type?: EditCellType;
  value: any;
  onChange: (value: any, name: string) => void;
  className?: string;
  placeholder?: string;
  options?: any;
  defaultFullValue?: any;
  dollar?: boolean;
  yearFi?: boolean;
  calculateWidth?: boolean;
  disabled?: boolean;
}

export enum EditCellType {
  text,
  number,
  date,
  select,
  dropdownFreeText,
  textarea,
  linkCurrentProduct,
}

class EditCell extends Component<EditCellProps> {
  public shouldComponentUpdate(nextProps: Readonly<EditCellProps>): boolean {
    const { value, defaultFullValue, type, options } = this.props;
    const {
      value: nextValue,
      defaultFullValue: nextDefaultFullValue,
      type: nextType,
      options: nextOptions,
    } = nextProps;

    if (type === EditCellType.select) {
      return true;
    }

    return !isEqual(
      { value, defaultFullValue, type, options: JSON.stringify(options) },
      {
        value: nextValue,
        defaultFullValue: nextDefaultFullValue,
        type: nextType,
        options: JSON.stringify(nextOptions),
      },
    );
  }

  public onChange = (value: number | undefined) => {
    const { onChange, name } = this.props;

    onChange(value, name);
  }

  public onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { onChange, name } = this.props;
    const value = e.target.value;

    onChange(value, name);
  }

  public onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { onChange, name } = this.props;
    const value = e.target.value;

    onChange(value, name);
  }

  public handleSelect = (value: any) => {
    const { onChange, name } = this.props;
    onChange(value, name);
  }

  public handleDropdownFreeText = (val: any) => {
    const value = val === 'customAmount' ? 0 : val;
    const { onChange, name } = this.props;
    onChange(value, name);
  }

  public handleChangeDate = (date: Moment, dateString: string | number) => {
    if (date) {
      const { onChange, name } = this.props;
      onChange(date.toISOString(), name);
    }
  }

  public renderDate = () => {
    const { value, options } = this.props;
    const momentInput = value ? value : undefined;
    const format = 'MMM YYYY';
    const momentValue = moment(momentInput);
    if (options && options.pickerType === 'year') {
      return <YearPicker {...this.props} />;
    }

    return (
      <AutoScalingPicker
        value={momentValue}
        onChange={this.handleChangeDate}
        placeholder={'Select month, year'}
        format={format}
        allowClear={false}
      />
    );
  }

  public renderSelect = () => {
    const { options, yearFi, value: propValue, onChange, name } = this.props;
    if (propValue === undefined && options && options.length > 0) {
      onChange(options[0].value, name);
    }
    const value = propValue ? propValue : get(options, [0, 'value']);

    return (
      <Select
        onChange={this.handleSelect}
        value={value}
        optionLabelProp={yearFi ? 'title' : ''}
        showArrow={false}
        dropdownClassName="select-inline"
      >
        {options &&
          options.length > 0 &&
          options.map((option: { value: any; label: string; renderedLabel?: string; disabled?: boolean }) => (
            <Option value={option.value} key={option.value} title={option.renderedLabel} disabled={option.disabled}>
              {option.label}
            </Option>
          ))}
      </Select>
    );
  }

  public renderDropdownFreeText = () => {
    const { defaultFullValue, value: propValue } = this.props;
    const value = propValue ? propValue : 0;
    const options = ddFreeTextOptions.map((option: { value: string; label: string }) => {
      if (option.value === 'full_value') {
        const renderedLabel = `$${numeral(defaultFullValue).format('0,0')} (${option.label})`;
        return { value: option.value, label: renderedLabel, renderedLabel };
      }
      return option;
    });
    const selectValue = value === 'full_value' ? 'full_value' : 'customAmount';

    return (
      <DDFreeText>
        {selectValue === 'customAmount' && (
          <NewInputNumber {...this.props} value={value} onChange={this.onChange} dollar={true} calculateWidth={true} />
        )}
        <Select onChange={this.handleDropdownFreeText} value={selectValue} showArrow={false} optionLabelProp="title">
          {options &&
            options.length > 0 &&
            options.map(
              (option: { value: any; label: string; renderedLabel?: string }) =>
                option && (
                  <Option value={option.value} key={option.value} title={option.renderedLabel}>
                    {option.label}
                  </Option>
                ),
            )}
        </Select>
      </DDFreeText>
    );
  }

  public renderInputNumber = () => {
    const { value: propValue, options } = this.props;
    let value = propValue ? propValue : 0;
    if (options && options.allowEmpty) {
      value = propValue;
    }
    return <NewInputNumber {...this.props} value={value} onChange={this.onChange} />;
  }

  public renderInputText = () => {
    const { calculateWidth, value: propValue, options: customOptions } = this.props;
    const { quotationMark = false, ...options } = customOptions || {};
    const value = propValue ? propValue : '';
    const optionalProps: { [key: string]: any } = {};

    if (calculateWidth) {
      return (
        <AutoScalingInput
          value={value}
          onChangeText={this.onChangeText}
          className={'edit-cell text'}
          quotationMark={quotationMark}
          optionalProps={optionalProps}
          options={options}
        />
      );
    }

    if (quotationMark) {
      return (
        <QuotationMark hideQuotationMark={value.length === 0}>
          <Input
            value={value}
            onChange={this.onChangeText}
            className={'edit-cell text'}
            {...optionalProps}
            {...options}
          />
        </QuotationMark>
      );
    }

    return (
      <Input value={value} onChange={this.onChangeText} className={'edit-cell text'} {...optionalProps} {...options} />
    );
  }

  public renderInputTextArea = () => {
    const { placeholder, options, value: propValue } = this.props;
    const value = propValue || '';

    return <TextArea value={value} placeholder={placeholder} onChange={this.onChangeTextArea} autosize {...options} />;
  }

  public renderLinkCurrentProduct = () => {
    return <LinkCurrentProduct {...this.props} />;
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
      case EditCellType.textarea:
        input = this.renderInputTextArea();
        break;
      case EditCellType.linkCurrentProduct:
        input = this.renderLinkCurrentProduct();
        break;
      default:
        break;
    }

    return (
      <DrawerTableRows noBorder className={'strategy-item'} maximumWidth={EditCellType.textarea === type}>
        {input}
      </DrawerTableRows>
    );
  }
}

export default EditCell;
