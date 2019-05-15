import React from 'react';
import ContributionWithdrawalsTable from './ContributionWithdrawalsTable';
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

export interface AssetProps {
  description: string;
  type: string;
  expandable: {
    riskProfile?: string;
    adviserFeeType?: string;
    lookingForCoupleAdvice?: boolean;
    isDeemed?: boolean;
  };
}
const reinvestOptions = [
  {
    value: true,
    label: 'will',
  },
  {
    value: false,
    label: 'abc',
  },
];
const isCentrelinkAssessableOptions = [
  {
    value: true,
    label: 'is assessable',
  },
  {
    value: false,
    label: 'is not assessable',
  },
];
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
const isCGTAssessableOptions = [
  {
    value: true,
    label: 'is assessable',
  },
  {
    value: false,
    label: 'is not assessable',
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

const ExpandedAssetsRow = (record: AssetProps, index: number, indent: number, expanded: boolean): React.ReactNode => {
  const { expandable, type } = record;

  switch (type) {
    case 'lifestyle':
      return (
        <ExpandedAssetsBlock>
          <ExpandedAssetsInlineGroups>
            <ExpandedAssetsText>The value of this (Lifestyle Asset) will grow by</ExpandedAssetsText>
            <PrefixSingleGroup>
              <EditableCell
                record={record}
                dataIndex={'expandable.growthRate'}
                type={'text'}
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
            <PrefixSingleGroup>
              <EditableCell
                record={record}
                dataIndex={'expandable.growthRate'}
                type={'text'}
                tableName={'assets'}
                rowIndex={index}
                editable={true}
                expandedField={true}
              />
              <TypePercentPrefix>%</TypePercentPrefix>
            </PrefixSingleGroup>
            <ExpandedAssetsText>annual growth,</ExpandedAssetsText>
            <PrefixSingleGroup>
              <EditableCell
                record={record}
                dataIndex={'expandable.incomeGenerated'}
                type={'text'}
                tableName={'assets'}
                rowIndex={index}
                editable={true}
                expandedField={true}
              />
              <TypePercentPrefix>%</TypePercentPrefix>
            </PrefixSingleGroup>
            <ExpandedAssetsText>annual income,</ExpandedAssetsText>
            <PrefixSingleGroup>
              <EditableCell
                record={record}
                dataIndex={'expandable.frankedRate'}
                type={'text'}
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
                type={'text'}
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
                options={isCGTAssessableOptions}
                rowIndex={index}
                editable={true}
                expandedField={true}
              />
            </ExpandedSelectGroup>
            <ExpandedAssetsText>for CGT</ExpandedAssetsText>
          </ExpandedAssetsInlineGroups>

          <ExpandedAssetsInlineGroups>
            <ExpandedAssetsText>The (Direct Investment)</ExpandedAssetsText>
            <ExpandedSelectGroup>
              <EditableCell
                record={record}
                dataIndex={'expandable.isCentrelinkAssessable'}
                type={'select'}
                tableName={'assets'}
                options={isCentrelinkAssessableOptions}
                rowIndex={index}
                editable={true}
                expandedField={true}
              />
            </ExpandedSelectGroup>
            <ExpandedAssetsText>by Centrelink</ExpandedAssetsText>
          </ExpandedAssetsInlineGroups>

          <ExpandedAssetsInlineGroups>
            <ExpandedAssetsText>The (Direct Investment) has product fees of</ExpandedAssetsText>
            <PrefixSingleGroup>
              <EditableCell
                record={record}
                dataIndex={'expandable.productFees'}
                type={'text'}
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
              <PrefixViewGroup>
                <TypeDollarPrefix>$</TypeDollarPrefix>
                <EditableCell
                  record={record}
                  dataIndex={'expandable.adviserFeeValue'}
                  type={'text'}
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
            <ExpandedAssetsText>The (Direct investment)</ExpandedAssetsText>
            <ExpandedSelectGroup>
              <EditableCell
                record={record}
                dataIndex={'expandable.reinvest'}
                type={'select'}
                tableName={'assets'}
                options={reinvestOptions}
                rowIndex={index}
                editable={true}
                expandedField={true}
              />
            </ExpandedSelectGroup>
            <ExpandedAssetsText>be re-invested</ExpandedAssetsText>
          </ExpandedAssetsInlineGroups>
          <ContributionWithdrawalsTable />
        </ExpandedAssetsGroups>
      );
    case 'super':
      return <div>Super</div>;
    case 'accountBased':
      return <div>Account Based</div>;
    case 'pension':
      return (
        <ExpandedAssetsGroups>
          <ExpandedAssetsInlineGroups>
            <ExpandedAssetsText>Rate terms of the (Pension) are:</ExpandedAssetsText>
            <PrefixSingleGroup>
              <EditableCell
                record={record}
                dataIndex={'expandable.growthRate'}
                type={'text'}
                tableName={'assets'}
                rowIndex={index}
                editable={true}
                expandedField={true}
              />
              <TypePercentPrefix>%</TypePercentPrefix>
            </PrefixSingleGroup>
            <ExpandedAssetsText>annual growth,</ExpandedAssetsText>
            <PrefixSingleGroup>
              <EditableCell
                record={record}
                dataIndex={'expandable.incomeGenerated'}
                type={'text'}
                tableName={'assets'}
                rowIndex={index}
                editable={true}
                expandedField={true}
              />
              <TypePercentPrefix>%</TypePercentPrefix>
            </PrefixSingleGroup>
            <ExpandedAssetsText>annual income,</ExpandedAssetsText>
            <PrefixSingleGroup>
              <EditableCell
                record={record}
                dataIndex={'expandable.frankedRate'}
                type={'text'}
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
                type={'text'}
                tableName={'assets'}
                rowIndex={index}
                editable={true}
                expandedField={true}
              />
            </PrefixSingleGroup>
            <ExpandedAssetsText>and a tax-free component</ExpandedAssetsText>
            <ExpandedSelectGroup>
              <EditableCell
                record={record}
                dataIndex={'expandable.taxFreeComponent'}
                type={'select'}
                tableName={'assets'}
                options={isCGTAssessableOptions}
                rowIndex={index}
                editable={true}
                expandedField={true}
              />
            </ExpandedSelectGroup>
          </ExpandedAssetsInlineGroups>

          <ExpandedAssetsInlineGroups>
            <ExpandedAssetsText>The (Pension)</ExpandedAssetsText>
            <ExpandedSelectGroup>
              <EditableCell
                record={record}
                dataIndex={'expandable.isCentrelinkAssessable'}
                type={'select'}
                tableName={'assets'}
                options={isCentrelinkAssessableOptions}
                rowIndex={index}
                editable={true}
                expandedField={true}
              />
            </ExpandedSelectGroup>
            <ExpandedAssetsText>by Centrelink and </ExpandedAssetsText>
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
                    type={'text'}
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
            <PrefixSingleGroup>
              <EditableCell
                record={record}
                dataIndex={'expandable.productFees'}
                type={'text'}
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
                  type={'text'}
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
            <ExpandedAssetsText>The (Direct investment)</ExpandedAssetsText>
            <ExpandedSelectGroup>
              <EditableCell
                record={record}
                dataIndex={'expandable.reinvest'}
                type={'select'}
                tableName={'assets'}
                options={reinvestOptions}
                rowIndex={index}
                editable={true}
                expandedField={true}
              />
            </ExpandedSelectGroup>
            <ExpandedAssetsText>be re-invested</ExpandedAssetsText>
          </ExpandedAssetsInlineGroups>
          <ContributionWithdrawalsTable />
        </ExpandedAssetsGroups>
      );
    default:
      return (
        <div>
          Rate terms of the (Direct Investment) are: X% annual growth, Y% annual income, Z% franked. The (Direct
          Investment) has a cost base of $X and is assessable for CGT The (Direct Investment) is assessed by Centrelink
          The (Direct Investment) has product fees of X% and adviser fees of $X The (Direct investment) will be
          re-invested
          <ContributionWithdrawalsTable />
        </div>
      );
  }
};

export default ExpandedAssetsRow;
