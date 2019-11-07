import { EditCellType } from '../components/StrategyPage/Drawer/EditCell';

export const clientPartnerOptions = 'clientPartnerOptions';
export const specificOptions = [{ value: 'specific', label: 'Specific' }, { value: 'custom', label: 'Custom' }];
export const ddFreeTextOptions = [
  {
    value: 'customAmount',
    label: 'Custom amount',
    renderedLabel: '(Custom amount)',
  },
  {
    value: 'full_value',
    label: 'Full value',
  },
];
export const periodTypes = [
  {
    value: 'month',
    label: 'month',
  },
  {
    value: 'annum',
    label: 'annum',
  },
];
export const paydownOptions = [
  {
    value: 'reduce',
    label: 'reduce',
  },
  {
    value: 'eliminate',
    label: 'eliminate',
  },
];
export const varyOptions = [
  {
    value: 'increase',
    label: 'increase',
  },
  {
    value: 'reduce',
    label: 'reduce',
  },
];
export const powerOfAttorneyOptions = [
  {
    value: 'enduring',
    label: 'Enduring Power of Attorney',
  },
  {
    value: 'medical',
    label: 'Medical Power of Attorney',
  },
  {
    value: 'guardianship',
    label: 'Power of Guardianship',
  },
];
export const periodTimeOptions = [
  {
    value: 'weekly',
    label: 'weekly',
  },
  {
    value: 'fortnightly',
    label: 'fortnightly',
  },
  {
    value: 'monthly',
    label: 'monthly',
  },
  {
    value: 'quarterly',
    label: 'quarterly',
  },
];
export const beneficiaryOptions = [
  {
    value: 'binding',
    label: 'binding',
  },
  {
    value: 'non-binding',
    label: 'non-binding',
  },
  {
    value: 'non-lapsing',
    label: 'non-lapsing',
  },
];
export const fundOptions = [
  {
    value: 'superannuation',
    label: 'superannuation',
  },
  {
    value: 'pensionProduct',
    label: 'pension product',
  },
];

const strategySentences: any = {
  salarySacrifice: {
    maximise: {
      statement: '%name%, maximise salary sacrifice contributions into {{0}} from {{1}} to {{2}}',
      types: [EditCellType.select, EditCellType.date, EditCellType.date],
      options: ['superannuation'],
    },
    fixedRegular: {
      /**
       * %name%, name is a key of client/partner object in JSON, we will render the value of this key to layout
       * {{0}} indicate to input
       */
      statement: '%name%, salary sacrifice {{0}} per {{1}} into {{2}} from {{3}} to {{4}}',
      types: [EditCellType.number, EditCellType.select, EditCellType.select, EditCellType.date, EditCellType.date],
      /**
       * - option is a string, we understand the option is a key of client/partner object in JSON,
       *  for example: superannuation, investments, loans,...
       * - options is `year`, we should use a custom options
       * - options is an array, we set the values of option as a options of select
       */
      options: ['', periodTypes, 'superannuation'],
    },
    customOneOff: {
      statement: '%name%, salary sacrifice {{0}} into {{1}} in {{2}}',
      types: [EditCellType.number, EditCellType.select, EditCellType.select],
      options: ['', 'superannuation', 'year'],
    },
  },
  nonConcessional: {
    maximise: {
      statement: '%name%, maximise non-concessional contributions from {{0}} to {{1}}',
      types: [EditCellType.date, EditCellType.date],
    },
    customRegular: {
      statement:
        '%name%, make a non-concessional contribution of {{0}} per {{1}} from {{2}} to {{3}}. ' +
        'This contribution is to be funded from {{4}}',
      types: [EditCellType.number, EditCellType.select, EditCellType.date, EditCellType.date, EditCellType.select],
      options: ['', periodTypes, '', '', 'investments'],
    },
    customOneOff: {
      statement:
        '%name%, make a non-concessional contribution of {{0}} in {{1}}. ' +
        'This contribution is to be funded from {{2}}',
      types: [EditCellType.number, EditCellType.select, EditCellType.select],
      options: ['', 'year', 'investments'],
    },
  },
  personalDeductible: {
    maximise: {
      statement:
        '%name%, maximise personal deductible contributions from {{0}} to {{1}}. ' +
        'This contribution is to be funded from {{2}}',
      types: [EditCellType.date, EditCellType.date, EditCellType.select],
      options: ['', '', 'investments'],
    },
    fixedRegular: {
      statement:
        '%name%, make a personal deductible contribution of {{0}} per {{1}} from {{2}} to {{3}}. ' +
        'This contribution is to be funded from {{4}}',
      types: [EditCellType.number, EditCellType.select, EditCellType.date, EditCellType.date, EditCellType.select],
      options: ['', periodTypes, '', '', 'investments'],
    },
    customOneOff: {
      statement:
        '%name%, make a personal deductible contribution of {{0}} in {{1}}. ' +
        'This contribution is to be funded from {{2}}',
      types: [EditCellType.number, EditCellType.select, EditCellType.select],
      options: ['', 'year', 'investments'],
    },
  },
  spouse: {
    oneOff: {
      statement:
        '%name%, maximise a spouse contributions of {{0}} in {{1}} into partner\'s superannuation account. ' +
        'This contribution is to be funded from {{2}}',
      types: [EditCellType.number, EditCellType.select, EditCellType.select],
      options: ['', 'year', 'investments'],
    },
    regular: {
      statement:
        '%name%, make a spouse contribution of {{0}} per {{1}}' +
        'into partner\'s superannuation account from {{2}} to {{3}}. ' +
        'This contribution is to be funded from {{4}}',
      types: [EditCellType.number, EditCellType.select, EditCellType.date, EditCellType.date, EditCellType.select],
      options: ['', periodTypes, '', '', 'investments'],
    },
  },
  recontribution: {
    statement:
      '%name%, withdraw {{0}} from superannuation and recontribute {{1}}' +
      'back into superannuation in {{2}}. ' +
      'This contribution is to be funded from {{3}}',
    types: [EditCellType.dropdownFreeText, EditCellType.dropdownFreeText, EditCellType.select, EditCellType.select],
    options: ['', '', 'year', 'superannuation'],
  },
  commenceAccount: { custom: true },
  commenceTransition: { custom: true },
  newInvestment: { custom: true },
  existingInvestment: {
    lumpSum: {
      custom: true,
    },
    regular: {
      custom: true,
    },
  },
  withdrawFunds: {
    lumpSum: {
      custom: true,
    },
    regular: {
      custom: true,
    },
  },
  payDownLoan: {
    oneOff: {
      statement: '%name%, utilise {{0}} from your {{1}}, to {{2}} your {{3}} in {{4}}',
      types: [EditCellType.number, EditCellType.select, EditCellType.select, EditCellType.select, EditCellType.date],
      options: ['', '+investments', paydownOptions, '+loans'],
    },
    regular: {
      statement: '%name%, increase your {{0}} repayments to {{1}} per {{2}}',
      types: [EditCellType.select, EditCellType.number, EditCellType.select],
      options: ['+loans', '', periodTypes],
    },
  },
  reduceLoan: {
    ongoing: {
      statement: '%name%, reduce your {{0}} repayments to {{1}} per {{2}}',
      types: [EditCellType.select, EditCellType.number, EditCellType.select],
      options: ['+loans', '', periodTypes],
    },
  },
  centrelinkPayment: {
    agePension: {
      statement: '%name%, apply for age pension from Centrelink in {{0}}',
      types: [EditCellType.date],
    },
    disabilitySupportPension: {
      statement: '%name%, apply for disability support pension from Centrelink in {{0}}',
      types: [EditCellType.date],
    },
    newstartAllowance: {
      statement: '%name%, apply for newstart allowance from Centrelink in {{0}}',
      types: [EditCellType.date],
    },
    rentAssistance: {
      statement: '%name%, apply for rent assistance from Centrelink in {{0}}',
      types: [EditCellType.date],
    },
  },
  giftingStrategy: {
    oneOff: {
      statement: '%name%, consider gifting {{0}} from {{1}} in {{2}}',
      types: [EditCellType.number, EditCellType.select, EditCellType.date],
      options: ['', '+investments', ''],
    },
    ongoing: {
      statement: '%name%, consider gifting {{0}} per {{1}} from {{2}} over the next {{3}} years',
      types: [EditCellType.number, EditCellType.select, EditCellType.select, EditCellType.number],
      options: ['', periodTypes, '+investments', { precision: 1, integer: true, min: 0, max: 100 }],
    },
  },
  funeralBond: {
    new: {
      custom: true,
      statement: '%name%, utilise {{0}} from {{1}} to purchase a new funeral bond {{2}}',
      types: [EditCellType.number, EditCellType.select, EditCellType.text],
      options: ['', '+investments', { placeholder: 'Enter funeral bond name', quotationMark: true }],
    },
    existing: {
      custom: true,
      statement: '%name%, utilise {{0}} from {{1}} to top up your {{2}}',
      types: [EditCellType.date, EditCellType.select, EditCellType.select],
      options: ['', '+investments', 'funeralBond'],
    },
    invest: {
      statement: '%name%, arrange to invest a further {{0}} from your {{1}} on a {{2}} basis.',
      types: [EditCellType.number, EditCellType.select, EditCellType.select],
      options: ['', 'investments', periodTimeOptions],
    },
    arrange: {
      statement: '%name%, arrange to invest a further {{0}} from your {{1}} on a {{2}} basis.',
      types: [EditCellType.number, EditCellType.select, EditCellType.select],
      options: ['', 'investments', periodTimeOptions],
    },
  },
  customStrategy: {
    statement: '{{0}}',
    types: [EditCellType.textarea],
    options: [{ placeholder: 'Enter custom strategy' }],
  },
  establish: {
    custom: true,
  },
  retain: {
    custom: true,
  },
  vary: {
    custom: true,
  },
  cancel: {
    custom: true,
  },
  powerOfAttorney: {
    appoint: {
      statement: '%name%, seek legal advice to appoint a {{0}}',
      types: [EditCellType.select],
      options: [powerOfAttorneyOptions],
    },
    review: {
      statement: '%name%, seek legal advice to review a {{0}}',
      types: [EditCellType.select],
      options: [powerOfAttorneyOptions],
    },
  },
  will: {
    implement: {
      statement: '%name%, seek legal advice to have your Will prepared',
    },
    review: {
      statement: '%name%, seek legal advice to have your Will review',
    },
  },
  superannuationBeneficiary: {
    statement: '%name%, nominate {{0}} as {{1}} beneficiary of your {{2}} fund',
    types: [EditCellType.select, EditCellType.select, EditCellType.select],
    options: [clientPartnerOptions, beneficiaryOptions, fundOptions],
  },
  implementAdvanceCare: {
    directive: {
      statement: '%name%, arrange to invest a further {{0}} from your {{1}} on a {{2}} basis',
      types: [EditCellType.number, EditCellType.select, EditCellType.select],
      options: ['', 'investments', periodTimeOptions],
    },
    plan: {
      statement: '%name%, speak to your doctor about implementing an Advance Care Plan',
    },
  },
  changePension: {
    statement: '%name%, change your beneficiary nomination on your pension account from {{0}} to reversionary',
    types: [EditCellType.select],
    options: [clientPartnerOptions],
  },
};

export default strategySentences;
