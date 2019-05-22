import {ASSET_TYPES, FROM_1, maritalStateOptions, OWNER, ownerOptions} from '../enums/options';

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

export function removePartnerOption(
  col: { dataIndex?: string; options?: any },
  maritalState: string,
  options?: Array<{ value: any; label: any }>,
) {
  let result = options ? options : col.options;
  // Marital State is Single
  if (maritalState === maritalStateOptions[1].value && result && col.dataIndex) {
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
