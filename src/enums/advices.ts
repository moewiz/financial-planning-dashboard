export enum Advices {
  Superannuation = 'Superannuation',
  RetirementIncome = 'Retirement Income',
  NonDeductibleDept = 'Non-deductible dept',
  EstatePlanning = 'Estate Planning',
  Investment = 'Investment',
  CashflowManagement = 'Cashflow Management',
  AgedCare = 'Aged Care',
  SocialSecurity = 'Social Security',
  DebtManagement = 'Debt Management',
  Insurance = 'Insurance',
}

export const advices = {
  [Advices.Superannuation]: ['Contributions', 'Platform Review', 'Portfolio Review', 'SMSF'],
  [Advices.RetirementIncome]: ['Income Streams', 'Platform Review', 'Portfolio Review', 'Withdrawals'],
  [Advices.NonDeductibleDept]: ['Debt'],
  [Advices.EstatePlanning]: [
    'Super Death Benefit Nominations',
    'Insurance Nominations',
    'Wills',
    'POA/EPOA',
    'Other Structures (eg Testamentary Trust)',
    'Guardianship/Health Directives',
  ],
  [Advices.Investment]: ['Direct Shares', 'Platform Review', 'Portfolio Review'],
  [Advices.CashflowManagement]: ['Budgeting'],
  [Advices.AgedCare]: ['Home Care', 'Residential Aged Care'],
  [Advices.SocialSecurity]: ['Income support payments (Centrelink/DVA)', 'Concession Cards'],
  [Advices.DebtManagement]: ['Deductible debt', 'Non-deductible debt'],
  [Advices.Insurance]: ['Life', 'TPD', 'Trauma', 'Income Protection', 'Business Insurance'],
};
