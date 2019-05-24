import React from 'react';
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
import { isOrNotOptions } from '../../../enums/options';

export interface AssetProps {
  description: string;
  type: string;
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

const ExpandedAssetsRow = (props: {
  record: AssetProps;
  index: number;
  indent: number;
  expanded: boolean;
  maritalState: string;
  addRow: (index: number, tableName: string, row: any) => void;
  deleteRow: (index: number, tableName: string, key: number) => void;
  dynamicCustomValue: object;
}) => {
  const { record, maritalState, index, addRow, deleteRow, dynamicCustomValue } = props;
  const { expandable, type } = record;

  switch (type) {
    case 'lifestyle':
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
              />
              <TypePercentPrefix>%</TypePercentPrefix>
            </PrefixSingleGroup>
            <ExpandedAssetsText>each year</ExpandedAssetsText>
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
              />
              <TypePercentPrefix>%</TypePercentPrefix>
            </PrefixSingleGroup>
            <ExpandedAssetsText>and adviser fees of</ExpandedAssetsText>
            <PrefixGroup dollar={expandable.adviserFeeType === 'dollar'}>
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
                percent={expandable.adviserFeeType !== 'dollar'}
                dollar={expandable.adviserFeeType === 'dollar'}
              >
                {expandable.adviserFeeType === 'dollar' && <TypeDollarPrefix>$</TypeDollarPrefix>}
                <EditableCell
                  record={record}
                  dataIndex={'expandable.adviserFeeValue'}
                  type={'number'}
                  tableName={'assets'}
                  rowIndex={index}
                  editable={true}
                  expandedField={true}
                />
                {expandable.adviserFeeType !== 'dollar' && <TypePercentPrefix>%</TypePercentPrefix>}
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
            maritalState={maritalState}
            addRow={addRow}
            deleteRow={deleteRow}
          />
        </ExpandedAssetsGroups>
      );
    case 'super':
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
                dataIndex={'expandable.taxableComponent'}
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
              />
              <TypePercentPrefix>%</TypePercentPrefix>
            </PrefixSingleGroup>
            <ExpandedAssetsText>and adviser fees of</ExpandedAssetsText>

            {/* TODO: Prefix OR suffix and Free Text component */}
            <PrefixGroup dollar={expandable.adviserFeeType === 'dollar'}>
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
              />
              <TypePercentPrefix>%</TypePercentPrefix>
            </PrefixSingleGroup>
          </ExpandedAssetsInlineGroups>
          <SGContributionTable
            data={(record.sgContribution && [record.sgContribution]) || []}
            index={index}
            tableName={'sgContribution'}
            titleTable={'SG Contribution'}
            dynamicCustomValue={dynamicCustomValue}
          />
          <ContributionWithdrawalsTable
            data={record.contributionWithdrawals || []}
            index={index}
            titleTable={'Contribution/Withdrawals'}
            tableName={'contributionWithdrawals'}
            maritalState={maritalState}
            addRow={addRow}
            deleteRow={deleteRow}
          />
        </ExpandedAssetsGroups>
      );
    case 'pension':
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
                dataIndex={'expandable.taxableComponent'}
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
            {expandable.isDeemed === false && (
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
              />
              <TypePercentPrefix>%</TypePercentPrefix>
            </PrefixSingleGroup>
            <ExpandedAssetsText>and adviser fees of</ExpandedAssetsText>

            {/* TODO: Prefix OR suffix and Free Text component */}
            <PrefixGroup dollar={expandable.adviserFeeType === 'dollar'}>
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
                />
                <TypePercentPrefix>%</TypePercentPrefix>
              </PrefixViewGroup>
            </PrefixGroup>
          </ExpandedAssetsInlineGroups>

          <ContributionWithdrawalsTable
            data={record.pensionIncome || []}
            index={index}
            titleTable={'Pension income'}
            tableName={'pensionIncome'}
            maritalState={maritalState}
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
