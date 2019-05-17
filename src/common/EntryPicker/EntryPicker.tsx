import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { DatePicker, Button, Select } from 'antd';
const Option = Select.Option;
import { get, isFunction } from 'lodash';
import moment, { Moment } from 'moment';
import { EntryPickerTable, DateButtonCustom } from './styled';
import { FormikHandlers } from 'formik';
import { DatePickerMode } from 'antd/lib/date-picker/interface';
import { EditableCellWrap } from '../../components/ClientDetailPage/styled';

const { MonthPicker, WeekPicker } = DatePicker;

interface Option {
  value: string | number;
  label: string;
}

interface EntryPickerProps {
  name: string;
  value?: any;
  options?: Option[];
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
  allowClear?: boolean;
}

export declare type PickerType = 'month' | 'week' | 'date' | 'custom';

interface EntryPickerState {
  open: boolean;
}

class EntryPicker extends PureComponent<EntryPickerProps, EntryPickerState> {
  protected static defaultProps = {
    placeholder: '',
    format: 'DD/MM/YYYY',
    pickerType: 'date',
    allowClear: false,
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

  public openDatePicker = () => {
    const { open } = this.state;
    if (!open) {
      this.handleOpenChange(true);
    }
  }

  public handleChange = (date: Moment, dateString: string | number) => {
    const { setFieldValue, name, handleBlur } = this.props;

    if (setFieldValue) {
      setFieldValue(name, dateString);
    }

    if (isFunction(handleBlur)) {
      handleBlur(dateString);
    }
  }

  public handleYearChange = (value: Moment | undefined, mode: DatePickerMode) => {
    const { setFieldValue, name, handleBlur } = this.props;

    if (value) {
      if (setFieldValue) {
        setFieldValue(name, { yearValue: value.year(), type: null });
      }

      if (isFunction(handleBlur)) {
        handleBlur({ yearValue: value.year(), type: null });
      }
    }
    // close panel
    this.handleOpenChange(false);
  }

  public handleSelectDropdown = (value: string | number) => {
    const { setFieldValue, name, handleBlur } = this.props;

    if (setFieldValue) {
      setFieldValue(name, { type: value, yearValue: null });
    }

    if (isFunction(handleBlur)) {
      handleBlur({ type: value, yearValue: null });
    }
  }

  public render(): React.ReactNode {
    const { open } = this.state;
    const { pickerType, border, fontStyle, value, textType, defaultOpen, format, options, ...props } = this.props;
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
      case 'week': {
        return (
          <EntryPickerTable className={className}>
            <WeekPicker
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
      case 'date': {
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
      case 'custom': {
        const { type, yearValue } = value;
        const yearFormat = 'YYYY';
        const yearMoment = yearValue ? moment(yearValue, yearFormat) : moment();

        return (
          <EntryPickerTable className={className}>
            {yearValue === null && type !== '' && (
              <div className="readOnly" onClick={!open ? this.openDatePicker : undefined}>
                {get((options || []).find((option: Option) => option.value === type), 'label')}
              </div>
            )}
            <DatePicker
              ref={this.myRef}
              {...props}
              className={classNames({ 'input-hidden': yearValue === null })}
              defaultValue={yearMoment}
              onOpenChange={this.handleOpenChange}
              format={yearFormat}
              open={open}
              mode={'year'}
              onPanelChange={this.handleYearChange}
              renderExtraFooter={() => (
                <DateButtonCustom>
                  {options &&
                    options.map((option: Option, index: number) => (
                      <Button
                        type="primary"
                        htmlType={'button'}
                        onClick={() => this.handleSelectDropdown(option.value)}
                        key={index}
                        className={classNames({ 'dropdown-selected': type === option.value })}
                      >
                        {option.label}
                      </Button>
                    ))}
                </DateButtonCustom>
              )}
              showToday={false}
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
