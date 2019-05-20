import React from 'react';
import { get } from 'lodash';
import DrawdownsTable from './DrawdownsTable';
import {
  PrefixGroup,
  TypeDollarPrefix,
  TypePercentPrefix,
  PrefixViewGroup,
  ExpandedSelectGroup,
  PrefixChooseGroup,
  PrefixSingleGroup,
  ExpandedAssetsInlineGroups,
  ExpandedAssetsGroups,
  ExpandedAssetsText,
} from '../assets/styled';
import EditableCell from '../assets/EditableCell';


export interface LiabilityProps {
  description: string;
  expandable: {
    riskProfile: string;
    lookingForCoupleAdvice?: boolean;
  };
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

const ExpandedLiabilitiesRow = (record: LiabilityProps, index: number, indent: number, expanded: boolean): React.ReactNode => {
  const { expandable } = record;
  return (
    <ExpandedAssetsGroups>
      <ExpandedAssetsInlineGroups>
        <ExpandedAssetsText>The deductibility of this (Non-deductible Loan) is</ExpandedAssetsText>
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
        <ExpandedAssetsText>months</ExpandedAssetsText>
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
