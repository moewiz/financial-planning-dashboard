import { map } from 'lodash';

function mapOptionObjectToArray(object: { [key: string]: any }) {
  return map(object, (value: any, key: string) => ({ value: key, label: value }));
}

function createIndexationOptions() : object {
  const options: {[key: string]: any} = {};
  for( let i = 0; i <= 10; i = i + 0.5 ) {
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

export const DID_OR_NOT = {
  true: 'did',
  false: 'did not',
};
export const didOrNotOptions = mapOptionObjectToArray(DID_OR_NOT);

export const LOOKING_FOR_COUPLE_ADVICE = {
  true: 'couple',
  false: 'single',
};
export const lookingForCoupleAdviceOptions = mapOptionObjectToArray(LOOKING_FOR_COUPLE_ADVICE);

export const IS_OR_NOT = {
  true: 'is',
  false: 'is not',
};
export const isOrNotOptions = mapOptionObjectToArray(IS_OR_NOT);

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
  ...createIndexationOptions(),
  otherNonTaxable: 'Other Non-Taxable',
};
export const indexationOptions = mapOptionObjectToArray(INDEXATION_OPTIONS);

export const ASSET_TYPES = {
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

