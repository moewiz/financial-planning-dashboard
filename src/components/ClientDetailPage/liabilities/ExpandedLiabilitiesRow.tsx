import React from 'react';
import { get, map } from 'lodash';
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
import { ASSET_TYPES, LIABILITIES_TYPES, repaymentTypeOptions, waitingPeriodTypeOptions } from '../../../enums/options';

export interface LiabilityProps {
  description: string;
  type: string;
  expandable: object;
  drawdowns?: Array<{ value: number; from: object; to: object }>;
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
  const { type } = record;
  const directInvestmentsOptions = map(
    assets.filter((asset) => ASSET_TYPES[asset.type] === ASSET_TYPES.directInvestment),
    (asset) => ({ value: asset.refId, label: asset.description }),
  );

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
