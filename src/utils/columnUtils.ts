import { maritalStateOptions } from '../enums/options';

export function removePartnerOption(col: any, maritalState: string) {
  // Marital State is Single
  let options = col.options;
  if (
    (col.dataIndex === 'from' || col.dataIndex === 'to') &&
    maritalState === maritalStateOptions[1].value &&
    options
  ) {
    options = options.filter((option: any) => option.value !== 'partnerRetirement');
  }

  return options;
}
