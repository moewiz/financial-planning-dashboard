import React from 'react';
import { Table } from 'antd';
import { map, isString } from 'lodash';
import cn from 'classnames';

import { TitleStep, TitleStepSmall } from '../styled';
import { CarouselItem } from './styled';
import { Record } from '../DocumentsPage';

const CardDetails = (props: { record: Record }) => {
  const { record } = props;
  const columns = map(record.table.columns, (column, index: number) => {
    if (isString(column)) {
      return ({ title: column, dataIndex: index === 0 ? 'value' : 'description' });
    }

    return column;
  });
  const dataSource = record.table.data;

  return (
    <CarouselItem>
      <TitleStep>What the advice covers</TitleStep>
      <TitleStepSmall>Record the scope of advice, as agreed between you and the client.</TitleStepSmall>

      <Table
        className={cn('table-general documents-table')}
        columns={columns}
        dataSource={dataSource}
        pagination={false}
      />
    </CarouselItem>
  );
};

export default CardDetails;
