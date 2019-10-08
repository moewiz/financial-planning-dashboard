import React, { useCallback, useEffect, useState } from 'react';
import { Table } from 'antd';
import { get, map, isString, debounce } from 'lodash';
import cn from 'classnames';

import { CarouselItem } from './styled';
import { Record } from '../DocumentsPage';
import EditCell, { EditCellType } from '../../StrategyPage/Drawer/EditCell';
import TitleEditable from './TitleEditable';

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

const CardDetails = (props: {
  record: Record;
  name: string;
  setFieldValue: (field: string, val: any) => void;
  overwrite?: boolean;
}) => {
  const { record, name, setFieldValue, overwrite } = props;
  const onEdit = (value: any, fieldName: string, rowIndex?: number) => {
    const field = `${name}.table.data.${rowIndex}.${fieldName}`;
    setFieldValue(field, value);
  };
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
      onEdit,
      options: {
        placeholder: index === 0 ? 'Enter description' : '',
      },
      overwrite,
    }),
  }));
  const dataSource = record.table.data;
  const placeholderRow = { value: '', description: '' };
  const onEditTitle = (value: any, fieldName: string) => {
    setFieldValue(`${name}.${fieldName}`, value);
  };

  // Custom table
  if (overwrite) {
    columns.push({
      title: 'Action',
      key: 'overwrite',
      width: 100,
      render: (text: any, row: any, index: number) => {
        if (index === dataSource.length) {
          return null;
        }

        const overwriteRow = () => {
          const field = `${name}.table.data.${index}.isOverwrite`;
          setFieldValue(field, !row.isOverwrite);
        };
        return (
          <div onClick={overwriteRow} style={{ cursor: 'pointer' }}>
            Overwrite
          </div>
        );
      },
    });
  }

  return (
    <CarouselItem>
      <TitleEditable
        defaultValue={record.title}
        name="title"
        onChange={onEditTitle}
        editable={record.type === 'user'}
      />
      <TitleEditable
        defaultValue={record.subtitle}
        name="subtitle"
        onChange={onEditTitle}
        editable={record.type === 'user'}
        subTitle={true}
      />

      {overwrite ? (
        <Table
          className={cn('table-general documents-table expanded-table')}
          columns={columns}
          dataSource={[...dataSource, placeholderRow]}
          pagination={false}
          scroll={{ y: 325 }}
          components={components}
          expandedRowRender={(row: any, index: number) => {
            if (row.isOverwrite) {
              return <JustificationField defaultValue={row.justification} onEdit={onEdit} index={index} />;
            }
            return null;
          }}
          defaultExpandAllRows={true}
          expandIcon={() => null}
        />
      ) : (
        <Table
          className={cn('table-general documents-table')}
          columns={columns}
          dataSource={[...dataSource, placeholderRow]}
          pagination={false}
          scroll={{ y: 325 }}
          components={components}
        />
      )}
    </CarouselItem>
  );
};

export default CardDetails;
