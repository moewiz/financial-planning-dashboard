import React, { PureComponent } from 'react';
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
}

class DrawerTable extends PureComponent<DrawerTableProps> {
  public render() {
    const { columns, rows } = this.props;

    return (
      <DrawerTableWrapper>
        <DrawerTableHeader>
          {map(columns, (column: string, index: number) => (
            <span className={'cell'} key={index}>
              {column}
            </span>
          ))}
        </DrawerTableHeader>
        <DrawerTableContent>
        {map(rows, (row: RowData, index: number) => (
          <DrawerItem columns={columns} row={row} key={index} />
        ))}
        </DrawerTableContent>
      </DrawerTableWrapper>
    );
  }
}

export default DrawerTable;
