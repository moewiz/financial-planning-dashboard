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

export enum SentenceInputType {
  text,
  number,
  date,
  select,
  dropdownFreeText,
}

const strategySentences: any = {
  salarySacrifice: {
    maximise: {
      statement: '%name%, maximise salary sacrifice contributions from {{0}} to {{1}}',
      types: [SentenceInputType.date, SentenceInputType.date],
    },
    fixedRegular: {
      /**
       * %name%, name is a key of client/partner object in JSON, we will render the value of this key to layout
       * {{0}} indicate to input
       */
      statement: '%name%, salary sacrifice {{0}} per {{1}} from {{2}} to {{3}}',
      types: [SentenceInputType.number, SentenceInputType.select, SentenceInputType.date, SentenceInputType.date],
      /**
       * - option is a string, we understand the option is a key of client/partner object in JSON,
       *  for example: superannuation, investment, loans,...
       * - options is `year`, we should use a custom options
       * - options is an array, we set the values of option as a options of select
       */
      options: ['', periodTypes],
    },
    customOneOff: {
      statement: '%name%, salary sacrifice {{0}} in {{1}}',
      types: [SentenceInputType.number, SentenceInputType.select],
      options: ['', 'year'],
    },
  },
  nonConcessional: {
    maximise: {
      statement: '%name%, maximise non-concessional contributions from {{0}} to {{1}}',
      types: [SentenceInputType.date, SentenceInputType.date],
    },
    customRegular: {
      statement: '%name%, make non-concessional contribution of {{0}} per {{1}} from {{2}} to {{3}}',
      types: [SentenceInputType.number, SentenceInputType.select, SentenceInputType.date, SentenceInputType.date],
      options: ['', periodTypes],
    },
    customOneOff: {
      statement: '%name%, make non-concessional contribution of {{0}} in {{1}}',
      types: [SentenceInputType.number, SentenceInputType.select],
      options: ['', 'year'],
    },
  },
  personalDeductible: {
    maximise: {
      statement: '%name%, maximise personal deductible contributions from {{0}} to {{1}}',
      types: [SentenceInputType.date, SentenceInputType.date],
    },
    fixedRegular: {
      statement: '%name%, make a personal deductible contribution of {{0}} per {{1}} from {{2}} to {{3}}',
      types: [SentenceInputType.number, SentenceInputType.select, SentenceInputType.date, SentenceInputType.date],
      options: ['', periodTypes],
    },
    customOneOff: {
      statement: '%name%, make a personal deductible contribution of {{0}} in {{1}}',
      types: [SentenceInputType.number, SentenceInputType.select],
      options: ['', 'year'],
    },
  },
  spouse: {
    oneOff: {
      statement: '%name%, maximise a spouse contributions of {{0}} in {{1}} into partner\'s superannuation account',
      types: [SentenceInputType.number, SentenceInputType.select],
      options: ['', 'year'],
    },
    regular: {
      statement:
        '%name%, make a spouse contribution of {{0}} per {{1}}' +
        'into partner\'s superannuation account from {{2}} to {{3}}',
      types: [SentenceInputType.number, SentenceInputType.select, SentenceInputType.date, SentenceInputType.date],
      options: ['', periodTypes],
    },
  },
  recontribution: {
    oneOff: {
      statement:
        '%name%, withdraw {{0}} from superannuation and recontribute {{1}}' + 'back into superannuation in {{3}}',
      types: [SentenceInputType.dropdownFreeText, SentenceInputType.dropdownFreeText, SentenceInputType.select],
      options: ['', '', 'year'],
    },
  },
  commenceAccount: {
    minimum: {
      statement: '%name%, commence an account based pension in {{0}} with {{1}} from your {{2}}.',
      types: [SentenceInputType.date, SentenceInputType.dropdownFreeText, SentenceInputType.select],
      options: ['', '', 'superannuation'],
    },
    specified: {
      statement:
        '%name%, commence an account based pension in {{0}} with {{1}} from your {{2}}. ' +
        'Drawdown pension income of {{3}} per {{4}}.',
      types: [
        SentenceInputType.date,
        SentenceInputType.dropdownFreeText,
        SentenceInputType.select,
        SentenceInputType.number,
        SentenceInputType.select,
      ],
      options: ['', '', 'superannuation', '', periodTypes],
    },
    meetExpenses: {
      statement: '%name%, commence an account based pension in {{0}} with {{1}} from your {{2}}.',
      types: [SentenceInputType.date, SentenceInputType.dropdownFreeText, SentenceInputType.select],
      options: ['', '', 'superannuation'],
    },
    // custom handle
    fullyCustomized: {},
  },
  commenceTransition: {
    minimum: {
      statement: '%name%, commence a TTR pension in {{0}} with {{1}} from your {{2}}.',
      types: [SentenceInputType.date, SentenceInputType.dropdownFreeText, SentenceInputType.select],
      options: ['', '', 'superannuation'],
    },
    specified: {
      statement:
        '%name%, commence a TTR pension in {{0}} with {{1}} from your {{2}}.' +
        'Drawdown pension income of {{3}} per {{4}}.',
      types: [
        SentenceInputType.date,
        SentenceInputType.dropdownFreeText,
        SentenceInputType.select,
        SentenceInputType.number,
        SentenceInputType.select,
      ],
      options: ['', '', 'superannuation', '', periodTypes],
    },
    meetExpenses: {
      statement: '%name%, commence a TTR pension in {{0}} with {{1}} from your {{2}}.',
      types: [SentenceInputType.date, SentenceInputType.dropdownFreeText, SentenceInputType.select],
      options: ['', '', 'superannuation'],
    },
    maximum: {
      statement: '%name%, commence a TTR pension in {{0}} with {{1}} from your {{2}}.',
      types: [SentenceInputType.date, SentenceInputType.dropdownFreeText, SentenceInputType.select],
      options: ['', '', 'superannuation'],
    },
  },
  newInvestment: {
    reinvest: {
      statement:
        '%name%, utilise {{0}} from your {{1}}, to establish a new investment portfolio in {{2}}. Reinvest income.',
      types: [SentenceInputType.number, SentenceInputType.select, SentenceInputType.date],
      options: ['', '+investments', ''],
    },
    income: {
      statement: '%name%, utilise {{0}} from your {{1}}, to establish a new investment portfolio in {{2}}.',
      types: [SentenceInputType.number, SentenceInputType.select, SentenceInputType.date],
      options: ['', '+investments', ''],
    },
  },
  existingInvestment: {
    lumpSum: {
      statement: '%name%, withdraw {{0}} in {{1}} from your {{2}} and invest the proceeds to your {{3}}',
      types: [SentenceInputType.number, SentenceInputType.date, SentenceInputType.select, SentenceInputType.select],
      options: ['', '+investments', '+investments'],
    },
    regular: {
      statement:
        '%name%, make a regular contribution of {{0}} per {{1}} from {{2}} to {{3}} into your {{4}} from {{5}}',
      types: [
        SentenceInputType.number,
        SentenceInputType.select,
        SentenceInputType.date,
        SentenceInputType.date,
        SentenceInputType.select,
        SentenceInputType.select,
      ],
      options: ['', periodTypes, '', '', '+investments', '+investments'],
    },
  },
  withdrawFunds: {
    lumpSum: {
      statement: '%name%, make a lump sum withdawal of {{0}} in {{1}} from your {{2}}. Direct the proceeds into {{3}}.',
      types: [SentenceInputType.number, SentenceInputType.date, SentenceInputType.select, SentenceInputType.select],
      options: ['', '', '+investments', '+investments'],
    },
    regular: {
      statement:
        '%name%, make a regular withdawal of {{0}} per {{1}} from {{2}} to {{3}} to your {{4}}.' +
        'Direct to proceeds into {{5}}',
      types: [
        SentenceInputType.number,
        SentenceInputType.select,
        SentenceInputType.date,
        SentenceInputType.date,
        SentenceInputType.select,
        SentenceInputType.select,
      ],
      options: ['', periodTypes, '', '', '+investments', '+investments'],
    },
  },
  payDownLoan: {
    oneOff: {
      statement: '%name%, utilise {{0}} from your {{1}}, to {{2}} your {{3}} in {{4}}.',
      types: [
        SentenceInputType.number,
        SentenceInputType.select,
        SentenceInputType.select,
        SentenceInputType.select,
        SentenceInputType.date,
      ],
      options: ['', '+investments', paydownOptions, '+loans'],
    },
    regular: {
      statement: '%name%, increase your {{0}} repayments to {{1}} per {{2}}.',
      types: [SentenceInputType.select, SentenceInputType.select, SentenceInputType.number],
      options: ['+loans', '', periodTypes],
    },
  },
  reduceLoan: {
    ongoing: {
      statement: '%name%, reduce your {{0}} repayments to {{1}} per {{2}}.',
      types: [SentenceInputType.select, SentenceInputType.number, SentenceInputType.select],
      options: ['+loans', '', periodTypes],
    },
  },
  centrelinkPayment: {
    agePension: {
      statement: '%name%, apply for age pension from Centrelink in {{0}}.',
      types: [SentenceInputType.date],
    },
    disabilitySupportPension: {
      statement: '%name%, apply for disability support pension from Centrelink in {{0}}.',
      types: [SentenceInputType.date],
    },
    newstartAllowance: {
      statement: '%name%, apply for newstart allowance from Centrelink in {{0}}.',
      types: [SentenceInputType.date],
    },
    rentAssistance: {
      statement: '%name%, apply for rent assistance from Centrelink in {{0}}.',
      types: [SentenceInputType.date],
    },
  },
  giftingStrategy: {
    oneOff: {
      statement: '%name%, consider gifting {{0}} from {{1}} in {{2}}',
      types: [SentenceInputType.number, SentenceInputType.select, SentenceInputType.date],
      options: ['', '+investments', ''],
    },
    ongoing: {
      statement: '%name%, consider gifting {{0}} per {{1}} from {{2}} over the next {{3}} years',
      types: [SentenceInputType.number, SentenceInputType.select, SentenceInputType.select, SentenceInputType.number],
      options: ['', periodTypes, '+investments', { precision: 1 }],
    },
  },
  funeralBond: {
    new: {
      statement: '%name%, utilise {{0}} from {{1}} to purchase a new funeral bond',
      types: [SentenceInputType.number, SentenceInputType.select],
      options: ['', '+investments'],
    },
    existing: {
      statement: '%name%, utilise {{0}} from {{1}} to top up your {{2}}',
      types: [SentenceInputType.date, SentenceInputType.select, SentenceInputType.select],
      options: ['', '+investments', '+investments'],
    },
  },
};

export default strategySentences;
