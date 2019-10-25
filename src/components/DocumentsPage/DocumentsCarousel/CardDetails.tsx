import React, { useCallback, useEffect, useState } from 'react';
import { Popconfirm, Table } from 'antd';
import { get, map, isString, debounce, last } from 'lodash';
import { FieldArray, FieldArrayRenderProps } from 'formik';
import cn from 'classnames';
import uuid from 'uuid';

import { Record } from '../DocumentsPage';
import EditCell, { EditCellType } from '../../StrategyPage/Drawer/EditCell';
import TitleEditable from './TitleEditable';
import AddAdvice from './AddAdvice';
import { CarouselItem } from './styled';

const emptyArray: any[] = [];

const JustificationField = (props: {
  defaultValue: string | undefined;
  onEdit: (val: any, name: string, index: number) => void;
  index: number;
}) => {
  const { defaultValue, onEdit, index } = props;
  const [value, setValue] = useState(defaultValue);
  const debounceEdit = useCallback(
    debounce((val, name) => {
      onEdit(val, name, index);
    }, 500),
    [],
  );
  const onChangeInput = (val: any, name: string) => {
    setValue(val);
    debounceEdit(val, name);
  };

  return (
    <EditCell
      name={'justification'}
      value={value}
      onChange={onChangeInput}
      options={{ placeholder: 'Enter justification' }}
    />
  );
};

const EditCellContainer = (props: any) => {
  const { dataIndex, record, type, editable, onEdit, rowIndex, overwrite } = props;
  const [value, setValue] = useState<any>(get(record, dataIndex));
  useEffect(() => {
    setValue(get(record, dataIndex));
  }, [get(record, dataIndex)]);
  const debounceEdit = useCallback(
    debounce((val, name, index) => {
      onEdit(val, name, index);
    }, 500),
    [],
  );
  const onChange = (val: any, name: string) => {
    setValue(val);
    debounceEdit(val, name, rowIndex);
  };
  const classNames = [props.className];
  if (overwrite) {
    if (record.isOverwrite) {
      classNames.push('strikethrough');
    } else if (dataIndex === 'issue') {
      classNames.push('underline');
    }
  }

  return (
    <td className={classNames.join(' ')}>
      {editable ? (
        <EditCell
          {...props}
          name={dataIndex}
          value={value}
          onChange={onChange}
          type={type}
          disabled={record.id === -1 && dataIndex === 'percentage'}
        />
      ) : (
        props.children
      )}
    </td>
  );
};

const components = {
  body: {
    cell: EditCellContainer,
  },
};

interface CardDetailsProps {
  record: Record;
  name: string;
  setFieldValue: (field: string, val: any) => void;

  overwrite?: boolean;
  showAddButton?: boolean;
}

const placeholderRow = { id: -1 };

class CardDetails extends React.PureComponent<CardDetailsProps> {
  public componentDidMount() {
    const { record, setFieldValue, name } = this.props;
    const dataList = record.table.data;
    const lastRecord: any = last(dataList);
    if ((dataList.length > 0 && lastRecord && lastRecord.id !== -1) || dataList.length === 0) {
      const dataListWithPlaceholder = [...dataList, placeholderRow].map((data: any, index: number) => ({
        ...data,
        key: index,
      }));
      setFieldValue(`${name}.table.data`, dataListWithPlaceholder);
    }
  }

  public onEditTitle = (value: any, fieldName: string) => {
    const { setFieldValue } = this.props;
    setFieldValue(`${name}.${fieldName}`, value);
  }

  public onEdit = (arrayHelpers: FieldArrayRenderProps) => (value: any, fieldName: string, rowIndex: number) => {
    const { setFieldValue, record } = this.props;
    const dataList = record.table.data;
    const currentRow = dataList[rowIndex];
    const rowName = `${arrayHelpers.name}.${rowIndex}`;
    const field = `${rowName}.${fieldName}`;

    setFieldValue(field, value);

    const isLastRow = rowIndex === dataList.length - 1;
    if (isLastRow && currentRow.id === -1 && value.trim() !== '') {
      setFieldValue(`${rowName}.id`, uuid());
      arrayHelpers.push({ ...placeholderRow, key: dataList.length });
    }
  }

  public onAdd = (arrayHelpers: FieldArrayRenderProps) => (text: string) => {
    const { record } = this.props;
    const dataList = record.table.data;
    arrayHelpers.unshift({ id: uuid(), key: dataList.length, value: text });
  }

  public render() {
    const { record, name, setFieldValue, overwrite } = this.props;
    const dataList = record.table.data;

    return (
      <CarouselItem>
        <TitleEditable
          defaultValue={record.title}
          name="title"
          onChange={this.onEditTitle}
          editable={record.type === 'user'}
        />
        <TitleEditable
          defaultValue={record.subtitle}
          name="subtitle"
          onChange={this.onEditTitle}
          editable={record.type === 'user'}
          subTitle={true}
        />
        <FieldArray
          name={`${name}.table.data`}
          render={(arrayHelpers: FieldArrayRenderProps) => {
            const columns: any[] = map(record.table.columns, (column, index: number) => {
              if (isString(column)) {
                return {
                  title: column,
                  dataIndex: index === 0 ? 'value' : 'description',
                };
              }

              return column;
            }).map((col, index: number) => ({
              key: index.toString(),
              width: 160,
              ...col,
              onCell: (row: any, rowIndex: number) => ({
                ...col,
                record: row,
                editable: true,
                rowIndex,
                type: col.type || EditCellType.text,
                onEdit: this.onEdit(arrayHelpers),
                options: {
                  placeholder: index === 0 ? 'Enter description' : '',
                },
                overwrite,
              }),
            }));

            if (overwrite) {
              columns.push({
                title: 'Action',
                key: 'overwrite',
                width: 100,
                render: (text: any, row: any, index: number) => {
                  if (index === dataList.length - 1) {
                    return null;
                  }
                  const overwriteRow = () => {
                    const field = `${arrayHelpers.name}.${index}.isOverwrite`;
                    setFieldValue(field, !row.isOverwrite);
                  };
                  const warningMessage = row.isOverwrite ? 'Remove override?' : 'Really override?';

                  return (
                    <Popconfirm title={warningMessage} onConfirm={overwriteRow}>
                      <span style={{ cursor: 'pointer' }}>Override</span>
                    </Popconfirm>
                  );
                },
              });

              return (
                <Table
                  className={cn('table-general documents-table expanded-table')}
                  columns={columns}
                  dataSource={dataList}
                  pagination={false}
                  scroll={{ y: 325 }}
                  components={components}
                  expandedRowRender={(row: any, index: number) => {
                    if (row.isOverwrite) {
                      return (
                        <JustificationField
                          defaultValue={row.justification}
                          onEdit={this.onEdit(arrayHelpers)}
                          index={index}
                        />
                      );
                    }
                    return null;
                  }}
                  expandedRowKeys={map(dataList, 'key')}
                  expandIcon={() => null}
                />
              );
            }
            const { showAddButton } = this.props;

            return (
              <>
                {showAddButton && <AddAdvice header={record.header} onAdd={this.onAdd(arrayHelpers)} />}

                <Table
                  className={cn('table-general documents-table')}
                  columns={columns}
                  dataSource={dataList}
                  pagination={false}
                  scroll={{ y: 325 }}
                  components={components}
                />
              </>
            );
          }}
        />
      </CarouselItem>
    );
  }
}

export default CardDetails;
