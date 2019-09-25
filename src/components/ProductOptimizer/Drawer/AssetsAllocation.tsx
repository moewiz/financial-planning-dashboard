import React, { PureComponent } from 'react';

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

interface TableProps {
  showTitle?: boolean;
}

const TableHeader = ({ showTitle }: TableProps) => (
  <DrawerTableHeader productOptimizer>
    {showTitle && <DrawerRowSubTitle size={'large'}>Assets Allocation</DrawerRowSubTitle>}
    <span className={'cell'}>Proposed %</span>
    <span className={'cell'}>Balanced %</span>
    <span className={'cell'}>Variance %</span>
  </DrawerTableHeader>
);

const TableContent = ({ showTitle }: TableProps) => (
  <DrawerTableContent productOptimizer>
    <DrawerTableRows>
      <DrawerTableListItems>
        {showTitle && <DrawerRowSubTitle>Domestic Equity</DrawerRowSubTitle>}
        <div className="values">
          <span className={'cell'}>0</span>
          <span className={'cell'}>0</span>
          <span className={'cell'}>0</span>
        </div>
      </DrawerTableListItems>
      <DrawerTableListItems>
        {showTitle && <DrawerRowSubTitle>International Equity</DrawerRowSubTitle>}
        <div className="values">
          <span className={'cell'}>0</span>
          <span className={'cell'}>0</span>
          <span className={'cell'}>0</span>
        </div>
      </DrawerTableListItems>
      <DrawerTableListItems>
        {showTitle && <DrawerRowSubTitle>Domestic Property</DrawerRowSubTitle>}
        <div className="values">
          <span className={'cell'}>0</span>
          <span className={'cell'}>0</span>
          <span className={'cell'}>0</span>
        </div>
      </DrawerTableListItems>
      <DrawerTableListItems>
        {showTitle && <DrawerRowSubTitle>International Property</DrawerRowSubTitle>}
        <div className="values">
          <span className={'cell'}>0</span>
          <span className={'cell'}>0</span>
          <span className={'cell'}>0</span>
        </div>
      </DrawerTableListItems>
      <DrawerTableListItems>
        {showTitle && <DrawerRowSubTitle>Growth Alternatives</DrawerRowSubTitle>}
        <div className="values">
          <span className={'cell'}>0</span>
          <span className={'cell'}>0</span>
          <span className={'cell'}>0</span>
        </div>
      </DrawerTableListItems>
      <DrawerTableListItems>
        {showTitle && <DrawerRowSubTitle>Other Growth</DrawerRowSubTitle>}
        <div className="values">
          <span className={'cell'}>0</span>
          <span className={'cell'}>0</span>
          <span className={'cell'}>0</span>
        </div>
      </DrawerTableListItems>
      <DrawerTableParent customBorder>
        {showTitle && <DrawerRowSubTitle size="large">Total Growth</DrawerRowSubTitle>}
        <div className="values">
          <span className={'cell'}>0</span>
          <span className={'cell'}>0</span>
          <span className={'cell'}>0</span>
        </div>
      </DrawerTableParent>
    </DrawerTableRows>

    <DrawerTableRows>
      <DrawerTableListItems>
        {showTitle && <DrawerRowSubTitle>Domestic Fixed Interest</DrawerRowSubTitle>}
        <div className="values">
          <span className={'cell'}>0</span>
          <span className={'cell'}>0</span>
          <span className={'cell'}>0</span>
        </div>
      </DrawerTableListItems>
      <DrawerTableListItems>
        {showTitle && <DrawerRowSubTitle>International Fixed Interest</DrawerRowSubTitle>}
        <div className="values">
          <span className={'cell'}>0</span>
          <span className={'cell'}>0</span>
          <span className={'cell'}>0</span>
        </div>
      </DrawerTableListItems>
      <DrawerTableListItems>
        {showTitle && <DrawerRowSubTitle>Domestic Cash</DrawerRowSubTitle>}
        <div className="values">
          <span className={'cell'}>0</span>
          <span className={'cell'}>0</span>
          <span className={'cell'}>0</span>
        </div>
      </DrawerTableListItems>
      <DrawerTableListItems>
        {showTitle && <DrawerRowSubTitle>International Cash</DrawerRowSubTitle>}
        <div className="values">
          <span className={'cell'}>0</span>
          <span className={'cell'}>0</span>
          <span className={'cell'}>0</span>
        </div>
      </DrawerTableListItems>
      <DrawerTableListItems>
        {showTitle && <DrawerRowSubTitle>Defensive Alternatives</DrawerRowSubTitle>}
        <div className="values">
          <span className={'cell'}>0</span>
          <span className={'cell'}>0</span>
          <span className={'cell'}>0</span>
        </div>
      </DrawerTableListItems>
      <DrawerTableParent customBorder>
        {showTitle && <DrawerRowSubTitle size="large">Total Defensive</DrawerRowSubTitle>}
        <div className="values">
          <span className={'cell'}>0</span>
          <span className={'cell'}>0</span>
          <span className={'cell'}>0</span>
        </div>
      </DrawerTableParent>
    </DrawerTableRows>
  </DrawerTableContent>
);

class AssetsAllocation extends PureComponent {
  public render() {
    return (
      <AssetsAllocationWrapper>
        <AssetBlock proposed>
          <DrawerTableWrapper productOptimizer>
            <AssetTitleBlock marginLeft>
              <AssetTitle>Product X</AssetTitle>
              <AssetSubTitle>Proposed</AssetSubTitle>
            </AssetTitleBlock>
            <TableHeader showTitle />
            <TableContent showTitle />
          </DrawerTableWrapper>
        </AssetBlock>
        <HorizontalScrollable>
          <AssetBlock>
            <DrawerTableWrapper productOptimizer>
              <AssetTitleBlock>
                <AssetTitle>Product A</AssetTitle>
                <AssetSubTitle>RoP - alternative</AssetSubTitle>
              </AssetTitleBlock>
              <TableHeader />
              <TableContent />
            </DrawerTableWrapper>
          </AssetBlock>
          <AssetBlock>
            <DrawerTableWrapper productOptimizer>
              <AssetTitleBlock>
                <AssetTitle>Product B</AssetTitle>
                <AssetSubTitle>RoP - alternative</AssetSubTitle>
              </AssetTitleBlock>
              <TableHeader />
              <TableContent />
            </DrawerTableWrapper>
          </AssetBlock>
        </HorizontalScrollable>
      </AssetsAllocationWrapper>
    );
  }
}

export default AssetsAllocation;
