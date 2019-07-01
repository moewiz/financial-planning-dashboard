import React, { PureComponent } from 'react';
import DrawerTable from './DrawerTable';
import { MainDrawerSection, TabsCustomized, TabsPaneCustomized } from './styled';
import { ActiveTabAction } from '../../../reducers/drawer';

const rows = [
  {
    key: 'openingValue',
    title: 'Opening Value',
    children: [
      {
        key: 'taxable',
        title: 'Taxable Component',
        values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      {
        key: 'taxFree',
        title: 'Tax Free Component',
        values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    ],
  },
  {
    key: 'contributions',
    title: 'Contributions',
    children: [
      {
        key: 'employerContribution',
        title: 'Employer Contribution (SG)',
        values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        editable: true,
      },
      {
        key: 'salarySacrificeContribution',
        title: 'Salary Sacrifice Contribution',
        values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        editable: true,
      },
      {
        key: 'personalDeductibleContribution',
        title: 'Personal Deductible Contribution',
        values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        editable: true,
      },
      {
        key: 'nonConcessionalContribution',
        title: 'Non-concessional Contribution',
        values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        editable: true,
      },
      {
        key: 'governmentCoContribution',
        title: 'Government Co-contribution',
        values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        tooltip: 'Assessable taxable income: $xx,xxx',
      },
      {
        key: 'spouseContribution',
        title: 'Spouse Contribution',
        values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        editable: true,
      },
    ],
  },
  {
    key: 'earnings',
    title: 'Earnings',
    children: [
      {
        key: 'growth',
        title: 'Growth',
        values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      {
        key: 'income',
        title: 'Income',
        values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      {
        key: 'frankingCredits',
        title: 'Franking Credits',
        values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    ],
  },
  {
    key: 'ongoingCosts',
    title: 'Ongoing Costs',
    children: [
      {
        key: 'investmentCosts',
        title: 'Investment Costs',
        values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      {
        key: 'adviserFees',
        title: 'Adviser Fees',
        values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        editable: true,
      },
      {
        key: 'insurancePremiums',
        title: 'Insurance Premiums',
        values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        editable: true,
      },
    ],
  },
  {
    key: 'withdrawalsTransfers',
    title: 'Withdrawals / Transfers',
    children: [
      {
        key: 'lumpSumWithdrawal',
        title: 'Lump sum withdrawal',
        values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        editable: true,
      },
      {
        key: 'contributionSplitting',
        title: 'Contribution splitting',
        values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        editable: true,
      },
      {
        key: 'pensionRollover',
        title: 'Pension rollover',
        values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        editable: true,
      },
    ],
  },
  {
    key: 'excessContributions',
    title: 'Excess Contributions (assessed for personal tax)',
    children: [
      {
        key: 'excessNonConcessional',
        title: 'Excess non-concessional',
        values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        children: [
          {
            key: 'override',
            title: 'Override',
            values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            editable: true,
          },
        ],
      },
      {
        key: 'excessConcessional',
        title: 'Excess concessional',
        values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        children: [
          {
            key: 'override',
            title: 'Override',
            values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            editable: true,
          },
        ],
      },
    ],
  },
  {
    key: 'taxPayable',
    title: 'Tax Payable',
    children: [
      {
        key: 'taxOnInvestmentEarnings',
        title: 'Tax on investment earnings',
        values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      {
        key: 'taxOnContributions',
        title: 'Tax on contributions',
        values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      {
        key: 'contributionsSurcharge',
        title: 'Contributions surcharge',
        values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      {
        key: 'manualAdjustmentOverrideTax',
        title: 'Manual adjustment / override tax',
        values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        editable: true,
      },
    ],
  },
  {
    key: 'closingValue',
    title: 'Closing Value',
    children: [
      {
        key: 'taxableComponent',
        title: 'Taxable Component',
        values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      {
        key: 'taxFreeComponent',
        title: 'Tax Free Component',
        values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    ],
  },
  {
    key: 'closingValuePV',
    title: 'Closing Value (PV)',
    values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
];

const columns = [
  '2019/20',
  '2020/21',
  '2021/22',
  '2022/23',
  '2023/24',
  '2024/25',
  '2025/26',
  '2026/27',
  '2027/28',
  '2028/29',
];

interface MainDrawerContentProps {
  tabActive: string;
  activeTab: (tabActive: string) => ActiveTabAction;
}

class MainDrawerContent extends PureComponent<MainDrawerContentProps> {
  public callback = (tabActive: string) => {
    const { activeTab } = this.props;
    activeTab(tabActive);
  }

  public render() {
    const { tabActive } = this.props;

    return (
      <MainDrawerSection>
        <TabsCustomized defaultActiveKey={tabActive} onChange={this.callback}>
          <TabsPaneCustomized tab="Client" key="client">
            <DrawerTable columns={columns} rows={rows} />
          </TabsPaneCustomized>
          <TabsPaneCustomized tab="Partner" key="partner">
            <DrawerTable columns={columns} rows={rows} />
          </TabsPaneCustomized>
        </TabsCustomized>
      </MainDrawerSection>
    );
  }
}

export default MainDrawerContent;
