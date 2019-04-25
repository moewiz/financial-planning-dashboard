import React, { PureComponent } from 'react';
import BasicInformationTable from './BasicInformationTable';

interface DataEntryProps {
  tabName: string;
}

class DataEntry extends PureComponent<DataEntryProps> {
  public render() {
    return (
      <div>
        <BasicInformationTable />
        {/*<DataEntryTable name={'Income'} add expanded={false} />*/}
        {/*<DataEntryTable name={'Expenditure'} add expanded={false} />*/}
        {/*<DataEntryTable name={'Assets'} add />*/}
        {/*<DataEntryTable name={'Liabilities'} add />*/}
        {/*<DataEntryTable name={'Insurance'} add />*/}
      </div>
    );
  }
}

export default DataEntry;
