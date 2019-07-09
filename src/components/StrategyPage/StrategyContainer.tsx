import React, { PureComponent } from 'react';
import StrategyInformation from './StrategyInformation';
import { StrategyTypes } from '../../enums/strategies';
import StrategyTable from './StrategyTable/StrategyTable';
import { StrategyWrapper } from './styled';
import { Col, Row } from 'antd';
import { StandardText } from '../../reducers/client';
import { StrategyItemI } from './StrategyTable/StrategyItem';
import { ArrayHelpers, FieldArray } from 'formik';

interface StrategyContainerProps {
  type: StrategyTypes;
  information: {
    kpi: any[];
    graph: any;
    standardText: StandardText[];
  };
  strategies: StrategyItemI[];
}

class StrategyContainer extends PureComponent<StrategyContainerProps> {
  public addItem = (arrayHelpers: ArrayHelpers) => (data: any) => {
    arrayHelpers.unshift(data);
  }

  public removeItem = (arrayHelpers: ArrayHelpers) => (index: number) => {
    arrayHelpers.remove(index);
  }

  public renderStrategyTable = (arrayHelpers: ArrayHelpers) => {
    const { strategies, type } = this.props;

    return (
      <StrategyTable
        strategies={strategies}
        type={type}
        addItem={this.addItem(arrayHelpers)}
        removeItem={this.removeItem(arrayHelpers)}
      />
    );
  }

  public render() {
    const { information, type } = this.props;
    return (
      <StrategyWrapper>
        <Row gutter={24}>
          <Col span={12}>
            <StrategyInformation {...information} type={type} />
          </Col>
          <Col span={12}>
            <FieldArray name={type + '.strategies'} render={this.renderStrategyTable} />
          </Col>
        </Row>
      </StrategyWrapper>
    );
  }
}

export default StrategyContainer;
