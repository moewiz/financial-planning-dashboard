import React from 'react';
import { get } from 'lodash';
import ContributionWithdrawalsTable from './ContributionWithdrawalsTable';
import SGContributionTable from './SGContributionTable';
import EditableCell from '../assets/EditableCell';
import { PrefixGroup, TypeDollarPrefix, TypePercentPrefix,
  PrefixViewGroup, PrefixChooseGroup, PrefixSingleGroup, ExpandedAssetsInlineGroups,
  ExpandedAssetsGroups, ExpandedAssetsText, ExpandedAssetsBlock, ExpandedSelectGroup } from './styled';

  
export interface AssetProps {
  description: string;
  type: string;
  expandable: {
    riskProfile: string;
    adviserFeeType: string;
    lookingForCoupleAdvice?: boolean;
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

const profileText = {
  defensive: 'defensive',
  highGrowth: 'high growth',
};

const ExpandedAssetsRow = (record: AssetProps, index: number, indent: number, expanded: boolean): React.ReactNode => {
  const { expandable, type } = record;
  const { riskProfile, lookingForCoupleAdvice } = expandable;
  // const [adviserFeeType, setAdviserFeeType] = React.useState(expandable.adviserFeeType);
  // const handleChangeAdviserFeeType = (param: any) => {
  //   const { value } = param;
  //   setAdviserFeeType(value);
  // }

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
            <PrefixSingleGroup>
              <EditableCell
                record={record}
                dataIndex={'expandable.costBase'}
                type={'text'}
                tableName={'assets'}
                rowIndex={index}
                editable={true}
                expandedField={true}
              />
              <TypePercentPrefix>%</TypePercentPrefix>
            </PrefixSingleGroup>
            <ExpandedAssetsText>
              and
            </ExpandedAssetsText>
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
            <ExpandedAssetsText>
              for CGT
            </ExpandedAssetsText>
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
            <ExpandedAssetsText>
              and adviser fees of
            </ExpandedAssetsText>
            <PrefixGroup dollar={expandable.adviserFeeType === 'dollar' ? true : false}>
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
            <ExpandedAssetsText>
            be re-invested
            </ExpandedAssetsText>
          </ExpandedAssetsInlineGroups>
          <ContributionWithdrawalsTable />
        </ExpandedAssetsGroups>
      );
    case 'contribution':
      return <div>The value of this (Lifestyle Asset) will grow by X% each year</div>;
    case 'withdrawal':
      return <div>The value of this (Lifestyle Asset) will grow by X% each year</div>;
    case 'pension':
      return <div>The value of this (Lifestyle Asset) will grow by X% each year</div>;
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
  return (
    <div>
      <p>
        This super has a taxable component of <b>{get(profileText, riskProfile)}</b> and a tax-free component of{' '}
        <b>{get(profileText, riskProfile)}</b>
      </p>
      <p>
        This income generated is <b>15%</b> and comes with an insurance cost of <b>$4,500</b>
      </p>
      <p>
        This rate terms are <b>15%</b> growth <b>10%</b> franked and <b>25%</b> contribution to income
      </p>
      <p>
        Client is seeking advice for <b>{lookingForCoupleAdvice ? 'couple' : 'couple'}</b>
      </p>
      {record.type === 'Super' && <SGContributionTable />}
    </div>
  );
};

export default ExpandedAssetsRow;
