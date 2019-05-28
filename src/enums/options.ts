function mapOptionObjectToArray(object: { [key: string]: any }) {
  return Object.entries(object).map(([key, value]) => ({ value: key, label: value }));
}

function createRateOptions(step: number = 0.5, max: number = 10): object {
  const options: { [key: string]: any } = {};
  for (let i = 0; i <= max; i = i + step) {
    options[`${i.toString()}`] = `${i}%`;
  }
  return options;
}

export const MARITAL_STATE: { [key: string]: string } = {
  married: 'Married',
  single: 'Single',
};
export const maritalStateOptions = mapOptionObjectToArray(MARITAL_STATE);

export const GENDER = {
  male: 'Male',
  female: 'Female',
};
export const genderOptions = mapOptionObjectToArray(GENDER);

export const OWNER = {
  client: 'Client',
  partner: 'Partner',
};
export const ownerOptions = mapOptionObjectToArray(OWNER);

export const OWNER_WITH_JOINT = {
  client: 'Client',
  partner: 'Partner',
  joint: 'Joint',
};
export const ownerWithJointOptions = mapOptionObjectToArray(OWNER_WITH_JOINT);

export const EMP_STATUS: { [key: string]: string } = {
  employed: 'Employed',
  selfEmployed: 'Self Employed',
  retired: 'Retired',
  unemployed: 'Unemployed',
};
export const empStatusOptions = mapOptionObjectToArray(EMP_STATUS);

export const RISK_PROFILE = {
  preservation: 'preservation',
  defensive: 'defensive',
  moderate: 'moderate',
  balanced: 'balanced',
  growth: 'growth',
  highGrowth: 'high growth',
};
export const riskProfileOptions = mapOptionObjectToArray(RISK_PROFILE);

export const hasPrivateHealthInsuranceOptions = [
  { value: true, label: 'has' },
  { value: false, label: 'does not have' },
];

export const lookingForCoupleAdviceOptions = [{ value: true, label: 'couple' }, { value: false, label: 'individual' }];

export const isOrNotOptions = [{ value: true, label: 'is' }, { value: false, label: 'is not' }];

export const FROM_1 = {
  start: 'Start',
  clientRetirement: 'Client\'s Retirement',
  partnerRetirement: 'Partner\'s Retirement',
};
export const from1Options = mapOptionObjectToArray(FROM_1);

export const FROM_2 = {
  existing: 'Existing',
  start: 'Start',
  clientRetirement: 'Client\'s Retirement',
  partnerRetirement: 'Partner\'s Retirement',
};
export const from2Options = mapOptionObjectToArray(FROM_2);

export const TO_1 = {
  end: 'End',
  clientRetirement: 'Client\'s Retirement',
  partnerRetirement: 'Partner\'s Retirement',
};
export const to1Options = mapOptionObjectToArray(TO_1);

export const TO_2 = {
  retain: 'Retain',
  end: 'End',
  clientRetirement: 'Client\'s Retirement',
  partnerRetirement: 'Partner\'s Retirement',
};
export const to2Options = mapOptionObjectToArray(TO_2);

export const INCOME_TYPES = {
  employment: 'Employment',
  taxable: 'Centrelink Payment',
  otherTaxable: 'Other Taxable',
  otherNonTaxable: 'Other Non-Taxable',
};
export const incomeTypeOptions = mapOptionObjectToArray(INCOME_TYPES);

export const EXPENDITURE_TYPES = {
  postTax: 'Post-Tax',
  preTax: 'Pre-Tax',
};
export const expenditureTypeOptions = mapOptionObjectToArray(EXPENDITURE_TYPES);

export const INDEXATION_OPTIONS = {
  cpi: 'CPI',
  awote: 'AWOTE',
  ...createRateOptions(),
};
export const indexationOptions = mapOptionObjectToArray(INDEXATION_OPTIONS);

export const ASSET_TYPES: { [key: string]: string } = {
  lifestyle: 'Lifestyle',
  directInvestment: 'Direct Investment',
  abp: 'Account Based Pension',
  ttr: 'Transition to Retirement Pension',
  super: 'Super',
  property: 'Property',
};
export const assetTypes = mapOptionObjectToArray(ASSET_TYPES);

export const INVESTMENT_TYPES: { [key: string]: string } = {
  primaryResidence: 'Primary Residence',
  australianEquity: 'Australian Equity',
  preservation: 'Preservation',
  moderate: 'Moderate',
};
export const investmentTypeOptions = mapOptionObjectToArray(INVESTMENT_TYPES);

export const LIABILITIES_TYPES = {
  nonDeductible: 'Non-Deductible',
  deductible: 'Deductible',
};
export const liabilitiesTypes = mapOptionObjectToArray(LIABILITIES_TYPES);

export const yesNoOptions = [{ value: true, label: 'Yes' }, { value: false, label: 'No' }];

export const SG_RATE = {
  ...createRateOptions(1, 15),
};
export const sgRateOptions = mapOptionObjectToArray(SG_RATE);

export const COVER_TYPE: { [key: string]: string } = {
  life: 'Life',
  tpd: 'TPD',
  trauma: 'Trauma',
  childTrauma: 'Child Trauma',
  incomeProtection: 'Income Protection',
};
export const coverTypeOptions = mapOptionObjectToArray(COVER_TYPE);

export const POLICY_OWNER = {
  superFund: 'SuperFund',
  client: 'Client',
  partner: 'Partner',
};
export const policyOwnerOptions = mapOptionObjectToArray(POLICY_OWNER);

export const PREMIUM_TYPE = {
  level: 'Level',
  stepped: 'Stepped',
  hybrid: 'Hybrid',
};
export const premiumTypeOptions = mapOptionObjectToArray(PREMIUM_TYPE);

export const standaloneLinkedOptions = [{ value: true, label: 'Linked' }, { value: false, label: 'Stand-alone' }];

export const TPD_TYPE = {
  any: 'any',
  own: 'own',
  nonWorking: 'non working',
};
export const tpdTypeOptions = mapOptionObjectToArray(TPD_TYPE);

export const superlinkedOptions = [{ value: true, label: 'superlinked' }, { value: false, label: 'not superlinked' }];

export const INCOME_PROTECTION_TYPE = {
  agreedValue: 'Agreed Value',
  indemnity: 'Indemnity',
};
export const incomeProtectionTypeOptions = mapOptionObjectToArray(INCOME_PROTECTION_TYPE);

export const WAITING_PERIOD_TYPE: { [key: string]: string } = {
  // days: 'days',
  months: 'months',
  years: 'years',
};
export const waitingPeriodTypeOptions = mapOptionObjectToArray(WAITING_PERIOD_TYPE);

export const FEE_TYPE = {
  premium: 'Premium',
  policyFee: 'Policy Fee',
  stampDuty: 'Stamp Duty',
  other: 'Other',
};
export const feeTypeOptions = mapOptionObjectToArray(FEE_TYPE);

export const FREQUENCY = {
  yearly: 'Yearly',
  monthly: 'Monthly',
};
export const frequencyOptions = mapOptionObjectToArray(FREQUENCY);

export const CONTRIBUTION_WITHDRAWALS_TYPE: { [key: string]: string } = {
  salarySacrificePersonalDeductible: 'Salary Sacrifice / Personal Deductible Contributions',
  pnc: 'Personal Non-Concessional Contributions',
  spouse: 'Spouse Contributions',
  lumpSum: 'Lump Sum Withdrawals',
};
export const contributionWithdrawalsTypeOptions = mapOptionObjectToArray(CONTRIBUTION_WITHDRAWALS_TYPE);

export const PENSION_INCOME_TYPE: { [key: string]: string } = {
  minimum: 'Minimum',
  maximum: 'Maximum',
  custom: 'Custom',
  commute: 'Commute',
};
export const pensionIncomeTypeOptions = mapOptionObjectToArray(PENSION_INCOME_TYPE);

export const REPAYMENT_TYPE: { [key: string]: string } = {
  principalInterest: 'Principal and Interest',
  interest: 'Interest Only',
};

export const repaymentTypeOptions = mapOptionObjectToArray(REPAYMENT_TYPE);
