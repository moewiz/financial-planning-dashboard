import React, { PureComponent } from 'react';
import { map } from 'lodash';

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
import assetsAllocationData from '../../../demo_jsons/step_3c.json';

interface Row {
  title: string;
  values: number[];
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
    {showTitle && <DrawerRowSubTitle size={'large'}>Assets Allocation</DrawerRowSubTitle>}
    <span className={'cell'}>Proposed %</span>
    <span className={'cell'}>Balanced %</span>
    <span className={'cell'}>Variance %</span>
  </DrawerTableHeader>
);

const TableContent = ({ showTitle, values }: TableContentProps) => (
  <DrawerTableContent productOptimizer>
    <DrawerTableRows>
      {map(values, (data: Row, index: number) => (
        data.total ?
        <DrawerTableParent customBorder key={index}>
          {showTitle && <DrawerRowSubTitle size="large">{data.title}</DrawerRowSubTitle>}
          <div className="values">
            {map(data.values, (value: number, idx: number) => (
              <span className={'cell'} key={idx}>
                {value}
              </span>
            ))}
          </div>
        </DrawerTableParent> :
        <DrawerTableListItems key={index}>
          {showTitle && <DrawerRowSubTitle>{data.title}</DrawerRowSubTitle>}
          <div className="values">
            {map(data.values, (value: number, idx: number) => (
              <span className={'cell'} key={idx}>
                {value}
              </span>
            ))}
          </div>
        </DrawerTableListItems>
      ))}
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

class AssetsAllocation extends PureComponent {
  public render() {
    return (
      <AssetsAllocationWrapper>
        <AssetColumn product={assetsAllocationData.proposed} proposed={true} />

        <HorizontalScrollable>
          {map(assetsAllocationData.links, (product, index: number) => (
            <AssetColumn product={product} key={index} />
          ))}
        </HorizontalScrollable>
      </AssetsAllocationWrapper>
    );
  }
}

export default AssetsAllocation;
