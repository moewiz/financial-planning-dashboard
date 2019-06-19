import React, { PureComponent } from 'react';
import { Icon } from 'antd';
import { HeaderTitleTable, TextTitle } from '../../pages/client/styled';

interface StrategyTableProps {
  strategies: object[];
}

class StrategyTable extends PureComponent<StrategyTableProps> {
  public render() {
    return (
      <HeaderTitleTable>
        <Icon type={'plus-square'} theme={'filled'} />
        <TextTitle small={true}>Strategy</TextTitle>
      </HeaderTitleTable>
    );
  }
}

export default StrategyTable;
