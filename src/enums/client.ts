export enum Tab {
  Current = 'current',
  Strategy = 'strategy',
  ProductOptimizer = 'product-optimizer',
  Documents = 'documents',
  Presentation = 'presentation',
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
}

export const POSITIONS: Position[] = [
  { value: PositionValue.Current, icon: 'icon-current', slug: Tab.Current, label: 'Current' },
  { value: PositionValue.Strategy, icon: 'icon-strategy', slug: Tab.Strategy, label: 'Strategy' },
  {
    value: PositionValue.ProductOptimizer,
    icon: 'icon-projections',
    slug: Tab.ProductOptimizer,
    label: 'Product Optimizer',
  },
  { value: PositionValue.Documents, icon: 'icon-documents', slug: Tab.Documents, label: 'Documents' },
  { value: PositionValue.Presentation, icon: 'icon-presentation', slug: Tab.Presentation, label: 'Presentation' },
];
