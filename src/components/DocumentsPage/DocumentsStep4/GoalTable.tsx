import React from 'react';
import { get, map, last } from 'lodash';
import { FieldArrayRenderProps, FieldArray } from 'formik';
import { Table } from 'antd';
import uuid from 'uuid';

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
  dataList: any[];
}

const goalTableComponents = {
  body: {
    cell: GoalEdit,
  },
};

const placeholderRow = { id: -1, description: '', priority: 'low', timeFrame: new Date().getFullYear() };

class GoalTable extends React.Component<GoalTableProps> {
  public columns = [
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
      type: EditCellType.date,
      options: {
        pickerType: 'year',
      },
      key: '2',
      editable: true,
      width: 105,
    },
  ];

  public onEdit = (arrayHelpers: FieldArrayRenderProps) => (value: any, name: string, rowIndex: number) => {
    const { setFieldValue, dataList } = this.props;
    const rowName = `${arrayHelpers.name}.${rowIndex}`;
    const fieldName = `${rowName}.${name}`;
    setFieldValue(fieldName, value);
    const record = dataList[rowIndex];

    setTimeout(() => {
      const isLastRow = rowIndex === dataList.length - 1;
      if (isLastRow && record.id === -1 && name === 'description' && value.trim() !== '' && get(record, ['priority'])) {
        setFieldValue(`${rowName}.id`, uuid());
        arrayHelpers.push({ ...placeholderRow, key: uuid() });
      }
    }, 100);
  }

  public componentDidMount() {
    const { dataList, setFieldValue, stepName } = this.props;
    const lastRecord: any = last(dataList);
    if ((dataList.length > 0 && lastRecord && lastRecord.id !== -1) || dataList.length === 0) {
      const dataListWithPlaceholder = [...dataList, placeholderRow].map((data: any, index: number) => ({
        ...data,
        key: index,
      }));
      setFieldValue(`${stepName}.table.data`, dataListWithPlaceholder);
    }
  }

  public render() {
    const { records, stepData, stepName, dataList } = this.props;

    return (
      <>
        <TitleStep>{stepData.title}</TitleStep>
        <FieldArray
          name={`${stepName}.table.data`}
          render={(arrayHelpers: FieldArrayRenderProps) => {
            const options = map(records, (record: Record) => ({
              value: record.header,
              label: record.header,
              children: map(record.table.data, (row: Row) => ({
                value: row.id && row.id.toString(),
                label: row.value,
              })),
            }));
            const columns = map(this.columns, (col) => {
              if (col.type === EditCellType.linkCurrentProduct) {
                if (col.key === 'links') {
                  return {
                    ...col,
                    onCell: (record: any, rowIndex: number) => ({
                      ...col,
                      record,
                      rowIndex,
                      type: col.type || 'text',
                      onEdit: this.onEdit(arrayHelpers),
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
                    onEdit: this.onEdit(arrayHelpers),
                  }),
                };
              }

              return col;
            });

            return (
              <Table
                className="table-general documents-table goal-table"
                columns={columns}
                dataSource={dataList}
                pagination={false}
                scroll={{ y: 400 }}
                components={goalTableComponents}
              />
            );
          }}
          validateOnChange={false}
        />
      </>
    );
  }
}

export default GoalTable;
