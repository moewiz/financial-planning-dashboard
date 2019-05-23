import { ASSET_TYPES, FROM_1, maritalStateOptions, OWNER, ownerOptions } from '../enums/options';

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

    return options;
  }
  return;
}
