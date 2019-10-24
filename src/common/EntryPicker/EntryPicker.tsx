import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { DatePicker, Button } from 'antd';
import { get, isFunction } from 'lodash';
import moment, {Moment, unitOfTime} from 'moment';
import { EntryPickerTable, DateButtonCustom } from './styled';
import { FormikHandlers } from 'formik';
import { DatePickerMode } from 'antd/lib/date-picker/interface';

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
  format?: string;
  defaultOpen?: boolean;
  allowClear?: boolean;
  disabledYear?: boolean;
  showAge?: boolean;
}

export declare type PickerType = 'month' | 'week' | 'year' | 'date' | 'custom';

interface EntryPickerState {
  open: boolean;
}

function disabledRule(current: Moment, granularity: unitOfTime.StartOf = 'year') {
  // Can not select (day, month, year) before today
  return moment().isAfter(current, granularity);
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
      setFieldValue(name, date.toISOString());
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

  public onPanelChange = (value: Moment | undefined, mode: DatePickerMode) => {
    const { setFieldValue, name, handleBlur, disabledYear } = this.props;

    if (value) {
      if (disabledYear && disabledRule(value)) {
        return;
      }
      if (setFieldValue) {
        setFieldValue(name, value.year());
      }

      if (isFunction(handleBlur)) {
        handleBlur(value.year());
      }
    }
  }

  public render(): React.ReactNode {
    const { open } = this.state;
    const { pickerType, border, value, defaultOpen, format, options, disabledYear, showAge, ...props } = this.props;
    const className = classNames('picker-' + pickerType + ' has-' + border, { showAge });
    const momentValue = value ? moment(value) : undefined;
    const age = showAge && value ? moment().diff(momentValue, 'years') : 0;

    switch (pickerType) {
      case 'month': {
        return (
          <EntryPickerTable className={className}>
            <MonthPicker
              ref={this.myRef}
              value={momentValue}
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
            { showAge && value && <span>({age})</span> }
          </EntryPickerTable>
        );
      }
      case 'year': {
        const yearFormat = 'YYYY';
        const yearMoment = value ? moment(value, yearFormat) : moment();

        return (
          <EntryPickerTable className={className}>
            <DatePicker
              ref={this.myRef}
              defaultValue={yearMoment}
              {...props}
              mode={'year'}
              onPanelChange={this.onPanelChange}
              onOpenChange={this.handleOpenChange}
              open={open}
              format={yearFormat}
            />
          </EntryPickerTable>
        );
      }
      case 'custom': {
        const { type = null, yearValue = null } = value || {};
        const yearFormat = 'YYYY';
        const yearMoment = yearValue ? moment(yearValue, yearFormat) : moment();
        const datepickerProps = {
          defaultValue: yearMoment,
        };
        if (yearValue === null) {
          delete datepickerProps.defaultValue;
        }

        return (
          <EntryPickerTable className={className}>
            <DatePicker
              ref={this.myRef}
              {...props}
              {...datepickerProps}
              className={classNames({ 'input-hidden': true })}
              dropdownClassName={classNames({ 'no-year-selected': yearValue === null })}
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
            <div className="dropdown-value readOnly" onClick={!open ? this.openDatePicker : undefined}>
              { yearValue && <span>{yearValue}</span> }
              { type && <span>{get((options || []).find((option: Option) => option.value === type), 'label')}</span> }
            </div>
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
