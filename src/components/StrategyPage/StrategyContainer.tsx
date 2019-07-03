import React, { PureComponent } from 'react';
import StrategyInformation from './StrategyInformation';
import { StrategyTypes } from '../../enums/strategies';
import StrategyTable from './StrategyTable/StrategyTable';
import { StrategyWrapper } from './styled';
import { Col, Row } from 'antd';
import { StandardText } from '../../reducers/client';

interface StrategyContainerProps {
  type: StrategyTypes;
  information: {
    kpi: any[];
    graph: any;
    standardText: StandardText[];
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
            <StrategyTable strategies={strategies} type={type} />
          </Col>
        </Row>
      </StrategyWrapper>
    );
  }
}

export default StrategyContainer;
