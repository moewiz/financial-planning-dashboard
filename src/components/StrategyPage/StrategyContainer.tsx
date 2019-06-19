import React, { PureComponent } from 'react';
import StrategyInformation from './StrategyInformation';
import { StrategyTypes } from '../../enums/strategies';
import StrategyTable from './StrategyTable';
import { Statistic } from './StatisticItem';
import { StrategyWrapper } from './styled';
import { Col, Row } from 'antd';

interface StrategyContainerProps {
  type: StrategyTypes;
  information: {
    statistic: Statistic;
    graph: any;
    expandable: object;
  };
  strategies: object[];
}

class StrategyContainer extends PureComponent<StrategyContainerProps> {
  public render() {
    const { information, strategies, type } = this.props;
    return (
      <StrategyWrapper>
        <Row gutter={24}>
          <Col span={12}>
            <StrategyInformation {...information} type={type} />
          </Col>
          <Col span={12}>
            <StrategyTable strategies={strategies} />
          </Col>
        </Row>
      </StrategyWrapper>
    );
  }
}

export default StrategyContainer;
