import React from 'react';
import classNames from 'classnames';
import { reduce, get, isFunction } from 'lodash';
import { FormInput } from '../../Elements/FormInput';
import { InputType } from '../../Elements/FormInput/FormInput';
import { PickerType } from '../../../common/EntryPicker/EntryPicker';

import { EditableCellWrap, ValueEditCell } from '../styled';
interface EditableProps {
  type: InputType;
  record: any;
  dataIndex: string;
  handleSave?: (arg: object) => void;
  title?: string;
  editable?: boolean;
  disableRowIndex?: boolean;
  tableName?: string;
  rowIndex?: number;
  pickerType?: PickerType;
  prefix?: string | React.ReactNode;
  suffix?: string | React.ReactNode;
  expandedField?: boolean;
  options?: Array<{ value: any; label: any }>;
  confirmTitle?: { title: string; fieldValue: any };
  render?: () => void;
  smallInput?: boolean;
  disabledYear?: boolean;
  calculateWidth?: boolean;
  defaultValue?: any;
}

export default class EditableCell extends React.PureComponent<EditableProps> {
  public state = {
    editing: false,
  };

  public readonly input = React.createRef<any>();

  public toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing && get(this.input, 'current.focusInput') && isFunction(this.input.current.focusInput)) {
        this.input.current.focusInput();
      }
    });
  }

  public save = (e: any) => {
    const { record, handleSave, rowIndex, tableName, dataIndex, ...props } = this.props;
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
    this.toggleEdit();
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
    } = props;
    const appendProps = [];

    switch (type) {
      case 'select': {
        appendProps.push({ defaultOpen: editing, options, confirmTitle, defaultValue });
        break;
      }
      case 'date': {
        appendProps.push({ defaultOpen: editing, pickerType, options, disabledYear });
      }
    }

    return reduce(appendProps, (accumulator, prop) => ({ ...accumulator, ...prop }), {
      calculateWidth: calculateWidth || expandedField,
      smallInput,
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
      prefix,
      suffix,
      confirmTitle,
      disableRowIndex,
      render,
      smallInput,
      disabledYear,
      calculateWidth,
      defaultValue,
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

    if (expandedField) {
      return editable ? (
        editing ? (
          <EditableCellWrap>
            <FormInput
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
              <FormInput className={classNames({ readOnly: true })} type={type} name={fieldName} {...appendedProps} />
            </ValueEditCell>
          </EditableCellWrap>
        )
      ) : dataIndex ? (
        <EditableCellWrap>
          <FormInput
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
              <FormInput
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
                <FormInput
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
            <FormInput
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
