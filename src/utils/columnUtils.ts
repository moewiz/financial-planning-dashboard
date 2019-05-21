import { ASSET_TYPES, maritalStateOptions } from '../enums/options';

export function addJointOption(
  col: { dataIndex: string },
  record: { type: string },
  options: Array<{ value: any; label: any }>,
) {
  const result = options;
  if (col.dataIndex === 'owner' && record.type && options) {
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
  }

  return result;
}

export function removePartnerOption(col: any, maritalState: string, options?: Array<{ value: any; label: any }>) {
  // Marital State is Single
  let result = options ? options : col.options;
  if (
    (col.dataIndex === 'from' || col.dataIndex === 'to') &&
    maritalState === maritalStateOptions[1].value &&
    result
  ) {
    result = result.filter((option: any) => option.value !== 'partnerRetirement');
  }

  return result;
}

export function loadOptionsBaseOnCol(
  col: { dataIndex: string; options?: Array<{ value: any; label: any }> },
  record: { type: string },
  maritalState: string,
) {
  if (col.options) {
    let options = [...col.options];
    options = addJointOption(col, record, options);
    options = removePartnerOption(col, maritalState, options);

    return options;
  }
  return;
}
