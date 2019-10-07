import React from 'react';
import { Table } from 'antd';
import { map, isString } from 'lodash';
import cn from 'classnames';

import { TitleStep, TitleStepSmall } from '../styled';
import { CarouselItem } from './styled';
import { Record } from '../DocumentsPage';
import { components } from '../../../containers/productOptimizer/CurrentProduct';
import { EditCellType } from '../../StrategyPage/Drawer/EditCell';

const CardDetails = (props: { record: Record }) => {
  const { record } = props;
  const onEdit = (value: any, name: string, rowIndex: number) => {
    console.log({ value, name, rowIndex });
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
      <TitleStep>What the advice covers</TitleStep>
      <TitleStepSmall>Record the scope of advice, as agreed between you and the client.</TitleStepSmall>

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
