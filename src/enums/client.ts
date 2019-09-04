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

export const POSITIONS: Position[] = [
  { value: 1, icon: 'icon-current', slug: Tab.Current, label: 'Current' },
  { value: 2, icon: 'icon-strategy', slug: Tab.Strategy, label: 'Strategy' },
  { value: 3, icon: 'icon-projections', slug: Tab.ProductOptimizer, label: 'Product Optimizer' },
  { value: 4, icon: 'icon-documents', slug: Tab.Documents, label: 'Documents' },
  { value: 5, icon: 'icon-presentation', slug: Tab.Presentation, label: 'Presentation' },
];
