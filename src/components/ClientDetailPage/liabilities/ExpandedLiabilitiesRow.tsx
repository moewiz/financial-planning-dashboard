import React from 'react';
import { get } from 'lodash';
import DrawdownsTable from './DrawdownsTable';
import {
  TypeDollarPrefix,
  TypePercentPrefix,
  ExpandedSelectGroup,
  PrefixSingleGroup,
  ExpandedAssetsInlineGroups,
  ExpandedAssetsGroups,
  ExpandedAssetsText,
} from '../assets/styled';
import EditableCell from '../assets/EditableCell';
import {LIABILITIES_TYPES, waitingPeriodTypeOptions} from '../../../enums/options';

export interface LiabilityProps {
  description: string;
  type: string;
  expandable: object;
}

const repaymentTypeOptions = [
  {
    value: 'principalInterest',
    label: 'Principal and Interest',
  },
  {
    value: 'interest',
    label: 'Interest Only',
  },
  {
    value: 'interest',
    label: 'Direct Investment',
  },
];

const ExpandedLiabilitiesRow = (props: {
  record: LiabilityProps;
  index: number;
  indent: number;
  expanded: boolean;
  maritalState: string;
}) => {
  const { record, index } = props;
  const { type } = record;

  return (
    <ExpandedAssetsGroups>
      <ExpandedAssetsInlineGroups>
        <ExpandedAssetsText>The deductibility of this ({get(LIABILITIES_TYPES, type)} Loan) is</ExpandedAssetsText>
        <PrefixSingleGroup>
          <EditableCell
            record={record}
            dataIndex={'expandable.deductibility'}
            type={'text'}
            tableName={'liabilities'}
            rowIndex={index}
            editable={true}
            expandedField={true}
          />
          <TypePercentPrefix>%</TypePercentPrefix>
        </PrefixSingleGroup>
      </ExpandedAssetsInlineGroups>
      <ExpandedAssetsInlineGroups>
        <ExpandedAssetsText>The repayment amount of this (Deductible Loan) is</ExpandedAssetsText>
        <PrefixSingleGroup dollar>
          <TypeDollarPrefix>$</TypeDollarPrefix>
          <EditableCell
            record={record}
            dataIndex={'expandable.repaymentAmount'}
            type={'text'}
            tableName={'liabilities'}
            rowIndex={index}
            editable={true}
            expandedField={true}
          />
        </PrefixSingleGroup>
        <ExpandedAssetsText>with repayment type of </ExpandedAssetsText>
        <ExpandedSelectGroup>
          <EditableCell
            record={record}
            dataIndex={'expandable.repaymentType'}
            type={'select'}
            tableName={'liabilities'}
            options={repaymentTypeOptions}
            rowIndex={index}
            editable={true}
            expandedField={true}
          />
        </ExpandedSelectGroup>
        <ExpandedAssetsText>for a term of </ExpandedAssetsText>
        <PrefixSingleGroup>
          <EditableCell
            record={record}
            dataIndex={'expandable.durationLength'}
            type={'text'}
            tableName={'liabilities'}
            rowIndex={index}
            editable={true}
            expandedField={true}
          />
        </PrefixSingleGroup>
        <ExpandedSelectGroup>
          <EditableCell
            record={record}
            dataIndex={'expandable.durationType'}
            type={'select'}
            tableName={'liabilities'}
            rowIndex={index}
            editable={true}
            expandedField={true}
            options={waitingPeriodTypeOptions}
          />
        </ExpandedSelectGroup>
      </ExpandedAssetsInlineGroups>
      <ExpandedAssetsInlineGroups>
        <ExpandedAssetsText>This loan has a credit limit of </ExpandedAssetsText>
        <PrefixSingleGroup dollar>
          <TypeDollarPrefix>$</TypeDollarPrefix>
          <EditableCell
            record={record}
            dataIndex={'expandable.creditLimit'}
            type={'text'}
            tableName={'liabilities'}
            rowIndex={index}
            editable={true}
            expandedField={true}
          />
        </PrefixSingleGroup>
        <ExpandedAssetsText> with an associate asset of</ExpandedAssetsText>
        <ExpandedSelectGroup>
          <EditableCell
            record={record}
            dataIndex={'expandable.reinvest'}
            type={'select'}
            tableName={'liabilities'}
            options={repaymentTypeOptions}
            rowIndex={index}
            editable={true}
            expandedField={true}
          />
        </ExpandedSelectGroup>
      </ExpandedAssetsInlineGroups>

      <DrawdownsTable />
    </ExpandedAssetsGroups>
  );
};

export default ExpandedLiabilitiesRow;
