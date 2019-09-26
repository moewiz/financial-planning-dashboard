import { CurrentTypes } from './currents';
import { StrategyChoice } from './strategyChoices';

export const currentChoices: StrategyChoice = {
  [CurrentTypes.Income]: [
    {
      value: 'client',
      label: 'Client',
      children: [
        {
          value: 'employment',
          label: 'Employment',
        },
        {
          value: 'taxable',
          label: 'Centrelink Payment',
        },
        {
          value: 'otherTaxable',
          label: 'Other Taxable',
        },
        {
          value: 'otherNonTaxable',
          label: 'Other Non-Taxable',
        },
      ],
    },
    {
      value: 'partner',
      label: 'Partner',
      children: [
        {
          value: 'employment',
          label: 'Employment',
        },
        {
          value: 'taxable',
          label: 'Centrelink Payment',
        },
        {
          value: 'otherTaxable',
          label: 'Other Taxable',
        },
        {
          value: 'otherNonTaxable',
          label: 'Other Non-Taxable',
        },
      ],
    },
  ],
  [CurrentTypes.Expenditure]: [
    {
      value: 'client',
      label: 'Client',
      children: [
        {
          value: 'postTax',
          label: 'Post-Tax',
        },
        {
          value: 'preTax',
          label: 'Pre-Tax',
        },
      ],
    },
    {
      value: 'partner',
      label: 'Partner',
      children: [
        {
          value: 'postTax',
          label: 'Post-Tax',
        },
        {
          value: 'preTax',
          label: 'Pre-Tax',
        },
      ],
    },
  ],
  [CurrentTypes.Assets]: [
    {
      value: 'client',
      label: 'Client',
      children: [
        {
          value: 'lifestyle',
          label: 'Lifestyle',
        },
        {
          value: 'directInvestment',
          label: 'Direct Investment',
        },
        {
          value: 'abp',
          label: 'Account Based Pension',
        },
        {
          value: 'ttr',
          label: 'Transition to Retirement Pension',
        },
        {
          value: 'super',
          label: 'Super',
        },
        {
          value: 'property',
          label: 'Property',
        },
      ],
    },
    {
      value: 'partner',
      label: 'Partner',
      children: [
        {
          value: 'lifestyle',
          label: 'Lifestyle',
        },
        {
          value: 'directInvestment',
          label: 'Direct Investment',
        },
        {
          value: 'abp',
          label: 'Account Based Pension',
        },
        {
          value: 'ttr',
          label: 'Transition to Retirement Pension',
        },
        {
          value: 'super',
          label: 'Super',
        },
        {
          value: 'property',
          label: 'Property',
        },
      ],
    },
  ],
  [CurrentTypes.Liabilities]: [
    {
      value: 'client',
      label: 'Client',
      children: [
        {
          value: 'nonDeductible',
          label: 'Non-Deductible',
        },
        {
          value: 'deductible',
          label: 'Deductible',
        },
      ],
    },
    {
      value: 'partner',
      label: 'Partner',
      children: [
        {
          value: 'nonDeductible',
          label: 'Non-Deductible',
        },
        {
          value: 'deductible',
          label: 'Deductible',
        },
      ],
    },
  ],
};
