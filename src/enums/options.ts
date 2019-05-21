function mapOptionObjectToArray(object: { [key: string]: any }) {
  return Object.entries(object).map(([key, value]) => ({ value: key, label: value }));
}

function createRateOptions(step: number = 0.5, max: number = 10): object {
  const options: { [key: string]: any } = {};
  for (let i = 0; i <= max; i = i + step) {
    options[`${i}%`] = `${i}%`;
  }
  return options;
}

export const MARITAL_STATE = {
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

export const EMP_STATUS = {
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

export const didOrNotOptions = [{ value: true, label: 'did' }, { value: false, label: 'did not' }];

export const lookingForCoupleAdviceOptions = [{ value: true, label: 'couple' }, { value: false, label: 'single' }];

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
  salaryInflation: 'Salary Inflation',
  inflationCPI: 'Inflation (CPI)',
  ...createRateOptions(),
  otherNonTaxable: 'Other Non-Taxable',
};
export const indexationOptions = mapOptionObjectToArray(INDEXATION_OPTIONS);

export const ASSET_TYPES: { [key: string]: string } = {
  lifestyle: 'Lifestyle',
  directInvestment: 'Direct Investment',
  accountBased: 'Account Based',
  pension: 'Pension',
  super: 'Super',
  property: 'Property',
};
export const assetTypes = mapOptionObjectToArray(ASSET_TYPES);

export const INVESTMENT_TYPES = {
  primaryResidence: 'Primary Residence',
  australianEquity: 'Australian Equity',
  preservation: 'Preservation',
  moderate: 'Moderate',
};
export const investmentTypes = mapOptionObjectToArray(INVESTMENT_TYPES);

export const LIABILITIES_TYPES = {
  nonDeductible: 'Non-Deductible',
  deductible: 'Deductible',
};
export const liabilitiesTypes = mapOptionObjectToArray(LIABILITIES_TYPES);

export const yesNoOptions = [{ value: true, label: 'Yes' }, { value: false, label: 'No' }];

export const SG_RATE = {
  sgc: 'SGC',
  ...createRateOptions(1, 15),
};
export const sgRateOptions = mapOptionObjectToArray(SG_RATE);

export const COVER_TYPE = {
  life: 'Life',
  tpd: 'TPD',
  trauma: 'Trauma',
  incomeProtection: 'Income Protection',
};
export const coverTypeOptions = mapOptionObjectToArray(COVER_TYPE);

export const POLICY_OWNER = {
  superFund: 'SuperFund',
  client: 'Client',
  partner: 'Partner',
};
export const policyOwnerOptions = mapOptionObjectToArray(POLICY_OWNER);

export const TPD_TYPE = {
  any: 'Any',
  own: 'Own',
  nonWorking: 'Non Working',
};
export const tpdTypeOptions = mapOptionObjectToArray(TPD_TYPE);

export const INCOME_PROTECTION_TYPE = {
  agreedValue: 'Agreed Value',
  indemnity: 'Indemnity',
};
export const incomeProtectionTypeOptions = mapOptionObjectToArray(INCOME_PROTECTION_TYPE);

export const WAITING_PERIOD_TYPE = {
  days: 'Days',
  months: 'Months',
  years: 'Years',
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
