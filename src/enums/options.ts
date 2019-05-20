import { map } from 'lodash';

function mapOptionObjectToArray(object: { [key: string]: any }) {
  return map(object, (value: any, key: string) => ({ value: key, label: value }));
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
