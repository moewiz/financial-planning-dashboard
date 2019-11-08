import React from 'react';
import { map, isNumber } from 'lodash';
import numeral from 'numeral';
import {
  DrawerTableContent,
  DrawerTableHeader,
  DrawerTableParent,
  DrawerTableWrapper,
  DrawerTableRows,
  DrawerRowSubTitle,
  DrawerTableListItems,
} from '../../StrategyPage/Drawer/styled';
import { AssetsAllocationWrapper, AssetSubTitle, AssetTitle, AssetTitleBlock, AssetBlock } from './styled';
import { HorizontalScrollable } from '../styled';
import assetsAllocationData from '../../../demo_jsons/step_3l.json';

interface Row {
  title: string;
  values: Array<number | string>;
  total?: boolean;
}

interface TableContentProps {
  values: Row[];
  showTitle?: boolean;
}

interface TableHeaderProps {
  showTitle?: boolean;
}

const TableHeader = ({ showTitle }: TableHeaderProps) => (
  <DrawerTableHeader productOptimizer>
    {showTitle && <DrawerRowSubTitle size={'large'}>Asset Type</DrawerRowSubTitle>}
    <div style={{ flex: 1, display: 'flex' }}>
      <span className={'cell cell-asset-allocation'}>Proposed %</span>
      <span className={'cell cell-asset-allocation'}>Balanced %</span>
      <span className={'cell cell-asset-allocation'}>Variance %</span>
    </div>
  </DrawerTableHeader>
);

const TableContent = ({ showTitle, values }: TableContentProps) => (
  <DrawerTableContent productOptimizer>
    <DrawerTableRows>
      {map(values, (data: Row, index: number) =>
        data.total ? (
          <DrawerTableParent customBorder key={index}>
            {showTitle && <DrawerRowSubTitle size="large">{data.title}</DrawerRowSubTitle>}
            <div className="values">
              {map(data.values, (value: number | string, idx: number) => (
                <span className={'cell'} key={idx}>
                  {isNumber(value) ? numeral(value / 100).format('0.0%') : value}
                </span>
              ))}
            </div>
          </DrawerTableParent>
        ) : (
          <DrawerTableListItems key={index}>
            {showTitle && <DrawerRowSubTitle>{data.title}</DrawerRowSubTitle>}
            <div className="values">
              {map(data.values, (value: number | string, idx: number) => (
                <span className={'cell'} key={idx}>
                  {isNumber(value) ? numeral(value / 100).format('0.0%') : value}
                </span>
              ))}
            </div>
          </DrawerTableListItems>
        ),
      )}
    </DrawerTableRows>
  </DrawerTableContent>
);

interface AssetColumnProps {
  product: {
    title: string;
    subTitle: string;
    values: Row[];
  };
  proposed?: boolean;
}

const AssetColumn = ({ product, proposed }: AssetColumnProps) => (
  <AssetBlock proposed={proposed}>
    <DrawerTableWrapper productOptimizer>
      <AssetTitleBlock marginLeft={proposed}>
        <AssetTitle>{product.title}</AssetTitle>
        <AssetSubTitle>{product.subTitle}</AssetSubTitle>
      </AssetTitleBlock>
      <TableHeader showTitle={proposed} />
      <TableContent showTitle={proposed} values={product.values} />
    </DrawerTableWrapper>
  </AssetBlock>
);

export interface AssetsAllocationProps {
  data?: AssetColumnProps['product'];
  links?: Array<AssetColumnProps['product']>;
}

const AssetsAllocation = (props: AssetsAllocationProps) => {
  const { data, links } = props;

  return (
    <AssetsAllocationWrapper>
      <AssetColumn product={data || assetsAllocationData.proposed} proposed={true} />

      <HorizontalScrollable>
        {map(links || assetsAllocationData.links, (product, index: number) => (
          <AssetColumn product={product} key={index} />
        ))}
      </HorizontalScrollable>
    </AssetsAllocationWrapper>
  );
};

export default AssetsAllocation;
