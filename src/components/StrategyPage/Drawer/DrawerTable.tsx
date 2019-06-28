import React, { PureComponent } from 'react';
import { map } from 'lodash';
import { DrawerTableWrapper } from '../styled';
import DrawerItem, { RowData } from './DrawerItem';

interface DrawerTableProps {
  rows: RowData[];
  columns: string[];
}

class DrawerTable extends PureComponent<DrawerTableProps> {
  public render() {
    const { columns, rows } = this.props;

    return (
      <DrawerTableWrapper>
        <div className="columns">
          {map(columns, (column: string, index: number) => (
            <span className={'cell'} key={index}>
              {column}
            </span>
          ))}
        </div>
        {map(rows, (row: RowData, index: number) => (
          <DrawerItem columns={columns} row={row} key={index} />
        ))}
      </DrawerTableWrapper>
    );
  }
}

export default DrawerTable;
