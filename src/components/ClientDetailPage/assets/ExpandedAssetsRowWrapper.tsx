import React from 'react';
import { get } from 'lodash';

import ContributionWithdrawalsTable from './ContributionWithdrawalsTable';
import SGContributionTable from './SGContributionTable';
import EditableCell from '../assets/EditableCell';
import {
  PrefixGroup,
  TypeDollarPrefix,
  TypePercentPrefix,
  PrefixViewGroup,
  PrefixChooseGroup,
  PrefixSingleGroup,
  ExpandedAssetsInlineGroups,
  ExpandedAssetsGroups,
  ExpandedAssetsText,
  ExpandedAssetsBlock,
  ExpandedSelectGroup,
} from './styled';
import {
  CONTRIBUTION_WITHDRAWALS_TYPE,
  contributionWithdrawalsTypeOptions,
  EMP_STATUS,
  from1Options,
  INVESTMENT_TYPES,
  isOrNotOptions,
  MARITAL_STATE,
  to1Options,
  yesNoOptions,
} from '../../../enums/options';
import PensionIncomeTable from './PensionIncomeTable';

export interface AssetProps {
  description: string;
  type: string;
  investment: string;
  expandable: {
    riskProfile?: string;
    adviserFeeType?: string;
    lookingForCoupleAdvice?: boolean;
    isDeemed?: boolean;
  };
  contributionWithdrawals?: object[];
  sgContribution?: object[];
  pensionIncome?: object[];
}
const isDeemedOptions = [
  {
    value: true,
    label: 'is deemed',
  },
  {
    value: false,
    label: 'has a deductible',
  },
];
const adviserFeeTypeOptions = [
  {
    value: 'dollar',
    label: '$',
  },
  {
    value: 'percent',
    label: '%',
  },
];
const defaultContributionWithdrawalColumns = [
  {
    key: 'operation',
    editable: false,
    width: 12,
  },
  {
    title: 'Type',
    dataIndex: 'type',
    width: 140,
    type: 'select',
    options: contributionWithdrawalsTypeOptions,
  },
  {
    title: 'Value',
    dataIndex: 'value',
    key: '1',
    width: 120,
    type: 'number',
    sign: 'dollar',
  },
  {
    title: 'From',
    dataIndex: 'from',
    key: '2',
    width: 120,
    type: 'date',
    pickerType: 'custom',
    options: from1Options,
    className: 'table-expand-datepicker',
  },
  {
    title: 'To',
    dataIndex: 'to',
    key: '3',
    width: 120,
    type: 'date',
    pickerType: 'custom',
    className: 'table-expand-datepicker',
    options: to1Options,
  },
];

const ExpandedAssetsRow = (props: {
  record: AssetProps;
  index: number;
  indent: number;
  expanded: boolean;
  maritalStatus: string;
  addRow: (index: number, tableName: string, row: any) => void;
  deleteRow: (index: number, tableName: string, key: number) => void;
  dynamicCustomValue: object;
  empStatus: string;
}) => {
  const { record, maritalStatus, index, addRow, deleteRow, dynamicCustomValue, empStatus } = props;
  const { expandable, type } = record;
  const contributionWithdrawalColumns = [...defaultContributionWithdrawalColumns];
  if (MARITAL_STATE[maritalStatus] === MARITAL_STATE.single) {
    const typeColumn = contributionWithdrawalColumns.find((column) => column.dataIndex === 'type');
    if (typeColumn) {
      typeColumn.options = contributionWithdrawalsTypeOptions.filter(
        (contributionType) =>
          CONTRIBUTION_WITHDRAWALS_TYPE[contributionType.value] !== CONTRIBUTION_WITHDRAWALS_TYPE.spouse,
      );
    }
  }

  switch (type) {
    case 'lifestyle':
      if (INVESTMENT_TYPES[record.investment] !== INVESTMENT_TYPES.primaryResidence) {
        return null;
      }

      return (
        <ExpandedAssetsBlock>
          <ExpandedAssetsInlineGroups>
            <ExpandedAssetsText>The value of this (Lifestyle Asset) will grow by</ExpandedAssetsText>
            <PrefixSingleGroup percent={true}>
              <EditableCell
                record={record}
                dataIndex={'expandable.growthRate'}
                type={'number'}
                tableName={'assets'}
                rowIndex={index}
                editable={true}
                expandedField={true}
                precision={1}
              />
              <TypePercentPrefix>%</TypePercentPrefix>
            </PrefixSingleGroup>
            <ExpandedAssetsText>each year</ExpandedAssetsText>
          </ExpandedAssetsInlineGroups>
          <ExpandedAssetsInlineGroups>
            <ExpandedAssetsText>The (Lifestyle Asset) has a cost base of</ExpandedAssetsText>
            <PrefixSingleGroup dollar={true}>
              <TypeDollarPrefix>$</TypeDollarPrefix>
              <EditableCell
                record={record}
                dataIndex={'expandable.costBase'}
                type={'number'}
                tableName={'assets'}
                rowIndex={index}
                editable={true}
                expandedField={true}
              />
            </PrefixSingleGroup>
            <ExpandedAssetsText>and</ExpandedAssetsText>
            <ExpandedSelectGroup>
              <EditableCell
                record={record}
                dataIndex={'expandable.isCGTAssessable'}
                type={'select'}
                tableName={'assets'}
                options={isOrNotOptions}
                rowIndex={index}
                editable={true}
                expandedField={true}
              />
            </ExpandedSelectGroup>
            <ExpandedAssetsText>CGT assessable</ExpandedAssetsText>
          </ExpandedAssetsInlineGroups>
        </ExpandedAssetsBlock>
      );
    case 'directInvestment':
      return (
        <ExpandedAssetsGroups>
          <ExpandedAssetsInlineGroups>
            <ExpandedAssetsText>Rate terms of the (Direct Investment) are:</ExpandedAssetsText>
            <PrefixSingleGroup percent={true}>
              <EditableCell
                record={record}
                dataIndex={'expandable.growthRate'}
                type={'number'}
                tableName={'assets'}
                rowIndex={index}
                editable={true}
                expandedField={true}
                precision={1}
              />
              <TypePercentPrefix>%</TypePercentPrefix>
            </PrefixSingleGroup>
            <ExpandedAssetsText>annual growth,</ExpandedAssetsText>
            <PrefixSingleGroup percent={true}>
              <EditableCell
                record={record}
                dataIndex={'expandable.incomeGenerated'}
                type={'number'}
                tableName={'assets'}
                rowIndex={index}
                editable={true}
                expandedField={true}
                precision={1}
              />
              <TypePercentPrefix>%</TypePercentPrefix>
            </PrefixSingleGroup>
            <ExpandedAssetsText>annual income,</ExpandedAssetsText>
            <PrefixSingleGroup percent={true}>
              <EditableCell
                record={record}
                dataIndex={'expandable.frankedRate'}
                type={'number'}
                tableName={'assets'}
                rowIndex={index}
                editable={true}
                expandedField={true}
                precision={1}
              />
              <TypePercentPrefix>%</TypePercentPrefix>
            </PrefixSingleGroup>
            <ExpandedAssetsText>franked.</ExpandedAssetsText>
          </ExpandedAssetsInlineGroups>
          <ExpandedAssetsInlineGroups>
            <ExpandedAssetsText>The (Direct Investment) has a cost base of</ExpandedAssetsText>
            <PrefixSingleGroup dollar>
              <TypeDollarPrefix>$</TypeDollarPrefix>
              <EditableCell
                record={record}
                dataIndex={'expandable.costBase'}
                type={'number'}
                tableName={'assets'}
                rowIndex={index}
                editable={true}
                expandedField={true}
              />
            </PrefixSingleGroup>
            <ExpandedAssetsText>and</ExpandedAssetsText>
            <ExpandedSelectGroup>
              <EditableCell
                record={record}
                dataIndex={'expandable.isCGTAssessable'}
                type={'select'}
                tableName={'assets'}
                options={isOrNotOptions}
                rowIndex={index}
                editable={true}
                expandedField={true}
              />
            </ExpandedSelectGroup>
            <ExpandedAssetsText>CGT assessable</ExpandedAssetsText>
          </ExpandedAssetsInlineGroups>

          <ExpandedAssetsInlineGroups>
            <ExpandedAssetsText>The (Direct Investment)</ExpandedAssetsText>
            <ExpandedSelectGroup>
              <EditableCell
                record={record}
                dataIndex={'expandable.isCentrelinkAssessable'}
                type={'select'}
                tableName={'assets'}
                options={isOrNotOptions}
                rowIndex={index}
                editable={true}
                expandedField={true}
              />
            </ExpandedSelectGroup>
            <ExpandedAssetsText>Centrelink assessable</ExpandedAssetsText>
          </ExpandedAssetsInlineGroups>

          <ExpandedAssetsInlineGroups>
            <ExpandedAssetsText>The (Direct Investment) has product fees of</ExpandedAssetsText>
            <PrefixSingleGroup percent={true}>
              <EditableCell
                record={record}
                dataIndex={'expandable.productFees'}
                type={'number'}
                tableName={'assets'}
                rowIndex={index}
                editable={true}
                expandedField={true}
                precision={1}
              />
              <TypePercentPrefix>%</TypePercentPrefix>
            </PrefixSingleGroup>
            <ExpandedAssetsText> and adviser fees of</ExpandedAssetsText>
            <PrefixGroup dollar={get(expandable, 'adviserFeeType') === 'dollar'}>
              <PrefixChooseGroup>
                <EditableCell
                  record={record}
                  dataIndex={'expandable.adviserFeeType'}
                  type={'select'}
                  tableName={'assets'}
                  options={adviserFeeTypeOptions}
                  rowIndex={index}
                  editable={true}
                  expandedField={true}
                />
              </PrefixChooseGroup>
              <PrefixSingleGroup
                percent={get(expandable, 'adviserFeeType') !== 'dollar'}
                dollar={get(expandable, 'adviserFeeType') === 'dollar'}
              >
                <TypeDollarPrefix>$</TypeDollarPrefix>
                <EditableCell
                  record={record}
                  dataIndex={'expandable.adviserFeeValue'}
                  type={'number'}
                  tableName={'assets'}
                  rowIndex={index}
                  editable={true}
                  expandedField={true}
                  precision={get(expandable, 'adviserFeeType') === 'dollar' ? 0 : 1}
                />
                <TypePercentPrefix>%</TypePercentPrefix>
              </PrefixSingleGroup>
            </PrefixGroup>
          </ExpandedAssetsInlineGroups>

          <ExpandedAssetsInlineGroups>
            <ExpandedAssetsText>The (Direct investment)</ExpandedAssetsText>
            <ExpandedSelectGroup>
              <EditableCell
                record={record}
                dataIndex={'expandable.reinvest'}
                type={'select'}
                tableName={'assets'}
                options={isOrNotOptions}
                rowIndex={index}
                editable={true}
                expandedField={true}
              />
            </ExpandedSelectGroup>
            <ExpandedAssetsText>reinvested</ExpandedAssetsText>
          </ExpandedAssetsInlineGroups>
          <ContributionWithdrawalsTable
            data={record.contributionWithdrawals || []}
            index={index}
            titleTable={'Contribution/Withdrawals'}
            tableName={'contributionWithdrawals'}
            maritalStatus={maritalStatus}
            addRow={addRow}
            deleteRow={deleteRow}
            columns={contributionWithdrawalColumns}
          />
        </ExpandedAssetsGroups>
      );
    case 'super':
      const superColumns = [
        ...contributionWithdrawalColumns,
        {
          title: 'Increase to limit',
          dataIndex: 'increaseToLimit',
          width: 120,
          type: 'select',
          options: yesNoOptions,
        },
      ];
      return (
        <ExpandedAssetsGroups>
          <ExpandedAssetsInlineGroups>
            <ExpandedAssetsText>Rate terms of the (Super) are:</ExpandedAssetsText>
            <PrefixSingleGroup percent={true}>
              <EditableCell
                record={record}
                dataIndex={'expandable.growthRate'}
                type={'number'}
                tableName={'assets'}
                rowIndex={index}
                editable={true}
                expandedField={true}
                precision={1}
              />
              <TypePercentPrefix>%</TypePercentPrefix>
            </PrefixSingleGroup>
            <ExpandedAssetsText>annual growth,</ExpandedAssetsText>
            <PrefixSingleGroup percent={true}>
              <EditableCell
                record={record}
                dataIndex={'expandable.incomeGenerated'}
                type={'number'}
                tableName={'assets'}
                rowIndex={index}
                editable={true}
                expandedField={true}
                precision={1}
              />
              <TypePercentPrefix>%</TypePercentPrefix>
            </PrefixSingleGroup>
            <ExpandedAssetsText>annual income,</ExpandedAssetsText>
            <PrefixSingleGroup percent={true}>
              <EditableCell
                record={record}
                dataIndex={'expandable.frankedRate'}
                type={'number'}
                tableName={'assets'}
                rowIndex={index}
                editable={true}
                expandedField={true}
                precision={1}
              />
              <TypePercentPrefix>%</TypePercentPrefix>
            </PrefixSingleGroup>
            <ExpandedAssetsText>franked.</ExpandedAssetsText>
          </ExpandedAssetsInlineGroups>
          <ExpandedAssetsInlineGroups>
            <ExpandedAssetsText>The (Super) has a taxable component of</ExpandedAssetsText>
            <PrefixSingleGroup dollar>
              <TypeDollarPrefix>$</TypeDollarPrefix>
              <EditableCell
                record={record}
                dataIndex={'expandable.taxableComponent'}
                type={'number'}
                tableName={'assets'}
                rowIndex={index}
                editable={true}
                expandedField={true}
              />
            </PrefixSingleGroup>
            <ExpandedAssetsText>and a tax-free component of</ExpandedAssetsText>
            <PrefixSingleGroup dollar>
              <TypeDollarPrefix>$</TypeDollarPrefix>
              <EditableCell
                record={record}
                dataIndex={'expandable.taxFreeComponent'}
                type={'number'}
                tableName={'assets'}
                rowIndex={index}
                editable={true}
                expandedField={true}
              />
            </PrefixSingleGroup>
          </ExpandedAssetsInlineGroups>

          <ExpandedAssetsInlineGroups>
            <ExpandedAssetsText>The (Super)</ExpandedAssetsText>
            <ExpandedSelectGroup>
              <EditableCell
                record={record}
                dataIndex={'expandable.isCentrelinkAssessable'}
                type={'select'}
                tableName={'assets'}
                options={isOrNotOptions}
                rowIndex={index}
                editable={true}
                expandedField={true}
              />
            </ExpandedSelectGroup>
            <ExpandedAssetsText>Centrelink assessable</ExpandedAssetsText>
            <ExpandedSelectGroup>
              <EditableCell
                record={record}
                dataIndex={'expandable.isDeemed'}
                type={'select'}
                tableName={'assets'}
                options={isDeemedOptions}
                rowIndex={index}
                editable={true}
                expandedField={true}
              />
            </ExpandedSelectGroup>
          </ExpandedAssetsInlineGroups>

          <ExpandedAssetsInlineGroups>
            <ExpandedAssetsText>The (Super) has product fees of</ExpandedAssetsText>
            <PrefixSingleGroup percent={true}>
              <EditableCell
                record={record}
                dataIndex={'expandable.productFees'}
                type={'number'}
                tableName={'assets'}
                rowIndex={index}
                editable={true}
                expandedField={true}
                precision={1}
              />
              <TypePercentPrefix>%</TypePercentPrefix>
            </PrefixSingleGroup>
            <ExpandedAssetsText> and adviser fees of</ExpandedAssetsText>

            {/* TODO: Prefix OR suffix and Free Text component */}
            <PrefixGroup dollar={get(expandable, 'adviserFeeType') === 'dollar'}>
              <PrefixChooseGroup>
                <EditableCell
                  record={record}
                  dataIndex={'expandable.adviserFeeType'}
                  type={'select'}
                  tableName={'assets'}
                  options={adviserFeeTypeOptions}
                  rowIndex={index}
                  editable={true}
                  expandedField={true}
                />
              </PrefixChooseGroup>
              <PrefixViewGroup>
                <TypeDollarPrefix>$</TypeDollarPrefix>
                <EditableCell
                  record={record}
                  dataIndex={'expandable.adviserFeeValue'}
                  type={'number'}
                  tableName={'assets'}
                  rowIndex={index}
                  editable={true}
                  expandedField={true}
                  precision={get(expandable, 'adviserFeeType') === 'dollar' ? 0 : 1}
                />
                <TypePercentPrefix>%</TypePercentPrefix>
              </PrefixViewGroup>
            </PrefixGroup>
          </ExpandedAssetsInlineGroups>

          <ExpandedAssetsInlineGroups>
            <ExpandedAssetsText>The (Super) has insurance cost of</ExpandedAssetsText>
            <PrefixSingleGroup percent={true}>
              <EditableCell
                record={record}
                dataIndex={'expandable.insuranceCost'}
                type={'number'}
                tableName={'assets'}
                rowIndex={index}
                editable={true}
                expandedField={true}
                precision={1}
              />
              <TypePercentPrefix>%</TypePercentPrefix>
            </PrefixSingleGroup>
          </ExpandedAssetsInlineGroups>
          {EMP_STATUS[empStatus] === EMP_STATUS.employed && (
            <SGContributionTable
              data={(record.sgContribution && [{ key: 0, ...record.sgContribution }]) || []}
              index={index}
              tableName={'sgContribution'}
              titleTable={'SG Contribution'}
              dynamicCustomValue={dynamicCustomValue}
            />
          )}
          <ContributionWithdrawalsTable
            data={record.contributionWithdrawals || []}
            index={index}
            titleTable={'Contribution/Withdrawals'}
            tableName={'contributionWithdrawals'}
            maritalStatus={maritalStatus}
            addRow={addRow}
            deleteRow={deleteRow}
            columns={superColumns}
          />
        </ExpandedAssetsGroups>
      );
    case 'abp':
    case 'ttr':
      return (
        <ExpandedAssetsGroups>
          <ExpandedAssetsInlineGroups>
            <ExpandedAssetsText>Rate terms of the (Pension) are:</ExpandedAssetsText>
            <PrefixSingleGroup percent={true}>
              <EditableCell
                record={record}
                dataIndex={'expandable.growthRate'}
                type={'number'}
                tableName={'assets'}
                rowIndex={index}
                editable={true}
                expandedField={true}
                precision={1}
              />
              <TypePercentPrefix>%</TypePercentPrefix>
            </PrefixSingleGroup>
            <ExpandedAssetsText>annual growth,</ExpandedAssetsText>
            <PrefixSingleGroup percent={true}>
              <EditableCell
                record={record}
                dataIndex={'expandable.incomeGenerated'}
                type={'number'}
                tableName={'assets'}
                rowIndex={index}
                editable={true}
                expandedField={true}
                precision={1}
              />
              <TypePercentPrefix>%</TypePercentPrefix>
            </PrefixSingleGroup>
            <ExpandedAssetsText>annual income,</ExpandedAssetsText>
            <PrefixSingleGroup percent={true}>
              <EditableCell
                record={record}
                dataIndex={'expandable.frankedRate'}
                type={'number'}
                tableName={'assets'}
                rowIndex={index}
                editable={true}
                expandedField={true}
                precision={1}
              />
              <TypePercentPrefix>%</TypePercentPrefix>
            </PrefixSingleGroup>
            <ExpandedAssetsText>franked.</ExpandedAssetsText>
          </ExpandedAssetsInlineGroups>
          <ExpandedAssetsInlineGroups>
            <ExpandedAssetsText>The (Pension) has a taxable component of</ExpandedAssetsText>
            <PrefixSingleGroup dollar>
              <TypeDollarPrefix>$</TypeDollarPrefix>
              <EditableCell
                record={record}
                dataIndex={'expandable.taxableComponent'}
                type={'number'}
                tableName={'assets'}
                rowIndex={index}
                editable={true}
                expandedField={true}
              />
            </PrefixSingleGroup>
            <ExpandedAssetsText>and a tax-free component</ExpandedAssetsText>
            <PrefixSingleGroup dollar>
              <TypeDollarPrefix>$</TypeDollarPrefix>
              <EditableCell
                record={record}
                dataIndex={'expandable.taxFreeComponent'}
                type={'number'}
                tableName={'assets'}
                rowIndex={index}
                editable={true}
                expandedField={true}
              />
            </PrefixSingleGroup>
          </ExpandedAssetsInlineGroups>

          <ExpandedAssetsInlineGroups>
            <ExpandedAssetsText>The (Pension)</ExpandedAssetsText>
            <ExpandedSelectGroup>
              <EditableCell
                record={record}
                dataIndex={'expandable.isCentrelinkAssessable'}
                type={'select'}
                tableName={'assets'}
                options={isOrNotOptions}
                rowIndex={index}
                editable={true}
                expandedField={true}
              />
            </ExpandedSelectGroup>
            <ExpandedAssetsText>Centrelink assessable and </ExpandedAssetsText>
            <ExpandedSelectGroup>
              <EditableCell
                record={record}
                dataIndex={'expandable.isDeemed'}
                type={'select'}
                tableName={'assets'}
                options={isDeemedOptions}
                rowIndex={index}
                editable={true}
                expandedField={true}
              />
            </ExpandedSelectGroup>
            {get(expandable, 'isDeemed') === false && (
              <>
                <ExpandedAssetsText>amount of</ExpandedAssetsText>
                <PrefixSingleGroup dollar>
                  <TypeDollarPrefix>$</TypeDollarPrefix>
                  <EditableCell
                    record={record}
                    dataIndex={'expandable.deductibleAmount'}
                    type={'number'}
                    tableName={'assets'}
                    rowIndex={index}
                    editable={true}
                    expandedField={true}
                  />
                </PrefixSingleGroup>
              </>
            )}
          </ExpandedAssetsInlineGroups>

          <ExpandedAssetsInlineGroups>
            <ExpandedAssetsText>The (Pension) has product fees of</ExpandedAssetsText>
            <PrefixSingleGroup percent={true}>
              <EditableCell
                record={record}
                dataIndex={'expandable.productFees'}
                type={'number'}
                tableName={'assets'}
                rowIndex={index}
                editable={true}
                expandedField={true}
                precision={1}
              />
              <TypePercentPrefix>%</TypePercentPrefix>
            </PrefixSingleGroup>
            <ExpandedAssetsText>and adviser fees of</ExpandedAssetsText>

            {/* TODO: Prefix OR suffix and Free Text component */}
            <PrefixGroup dollar={get(expandable, 'adviserFeeType') === 'dollar'}>
              <PrefixChooseGroup>
                <EditableCell
                  record={record}
                  dataIndex={'expandable.adviserFeeType'}
                  type={'select'}
                  tableName={'assets'}
                  options={adviserFeeTypeOptions}
                  rowIndex={index}
                  editable={true}
                  expandedField={true}
                />
              </PrefixChooseGroup>
              <PrefixViewGroup>
                <TypeDollarPrefix>$</TypeDollarPrefix>
                <EditableCell
                  record={record}
                  dataIndex={'expandable.adviserFeeValue'}
                  type={'number'}
                  tableName={'assets'}
                  rowIndex={index}
                  editable={true}
                  expandedField={true}
                  precision={get(expandable, 'adviserFeeType') === 'dollar' ? 0 : 1}
                />
                <TypePercentPrefix>%</TypePercentPrefix>
              </PrefixViewGroup>
            </PrefixGroup>
          </ExpandedAssetsInlineGroups>

          <PensionIncomeTable
            data={record.pensionIncome || []}
            index={index}
            titleTable={'Pension income'}
            tableName={'pensionIncome'}
            maritalStatus={maritalStatus}
            addRow={addRow}
            deleteRow={deleteRow}
          />
        </ExpandedAssetsGroups>
      );
    case 'property':
      return (
        <ExpandedAssetsGroups>
          <ExpandedAssetsInlineGroups>
            <ExpandedAssetsText>This (Property Asset) will grow by</ExpandedAssetsText>
            <PrefixSingleGroup percent={true}>
              <EditableCell
                record={record}
                dataIndex={'expandable.growthRate'}
                type={'number'}
                tableName={'assets'}
                rowIndex={index}
                editable={true}
                expandedField={true}
                precision={1}
              />
              <TypePercentPrefix>%</TypePercentPrefix>
            </PrefixSingleGroup>
            <ExpandedAssetsText>each year</ExpandedAssetsText>
          </ExpandedAssetsInlineGroups>
          <ExpandedAssetsInlineGroups>
            <ExpandedAssetsText>The (Property Asset) has a cost base of</ExpandedAssetsText>
            <PrefixSingleGroup dollar={true}>
              <TypeDollarPrefix>$</TypeDollarPrefix>
              <EditableCell
                record={record}
                dataIndex={'expandable.costBase'}
                type={'number'}
                tableName={'assets'}
                rowIndex={index}
                editable={true}
                expandedField={true}
              />
            </PrefixSingleGroup>
          </ExpandedAssetsInlineGroups>
          <ExpandedAssetsInlineGroups>
            <ExpandedAssetsText>The terms for this (Property Asset) are:</ExpandedAssetsText>
            <PrefixSingleGroup dollar={true}>
              <TypeDollarPrefix>$</TypeDollarPrefix>
              <EditableCell
                record={record}
                dataIndex={'expandable.rent'}
                type={'number'}
                tableName={'assets'}
                rowIndex={index}
                editable={true}
                expandedField={true}
              />
            </PrefixSingleGroup>
            <ExpandedAssetsText>rental income per month with expenses of</ExpandedAssetsText>
            <PrefixSingleGroup dollar={true}>
              <TypeDollarPrefix>$</TypeDollarPrefix>
              <EditableCell
                record={record}
                dataIndex={'expandable.expenses'}
                type={'number'}
                tableName={'assets'}
                rowIndex={index}
                editable={true}
                expandedField={true}
              />
            </PrefixSingleGroup>
            <ExpandedAssetsText>per month</ExpandedAssetsText>
          </ExpandedAssetsInlineGroups>
        </ExpandedAssetsGroups>
      );

    default:
      return <ExpandedAssetsGroups>This is default</ExpandedAssetsGroups>;
  }
};

export default ExpandedAssetsRow;
