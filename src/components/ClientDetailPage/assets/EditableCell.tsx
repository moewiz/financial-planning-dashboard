import React from 'react';
import classNames from 'classnames';
import { reduce, get, isFunction, isEqual } from 'lodash';
import { InputType } from '../../Elements/OptimizedField/OptimizedField';
import { PickerType } from '../../../common/EntryPicker/EntryPicker';

import { EditableCellWrap, ValueEditCell } from '../styled';
import OptimizedField from '../../Elements/OptimizedField/OptimizedField';
interface EditableProps {
  type: InputType;
  record: any;
  dataIndex: string;
  setFieldValue: (field: string, value: any) => void;
  setFieldTouched: (field: string, isTouched?: boolean | undefined) => void;
  handleSave?: (arg: object) => void;
  handleBlur?: (e: React.FocusEvent) => void;
  title?: string;
  editable?: boolean;
  precision?: number;
  disableRowIndex?: boolean;
  tableName?: string;
  rowIndex?: number;
  pickerType?: PickerType;
  sign?: string;
  expandedField?: boolean;
  options?: Array<{ value: any; label: any }>;
  confirmTitle?: { title: string; fieldValue: any };
  render?: () => void;
  smallInput?: boolean;
  disabledYear?: boolean;
  calculateWidth?: boolean;
  emptyIcon?: boolean;
  defaultValue?: any;
  min?: number;
  customMin?: number;
}

const getValue = (props: any) => get(props.record, [props.dataIndex]);

export default class EditableCell extends React.Component<EditableProps> {
  public state = {
    editing: false,
  };

  public readonly input = React.createRef<any>();

  public shouldComponentUpdate(nextProps: Readonly<EditableProps>, nextState: Readonly<{}>, nextContext: any): boolean {
    const { options } = this.props;
    const value = getValue(this.props);
    const nextValue = getValue(nextProps);
    const nextOptions = nextProps.options;

    return !isEqual({ value, options }, { value: nextValue, options: nextOptions });
  }

  public toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing && get(this.input, 'current.focusInput') && isFunction(this.input.current.focusInput)) {
        this.input.current.focusInput();
      }
    });
  }

  public save = (e: any) => {
    const { record, handleSave, rowIndex, tableName, dataIndex, handleBlur, ...props } = this.props;
    const fieldName = `${tableName}[${rowIndex}].${dataIndex}`;
    let value;

    switch (props.type) {
      case 'select':
      case 'date': {
        value = e;
        break;
      }
      default: {
        value = get(e, 'currentTarget.value');
        break;
      }
    }

    if (fieldName && isFunction(handleSave)) {
      handleSave({ tableName, rowIndex, dataIndex, value, record });
    }
    if (isFunction(handleBlur)) {
      handleBlur(e);
    }
    this.setState({ editing: false });
  }

  public getAppendedProps = (props: EditableProps, editing: boolean = false) => {
    const {
      type,
      options,
      pickerType,
      confirmTitle,
      smallInput,
      disabledYear,
      expandedField,
      calculateWidth,
      defaultValue,
      precision,
      emptyIcon,
      min,
      customMin,
      sign,
      setFieldValue,
      setFieldTouched,
    } = props;
    const appendProps = [];

    switch (type) {
      case 'select': {
        appendProps.push({ defaultOpen: editing, options, confirmTitle, defaultValue });
        break;
      }
      case 'date': {
        appendProps.push({ defaultOpen: editing, pickerType, options, disabledYear });
        break;
      }
      case 'number': {
        appendProps.push({
          min,
          customMin,
          precision,
          emptyIcon,
          calculateWidth: calculateWidth || expandedField,
          smallInput,
          sign,
        });
        break;
      }
    }

    return reduce(appendProps, (accumulator, prop) => ({ ...accumulator, ...prop }), {
      value: getValue(this.props),
      // error: getError(this.props),
      setFieldValue,
      setFieldTouched,
    });
  }

  public render() {
    const { editing } = this.state;
    const {
      editable: editableProp,
      dataIndex,
      title,
      record,
      handleSave,
      rowIndex,
      type,
      tableName,
      options,
      pickerType,
      expandedField,
      sign,
      confirmTitle,
      disableRowIndex,
      render,
      smallInput,
      disabledYear,
      calculateWidth,
      defaultValue,
      emptyIcon,
      min,
      customMin,
      setFieldValue,
      setFieldTouched,
      ...restProps
    } = this.props;
    const appendedProps = this.getAppendedProps(this.props, editing);
    let editable = editableProp;
    if (type === 'select' && options && options.length === 1 && dataIndex !== 'expandable.linkedProduct') {
      editable = false;
    }

    let fieldName = '';
    if (disableRowIndex) {
      fieldName = `${tableName}.${dataIndex}`;
    } else {
      fieldName = `${tableName}[${rowIndex}].${dataIndex}`;
    }
    console.log('EditableCell rendered, props', this.props)

    if (expandedField) {
      return editable ? (
        editing ? (
          <EditableCellWrap>
            <OptimizedField
              type={type}
              name={fieldName}
              ref={this.input}
              onPressEnter={this.save}
              handleBlur={this.save}
              {...appendedProps}
            />
          </EditableCellWrap>
        ) : (
          <EditableCellWrap onClick={this.toggleEdit}>
            <ValueEditCell>
              <OptimizedField
                className={classNames({ readOnly: true })}
                type={type}
                name={fieldName}
                {...appendedProps}
              />
            </ValueEditCell>
          </EditableCellWrap>
        )
      ) : dataIndex ? (
        <EditableCellWrap>
          <OptimizedField
            className={classNames({ readOnly: true, disabled: true })}
            disabled={true}
            type={type}
            name={fieldName}
            {...appendedProps}
          />
        </EditableCellWrap>
      ) : (
        restProps.children
      );
    }

    return (
      <td {...restProps}>
        {editable ? (
          editing ? (
            <EditableCellWrap>
              <OptimizedField
                type={type}
                name={fieldName}
                ref={this.input}
                onPressEnter={this.save}
                handleBlur={this.save}
                {...appendedProps}
              />
            </EditableCellWrap>
          ) : (
            <EditableCellWrap onClick={this.toggleEdit}>
              <ValueEditCell>
                <OptimizedField
                  className={classNames({ readOnly: !smallInput, smallInput })}
                  type={type}
                  name={fieldName}
                  {...appendedProps}
                />
              </ValueEditCell>
            </EditableCellWrap>
          )
        ) : dataIndex ? (
          <EditableCellWrap>
            <OptimizedField
              className={classNames({ readOnly: true, disabled: true })}
              disabled={true}
              type={type}
              name={fieldName}
              {...appendedProps}
            />
          </EditableCellWrap>
        ) : (
          restProps.children
        )}
      </td>
    );
  }
}
