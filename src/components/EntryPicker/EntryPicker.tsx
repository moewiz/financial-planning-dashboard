import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { DatePicker, Button } from 'antd';
import { get, isFunction } from 'lodash';
import moment, { Moment } from 'moment';
import { EntryPickerTable, DateButtonCustom } from './styled';
import { FormikHandlers } from 'formik';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

interface EntryPickerProps {
  name: string;
  value?: string | number;
  onBlur?: FormikHandlers['handleBlur'];
  handleChange?: (name?: string, value?: any) => void;
  handleBlur?: (e: React.FocusEvent | string) => void;
  setFieldValue: (field: string, value: any) => void;

  pickerType?: PickerType;
  placeholder?: string;
  border?: string;
  textType?: string;
  fontStyle?: string;
  format?: string;
  defaultOpen?: boolean;
  localeCode?: string;
}

declare type PickerType = 'month' | 'range' | 'week' | 'date' | 'custom';

class EntryPicker extends PureComponent<EntryPickerProps, {}> {
  protected static defaultProps = {
    placeholder: '',
    format: 'DD/MM/YYYY',
  };
  public readonly myRef = React.createRef<any>();
  public state = {
    open: this.props.defaultOpen || false,
  };

  public focusInput = () => {
    if (get(this.myRef, 'current.focus')) {
      this.myRef.current.focus();
    }
  }
  public handleOpenChange = (open: boolean) => {
    this.setState({ open });
  }

  public handleChange = (date: Moment, dateString: string) => {
    const { setFieldValue, name, handleBlur } = this.props;

    debugger;
    if (setFieldValue) {
      setFieldValue(name, dateString);
    }

    if (isFunction(handleBlur)) {
      handleBlur(dateString);
    }
  }

  // case 'custom':
  //   return (
  //     <EntryPickerTable
  //       className={'picker-' + pickerType + ' has-' + border + ' font-' + fontStyle + ' text-' + textType}
  //     >
  //       <DatePicker
  //         value={moment('2015-01-01', 'YYYY-MM-DD')}
  //         renderExtraFooter={() => (
  //           <DateButtonCustom>
  //             <Button type="primary" onClick={this.handleOpenChange}>
  //               Retired
  //             </Button>
  //           </DateButtonCustom>
  //         )}
  //         showToday={false}
  //       />
  //     </EntryPickerTable>
  //   );

  public render(): React.ReactNode {
    const { open } = this.state;
    const { pickerType, border, fontStyle, value, textType, defaultOpen, format, ...props } = this.props;
    const className = classNames(
      'picker-' + pickerType + ' has-' + border + ' font-' + fontStyle + ' text-' + textType,
    );
    const momentValue = moment(value, format);

    switch (pickerType) {
      case 'month': {
        return (
          <EntryPickerTable className={className}>
            <MonthPicker
              ref={this.myRef}
              defaultValue={momentValue}
              {...props}
              onChange={this.handleChange}
              onOpenChange={this.handleOpenChange}
              open={open}
              format={format}
            />
          </EntryPickerTable>
        );
      }
      case 'range': {
        const { placeholder, ...restProps } = props;
        return (
          <EntryPickerTable className={className}>
            <RangePicker
              ref={this.myRef}
              {...restProps}
              onOpenChange={this.handleOpenChange}
              open={open}
              format={format}
            />
          </EntryPickerTable>
        );
      }
      case 'week': {
        return (
          <EntryPickerTable className={className}>
            <WeekPicker
              ref={this.myRef}
              defaultValue={momentValue}
              {...props}
              onOpenChange={this.handleOpenChange}
              open={open}
              format={format}
            />
          </EntryPickerTable>
        );
      }
      case 'date': {
        return (
          <EntryPickerTable className={className}>
            <DatePicker
              ref={this.myRef}
              defaultValue={momentValue}
              {...props}
              onOpenChange={this.handleOpenChange}
              open={open}
              format={format}
            />
          </EntryPickerTable>
        );
      }
      case 'custom': {
        return (
          <EntryPickerTable className={className}>
            <DatePicker
              ref={this.myRef}
              defaultValue={momentValue}
              {...props}
              onOpenChange={this.handleOpenChange}
              open={open}
              format={format}
            />
          </EntryPickerTable>
        );
      }
      default: {
        return (
          <EntryPickerTable className={className}>
            <DatePicker
              ref={this.myRef}
              defaultValue={momentValue}
              {...props}
              onChange={this.handleChange}
              onOpenChange={this.handleOpenChange}
              open={open}
              format={format}
            />
          </EntryPickerTable>
        );
      }
    }
  }
}

export default EntryPicker;
