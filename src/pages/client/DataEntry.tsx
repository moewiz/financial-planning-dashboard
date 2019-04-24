import React, { PureComponent } from 'react';
import DataEntryTable from './DataEntryTable';
import { Icon } from 'antd';

interface DataEntryProps {
  tabName: string;
}

class DataEntry extends PureComponent<DataEntryProps> {
  public render() {
    return (
      <div>
        <DataEntryTable icon={<Icon type="user" />} name={'Basic Information'} />
        <DataEntryTable name={'Income'} add expanded={false} />
        <DataEntryTable name={'Expenditure'} add expanded={false} />
        <DataEntryTable name={'Assets'} add />
        <DataEntryTable name={'Liabilities'} add />
        <DataEntryTable name={'Insurance'} add />
      </div>
    );
  }
}

export default DataEntry;
