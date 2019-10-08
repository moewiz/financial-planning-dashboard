import React from 'react';
import { Table } from 'antd';
import { map, isString } from 'lodash';
import cn from 'classnames';

import { CarouselItem } from './styled';
import { Record } from '../DocumentsPage';
import { components } from '../../../containers/productOptimizer/CurrentProduct';
import { EditCellType } from '../../StrategyPage/Drawer/EditCell';
import TitleEditable from './TitleEditable';

const CardDetails = (props: { record: Record; name: string }) => {
  const { record, name } = props;
  const onEdit = (value: any, fieldName: string, rowIndex?: number) => {
    console.log({ value, name: `${name}.table.data.${rowIndex}.${fieldName}` });
  };
  const columns = map(record.table.columns, (column, index: number) => {
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
    }),
  }));
  const dataSource = record.table.data;
  const placeholderRow = { value: '', description: '' };

  return (
    <CarouselItem>
      <TitleEditable defaultValue={record.title} name="title" onChange={onEdit} editable={record.type === 'user'} />
      <TitleEditable
        defaultValue={record.subtitle}
        name="subtitle"
        onChange={onEdit}
        editable={record.type === 'user'}
        subTitle={true}
      />

      <Table
        className={cn('table-general documents-table')}
        columns={columns}
        dataSource={[...dataSource, placeholderRow]}
        pagination={false}
        scroll={{ y: 325 }}
        components={components}
      />
    </CarouselItem>
  );
};

export default CardDetails;
