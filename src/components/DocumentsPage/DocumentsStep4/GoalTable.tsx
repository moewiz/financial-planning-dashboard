import React from 'react';
import { get, map } from 'lodash';
import { Table } from 'antd';

import { Record, Row, StepProps } from '../DocumentsPage';
import { TitleStep } from '../styled';
import { EditCellType } from '../../StrategyPage/Drawer/EditCell';
import GoalEdit from './GoalEdit';
import { priorityOptions } from '../../../enums/options';

interface GoalTableProps {
  stepName: string;
  stepData: StepProps;
  setFieldValue: (field: string, value: any) => void;
  records: Record[];
}

const goalTableComponents = {
  body: {
    cell: GoalEdit,
  },
};

const columns = [
  {
    title: '',
    key: 'links',
    className: 'text-align-center',
    dataIndex: 'links',
    editable: true,
    type: EditCellType.linkCurrentProduct,
    width: 30,
  },
  {
    title: 'Goal',
    dataIndex: 'description',
    options: {
      placeholder: 'Enter description',
    },
    type: EditCellType.text,
    key: '0',
    editable: true,
    showLinks: true,
  },
  {
    title: 'Priority',
    dataIndex: 'priority',
    type: EditCellType.select,
    key: '1',
    options: priorityOptions,
    editable: true,
    width: 100,
  },
  {
    title: 'Time frame',
    dataIndex: 'timeFrame',
    type: EditCellType.text,
    key: '2',
    editable: true,
    width: 105,
  },
];

const GoalTable = (props: GoalTableProps) => {
  const { records, stepData, setFieldValue, stepName } = props;
  const tableData = get(stepData, 'table.data', []);
  const options = map(records, (record: Record) => ({
    value: record.header,
    label: record.header,
    children: map(record.table.data, (row: Row) => ({ value: row.id && row.id.toString(), label: row.value })),
  }));
  const onEdit = (value: any, name: string, rowIndex: number) => {
    const fieldName = `${stepName}.table.data.${rowIndex}.${name}`;
    setFieldValue(fieldName, value);
  };
  const getColumns = () =>
    map(columns, (col) => {
      if (col.type === EditCellType.linkCurrentProduct) {
        if (col.key === 'links') {
          return {
            ...col,
            onCell: (record: any, rowIndex: number) => ({
              ...col,
              record,
              rowIndex,
              type: col.type || 'text',
              onEdit,
              options: {
                data: options,
              },
            }),
          };
        }
      }

      if (col.editable) {
        return {
          ...col,
          onCell: (record: any, rowIndex: number) => ({
            ...col,
            record,
            rowIndex,
            type: col.type || 'text',
            onEdit,
          }),
        };
      }

      return col;
    });

  return (
    <>
      <TitleStep>{stepData.title}</TitleStep>
      <Table
        className="table-general documents-table goal-table"
        columns={getColumns()}
        dataSource={tableData}
        pagination={false}
        scroll={{ y: 400 }}
        components={goalTableComponents}
      />
    </>
  );
};

export default GoalTable;
