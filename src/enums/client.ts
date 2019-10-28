export enum Tab {
  Current = 'current',
  Strategy = 'strategy',
  ProductOptimizer = 'investments',
  Documents = 'soa',
  Presentation = 'presentation',
  Insurance = 'insurance',
}

export interface Position {
  value: number;
  icon: string;
  slug: string;
  label: string;
}

export enum PositionValue {
  Current = 1,
  Strategy = 2,
  ProductOptimizer = 3,
  Documents = 4,
  Presentation = 5,
  Insurance = 6,
}

export const POSITIONS: Position[] = [
  { value: PositionValue.Current, icon: 'icon-current', slug: Tab.Current, label: 'Current' },
  { value: PositionValue.Strategy, icon: 'icon-strategy', slug: Tab.Strategy, label: 'Strategy' },
  {
    value: PositionValue.ProductOptimizer,
    icon: 'icon-projections',
    slug: Tab.ProductOptimizer,
    label: 'Investments',
  },
  { value: PositionValue.Insurance, icon: 'icon-documents', slug: Tab.Insurance, label: 'Insurance' },
  { value: PositionValue.Documents, icon: 'icon-documents', slug: Tab.Documents, label: 'SoA' },
  { value: PositionValue.Presentation, icon: 'icon-presentation', slug: Tab.Presentation, label: 'Presentation' },
];
