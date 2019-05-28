import React, { useState, useEffect } from 'react';
import { get, map } from 'lodash';
import { notification } from 'antd';
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
import {
  ASSET_TYPES,
  LIABILITIES_TYPES,
  REPAYMENT_TYPE,
  repaymentTypeOptions,
  WAITING_PERIOD_TYPE,
  waitingPeriodTypeOptions,
} from '../../../enums/options';

export interface LiabilityProps {
  description: string;
  type: string;
  value: number;
  interest: number;
  expandable: {
    repaymentAmount: number;
    repaymentType: string;
    durationLength: number;
    durationType: string;
  };
  drawdowns?: Array<{ value: number; from: object; to: object }>;
}

function calculateMinimumRepaymentAmount(
  repaymentType: string,
  params: { value: number; interest: number; durationLength: number; durationType: string },
) {
  let PMT;
  const { value, interest, durationLength, durationType } = params;
  const n = WAITING_PERIOD_TYPE[durationType] === WAITING_PERIOD_TYPE.years ? durationLength : durationLength / 12;
  const r = interest;
  if (REPAYMENT_TYPE[repaymentType] === REPAYMENT_TYPE.interest) {
    PMT = value * r;
  } else {
    PMT = value * r * (Math.pow(1 + r, n) / Math.pow(1 + r, n - 1));
  }

  return PMT;
}

const ExpandedLiabilitiesRow = (props: {
  record: LiabilityProps;
  index: number;
  indent: number;
  expanded: boolean;
  maritalState: string;
  assets: Array<{ refId: number; description: string; type: string }>;
  addRow: (index: number, tableName: string, row: any) => void;
  deleteRow: (index: number, tableName: string, key: number) => void;
}) => {
  const { record, index, maritalState, assets, addRow, deleteRow } = props;
  const {
    type,
    value,
    interest,
    expandable: { repaymentType, durationLength, durationType },
  } = record;
  const directInvestmentsOptions = map(
    assets.filter((asset) => ASSET_TYPES[asset.type] === ASSET_TYPES.directInvestment),
    (asset) => ({ value: asset.refId, label: asset.description }),
  );
  const [minimumRepaymentAmount, setMinimumRepaymentAmount] = useState(
    calculateMinimumRepaymentAmount(repaymentType, { value, interest, durationLength, durationType }),
  );
  const handleBlur = (e: React.FocusEvent | number) => {
    const minimum = calculateMinimumRepaymentAmount(repaymentType, {
      value,
      interest,
      durationLength,
      durationType,
    });
    setMinimumRepaymentAmount(minimum);

    if (e < minimum) {
      notification.error({
        message: 'Error',
        description: 'Specified repayment amount should be higher than the minimum',
      });
    }
  };

  // Update minimum repayment amount automatically
  useEffect(() => {
    const minimum = calculateMinimumRepaymentAmount(repaymentType, {
      value,
      interest,
      durationLength,
      durationType,
    });
    setMinimumRepaymentAmount(minimum);
  });

  return (
    <ExpandedAssetsGroups>
      <ExpandedAssetsInlineGroups>
        <ExpandedAssetsText>The deductibility of this ({get(LIABILITIES_TYPES, type)} Loan) is</ExpandedAssetsText>
        <PrefixSingleGroup percent={true}>
          <EditableCell
            record={record}
            dataIndex={'expandable.deductibility'}
            type={'number'}
            tableName={'liabilities'}
            rowIndex={index}
            editable={true}
            expandedField={true}
            precision={1}
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
            type={'number'}
            tableName={'liabilities'}
            rowIndex={index}
            editable={true}
            expandedField={true}
            customMin={minimumRepaymentAmount}
            handleBlur={handleBlur}
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
            type={'number'}
            tableName={'liabilities'}
            rowIndex={index}
            editable={true}
            expandedField={true}
            precision={0}
            min={1}
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
            type={'number'}
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
            dataIndex={'expandable.associatedAssetRefId'}
            type={'select'}
            tableName={'liabilities'}
            options={directInvestmentsOptions}
            rowIndex={index}
            editable={true}
            expandedField={true}
          />
        </ExpandedSelectGroup>
      </ExpandedAssetsInlineGroups>

      <DrawdownsTable
        data={record.drawdowns || []}
        index={index}
        tableName={'drawdowns'}
        maritalState={maritalState}
        addRow={addRow}
        deleteRow={deleteRow}
      />
    </ExpandedAssetsGroups>
  );
};

export default ExpandedLiabilitiesRow;
