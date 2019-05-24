import { ASSET_TYPES, FROM_1, investmentTypeOptions, maritalStateOptions, OWNER } from '../enums/options';

export function addJointOption(
  col: { dataIndex: string },
  record: { type: string },
  options: Array<{ value: any; label: any }>,
) {
  const result = options;
  if (
    ASSET_TYPES[record.type] === ASSET_TYPES.lifestyle ||
    ASSET_TYPES[record.type] === ASSET_TYPES.directInvestment ||
    ASSET_TYPES[record.type] === ASSET_TYPES.property
  ) {
    result.push({
      value: 'joint',
      label: 'Joint',
    });
  }

  return result;
}

// Marital State is Single
export function removePartnerOption(
  col: { dataIndex?: string; options?: any },
  maritalState: string,
  options?: Array<{ value: any; label: any }>,
) {
  let result = options ? options : col.options;
  if (result && col.dataIndex) {
    switch (col.dataIndex) {
      case 'from':
      case 'to': {
        result = result.filter((option: any) => option.label !== FROM_1.partnerRetirement);
        break;
      }
      case 'owner': {
        result = result.filter((option: any) => option.label !== OWNER.partner);
      }
    }
  }

  return result;
}

function addInflationOptions(options: any[], dynamicCustomValue: { [key: string]: any }) {
  options.unshift(
    { value: 'salaryInflation', label: `Salary Inflation (CPI) = ${dynamicCustomValue.salaryInflation}%` },
    { value: 'inflationCPI', label: `Inflation (CPI) = ${dynamicCustomValue.inflationCPI}%` },
  );
  return options;
}

function addDefaultSgcRate(options: any[], dynamicCustomValue: { [key: string]: any }) {
  options.unshift({ value: 'sgc', label: `Default SG rate = ${dynamicCustomValue.sgcRate}%` });
  return options;
}

function loadInvestmentOptions(record: { type: string }) {
  switch (ASSET_TYPES[record.type]) {
    case ASSET_TYPES.lifestyle: {
      return [
        { value: 'primaryResidence', label: 'Primary Residence' },
        { value: 'homeContents', label: 'Home Contents' },
        { value: 'motorVehicles', label: 'Motor Vehicles' },
      ];
    }
    case ASSET_TYPES.directInvestment: {
      return [
        { value: 'cash', label: 'Cash' },
        { value: 'fixedInterest', label: 'Fixed Interest' },
        { value: 'australianEquity', label: 'Australian Equity' },
        { value: 'internationalEquity', label: 'International Equity' },
        { value: 'property', label: 'Property' },
        { value: 'growthAlternatives', label: 'Growth Alternatives' },
        { value: 'defensiveAlternatives', label: 'Defensive Alternatives' },
        { value: 'preservationProfile', label: 'Preservation profile' },
        { value: 'defensiveProfile', label: 'Defensive profile' },
        { value: 'moderateProfile', label: 'Moderate profile' },
        { value: 'balancedProfile', label: 'Balanced profile' },
        { value: 'growthProfile', label: 'Growth profile' },
        { value: 'highGrowthProfile', label: 'High Growth profile' },
      ];
    }
    case ASSET_TYPES.super:
    case ASSET_TYPES.abp:
    case ASSET_TYPES.ttr: {
      return [
        { value: 'preservation', label: 'Preservation' },
        { value: 'defensive', label: 'Defensive' },
        { value: 'moderate', label: 'Moderate' },
        { value: 'balanced', label: 'Balanced' },
        { value: 'growth', label: 'Growth' },
        { value: 'highGrowth', label: 'Growth' },
      ];
    }
  }
  return investmentTypeOptions;
}

export function loadOptionsBaseOnCol(
  col: { dataIndex: string; options?: Array<{ value: any; label: any }> },
  record: { type: string },
  customValue: { maritalState?: string; dynamicCustomValue?: object },
) {
  const { maritalState, dynamicCustomValue } = customValue;
  if (col.options) {
    let options = [...col.options];

    if (col.dataIndex === 'owner' && record.type && options) {
      options = addJointOption(col, record, options);
    }
    if (maritalState === maritalStateOptions[1].value) {
      // Marital State is Single
      options = removePartnerOption(col, maritalState, options);
    }
    if (dynamicCustomValue) {
      if (col.dataIndex === 'indexation') {
        options = addInflationOptions(options, dynamicCustomValue);
      }
      if (col.dataIndex === 'sgrate') {
        options = addDefaultSgcRate(options, dynamicCustomValue);
      }
    }
    if (col.dataIndex === 'investment' && record.type && options) {
      options = loadInvestmentOptions(record);
    }

    return options;
  }
  return;
}
