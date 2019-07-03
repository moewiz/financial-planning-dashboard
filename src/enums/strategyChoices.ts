import { StrategyTypes } from './strategies';

interface Choice {
  value: string;
  label: string;
  children?: Choice[];
}

interface StrategyChoice {
  [key: string]: Choice[];
}

export const strategyChoices: StrategyChoice = {
  [StrategyTypes.Superannuation]: [
    {
      value: 'client',
      label: 'Client',
      children: [
        {
          value: 'salarySacrifice',
          label: 'Salary Sacrifice',
          children: [
            {
              value: 'maximise',
              label: 'Maximise',
            },
            {
              value: 'fixedRegular',
              label: 'Fixed - regular',
            },
            {
              value: 'customOneOff',
              label: 'Custom - one off',
            },
          ],
        },
        {
          value: 'nonConcessional',
          label: 'Non-concessional contribution',
          children: [
            {
              value: 'maximise',
              label: 'Maximise',
            },
            {
              value: 'fixedRegular',
              label: 'Fixed - regular',
            },
            {
              value: 'customOneOff',
              label: 'Custom - one off',
            },
          ],
        },
        {
          value: 'personalDeductible',
          label: 'Personal deductible contributions',
          children: [
            {
              value: 'maximise',
              label: 'Maximise',
            },
            {
              value: 'fixedRegular',
              label: 'Fixed - regular',
            },
            {
              value: 'customOneOff',
              label: 'Custom - one off',
            },
          ],
        },
        {
          value: 'spouse',
          label: 'Spouse contribution',
          children: [
            {
              value: 'oneOff',
              label: 'One off',
            },
            {
              value: 'regular',
              label: 'Regular',
            },
          ],
        },
        {
          value: 'recontribution',
          label: 'Recontribution',
          children: [
            {
              value: 'oneOff',
              label: 'One off',
            },
          ],
        },
      ],
    },
    {
      value: 'partner',
      label: 'Partner',
      children: [
        {
          value: 'salarySacrifice',
          label: 'Salary Sacrifice',
          children: [
            {
              value: 'maximise',
              label: 'Maximise',
            },
            {
              value: 'fixedRegular',
              label: 'Fixed - regular',
            },
            {
              value: 'customOneOff',
              label: 'Custom - one off',
            },
          ],
        },
        {
          value: 'nonConcessional',
          label: 'Non-concessional contribution',
          children: [
            {
              value: 'maximise',
              label: 'Maximise',
            },
            {
              value: 'fixedRegular',
              label: 'Fixed - regular',
            },
            {
              value: 'customOneOff',
              label: 'Custom - one off',
            },
          ],
        },
        {
          value: 'personalDeductible',
          label: 'Personal deductible contributions',
          children: [
            {
              value: 'maximise',
              label: 'Maximise',
            },
            {
              value: 'fixedRegular',
              label: 'Fixed - regular',
            },
            {
              value: 'customOneOff',
              label: 'Custom - one off',
            },
          ],
        },
        {
          value: 'spouse',
          label: 'Spouse contribution',
          children: [
            {
              value: 'oneOff',
              label: 'One off',
            },
            {
              value: 'regular',
              label: 'Regular',
            },
          ],
        },
        {
          value: 'recontribution',
          label: 'Recontribution',
          children: [
            {
              value: 'oneOff',
              label: 'One off',
            },
          ],
        },
      ],
    },
  ],
  [StrategyTypes.Pensions]: [
    {
      value: 'client',
      label: 'Client',
      children: [
        {
          value: 'commenceAccount',
          label: 'Commence account based pension',
          children: [
            {
              value: 'minimum',
              label: 'Minimum pension income',
            },
            {
              value: 'specified',
              label: 'Specified pension income',
            },
            {
              value: 'meetExpenses',
              label: 'Pension income to meet expenses',
            },
          ],
        },
        {
          value: 'commenceTransition',
          label: 'Commence transition to retirement pension',
          children: [
            {
              value: 'minimum',
              label: 'Minimum pension income',
            },
            {
              value: 'specified',
              label: 'Specified pension income',
            },
            {
              value: 'meetExpenses',
              label: 'Pension income to meet expenses',
            },
            {
              value: 'maximum',
              label: 'Maximum pension income',
            },
          ],
        },
      ],
    },
    {
      value: 'partner',
      label: 'Partner',
      children: [
        {
          value: 'commenceAccount',
          label: 'Commence account based pension',
          children: [
            {
              value: 'minimum',
              label: 'Minimum pension income',
            },
            {
              value: 'specified',
              label: 'Specified pension income',
            },
            {
              value: 'meetExpenses',
              label: 'Pension income to meet expenses',
            },
          ],
        },
        {
          value: 'commenceTransition',
          label: 'Commence transition to retirement pension',
          children: [
            {
              value: 'minimum',
              label: 'Minimum pension income',
            },
            {
              value: 'specified',
              label: 'Specified pension income',
            },
            {
              value: 'meetExpenses',
              label: 'Pension income to meet expenses',
            },
            {
              value: 'maximum',
              label: 'Maximum pension income',
            },
          ],
        },
      ],
    },
  ],
  [StrategyTypes.Investments]: [
    {
      value: 'client',
      label: 'Client',
      children: [
        {
          value: 'new',
          label: 'Establish a new investment portfolio',
          children: [
            {
              value: 'reinvest',
              label: 'Reinvest income',
            },
            {
              value: 'income',
              label: 'Income paid out',
            },
          ],
        },
        {
          value: 'existing',
          label: 'Add funds into existing investment portfolio',
          children: [
            {
              value: 'lumpSum',
              label: 'Lump sum contribution',
            },
            {
              value: 'regular',
              label: 'Regular contributions',
            },
          ],
        },
        {
          value: 'withdraw',
          label: 'Withdraw funds from investment portfolio',
          children: [
            {
              value: 'lumpSum',
              label: 'Lump sum withdrawal',
            },
            {
              value: 'regular',
              label: 'Regular drawdowns',
            },
          ],
        },
      ],
    },
    {
      value: 'partner',
      label: 'Partner',
      children: [
        {
          value: 'new',
          label: 'Establish a new investment portfolio',
          children: [
            {
              value: 'reinvest',
              label: 'Reinvest income',
            },
            {
              value: 'income',
              label: 'Income paid out',
            },
          ],
        },
        {
          value: 'existing',
          label: 'Add funds into existing investment portfolio',
          children: [
            {
              value: 'lumpSum',
              label: 'Lump sum contribution',
            },
            {
              value: 'regular',
              label: 'Regular contributions',
            },
          ],
        },
        {
          value: 'withdraw',
          label: 'Withdraw funds from investment portfolio',
          children: [
            {
              value: 'lumpSum',
              label: 'Lump sum withdrawal',
            },
            {
              value: 'regular',
              label: 'Regular drawdowns',
            },
          ],
        },
      ],
    },
    {
      value: 'joint',
      label: 'Joint',
      children: [
        {
          value: 'new',
          label: 'Establish a new investment portfolio',
          children: [
            {
              value: 'reinvest',
              label: 'Reinvest income',
            },
            {
              value: 'income',
              label: 'Income paid out',
            },
          ],
        },
        {
          value: 'existing',
          label: 'Add funds into existing investment portfolio',
          children: [
            {
              value: 'lumpSum',
              label: 'Lump sum contribution',
            },
            {
              value: 'regular',
              label: 'Regular contributions',
            },
          ],
        },
        {
          value: 'withdraw',
          label: 'Withdraw funds from investment portfolio',
          children: [
            {
              value: 'lumpSum',
              label: 'Lump sum withdrawal',
            },
            {
              value: 'regular',
              label: 'Regular drawdowns',
            },
          ],
        },
      ],
    },
  ],
  [StrategyTypes.Debt]: [
    {
      value: 'client',
      label: 'Client',
      children: [
        {
          value: 'payDown',
          label: 'Pay down loan',
          children: [
            {
              value: 'oneOff',
              label: 'One-off repayment',
            },
            {
              value: 'regular',
              label: 'Regular repayment',
            },
          ],
        },
        {
          value: 'reduce',
          label: 'Reduce loan repayments',
          children: [
            {
              value: 'ongoing',
              label: 'Ongoing repayments',
            },
          ],
        },
      ],
    },
    {
      value: 'partner',
      label: 'Partner',
      children: [
        {
          value: 'payDown',
          label: 'Pay down loan',
          children: [
            {
              value: 'oneOff',
              label: 'One-off repayment',
            },
            {
              value: 'regular',
              label: 'Regular repayment',
            },
          ],
        },
        {
          value: 'reduce',
          label: 'Reduce loan repayments',
          children: [
            {
              value: 'ongoing',
              label: 'Ongoing repayments',
            },
          ],
        },
      ],
    },
    {
      value: 'joint',
      label: 'Joint',
      children: [
        {
          value: 'payDown',
          label: 'Pay down loan',
          children: [
            {
              value: 'oneOff',
              label: 'One-off repayment',
            },
            {
              value: 'regular',
              label: 'Regular repayment',
            },
          ],
        },
        {
          value: 'reduce',
          label: 'Reduce loan repayments',
          children: [
            {
              value: 'ongoing',
              label: 'Ongoing repayments',
            },
          ],
        },
      ],
    },
  ],
  [StrategyTypes.Centrelink]: [
    {
      value: 'client',
      label: 'Client',
      children: [
        {
          value: 'centrelinkPayment',
          label: 'Apply for Centrelink payment',
          children: [
            {
              value: 'agePension',
              label: 'Age Pension',
            },
            {
              value: 'disabilitySupportPension',
              label: 'Disability Support Pension',
            },
            {
              value: 'newstartAllowance',
              label: 'Newstart Allowance',
            },
            {
              value: 'rentAssistance',
              label: 'Rent Assistance',
            },
          ],
        },
        {
          value: 'giftingStrategy',
          label: 'Gifting strategy',
          children: [
            {
              value: 'oneOff',
              label: 'One-off',
            },
          ],
        },
        {
          value: 'funeralBond',
          label: 'Funeral Bond',
          children: [
            {
              value: 'new',
              label: 'New funeral bond',
            },
            {
              value: 'existing',
              label: 'Add to existing funeral bond',
            },
          ],
        },
      ],
    },
    {
      value: 'partner',
      label: 'Partner',
      children: [
        {
          value: 'centrelinkPayment',
          label: 'Apply for Centrelink payment',
          children: [
            {
              value: 'agePension',
              label: 'Age Pension',
            },
            {
              value: 'disabilitySupportPension',
              label: 'Disability Support Pension',
            },
            {
              value: 'newstartAllowance',
              label: 'Newstart Allowance',
            },
            {
              value: 'rentAssistance',
              label: 'Rent Assistance',
            },
          ],
        },
        {
          value: 'giftingStrategy',
          label: 'Gifting strategy',
          children: [
            {
              value: 'oneOff',
              label: 'One-off',
            },
          ],
        },
        {
          value: 'funeralBond',
          label: 'Funeral Bond',
          children: [
            {
              value: 'new',
              label: 'New funeral bond',
            },
            {
              value: 'existing',
              label: 'Add to existing funeral bond',
            },
          ],
        },
      ],
    },
    {
      value: 'joint',
      label: 'Joint',
      children: [
        {
          value: 'centrelinkPayment',
          label: 'Apply for Centrelink payment',
          children: [
            {
              value: 'agePension',
              label: 'Age Pension',
            },
            {
              value: 'disabilitySupportPension',
              label: 'Disability Support Pension',
            },
            {
              value: 'newstartAllowance',
              label: 'Newstart Allowance',
            },
            {
              value: 'rentAssistance',
              label: 'Rent Assistance',
            },
          ],
        },
        {
          value: 'giftingStrategy',
          label: 'Gifting strategy',
          children: [
            {
              value: 'oneOff',
              label: 'One-off',
            },
          ],
        },
        {
          value: 'funeralBond',
          label: 'Funeral Bond',
          children: [
            {
              value: 'new',
              label: 'New funeral bond',
            },
            {
              value: 'existing',
              label: 'Add to existing funeral bond',
            },
          ],
        },
      ],
    },
  ],
};
