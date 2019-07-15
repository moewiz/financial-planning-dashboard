import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { map } from 'lodash';

import DrawerItem, { RowData } from './DrawerItem';
import {
  DrawerTableWrapper,
  DrawerTableHeader,
  DrawerTableContent,
} from './styled';

interface DrawerTableProps {
  rows: RowData[];
  columns: string[];
  animationCn?: string;
}

class DrawerTable extends PureComponent<DrawerTableProps> {
  public render() {
    const {columns, rows, animationCn} = this.props;

    return (
      <DrawerTableWrapper className={classNames(animationCn || '')}>
        <DrawerTableHeader>
          {map(columns, (column: string, index: number) => (
            <span className={'cell'} key={index}>
              {column}
            </span>
          ))}
        </DrawerTableHeader>
        <DrawerTableContent>
          {map(rows, (row: RowData, index: number) => (
            <DrawerItem columns={columns} row={row} key={index}/>
          ))}
        </DrawerTableContent>
      </DrawerTableWrapper>
    );
  }
}

export default DrawerTable;
