import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'antd';
import { ArrayHelpers, FieldArray } from 'formik';
import { bindActionCreators, Dispatch } from 'redux';

import { RootState, StandardAction } from '../../reducers/reducerTypes';
import { ClientActions, RedrawGraphs } from '../../reducers/client';
import { StrategyTypes } from '../../enums/strategies';
import { StrategyWrapper } from './styled';
import StrategyInformation from './StrategyInformation';
import StrategyTable from './StrategyTable/StrategyTable';
import { StrategyItemI } from './StrategyTable/StrategyItem';

interface StrategyContainerProps {
  type: StrategyTypes;
  defaultFullValue: any;
  tableProcessing: string | null;

  redrawGraphs?: (type: string, shouldUpdateGraphs?: boolean) => RedrawGraphs;
}

class StrategyContainer extends PureComponent<StrategyContainerProps> {
  public addItem = (arrayHelpers: ArrayHelpers) => (data: StrategyItemI) => {
    arrayHelpers.unshift(data);
  }

  public removeItem = (arrayHelpers: ArrayHelpers) => (index: number) => {
    arrayHelpers.remove(index);
  }

  public renderStrategyTable = (arrayHelpers: ArrayHelpers) => {
    const { type, defaultFullValue, redrawGraphs, tableProcessing } = this.props;

    return (
      <StrategyTable
        type={type}
        addItem={this.addItem(arrayHelpers)}
        removeItem={this.removeItem(arrayHelpers)}
        defaultFullValue={defaultFullValue}
        redrawGraphs={redrawGraphs}
        tableProcessing={tableProcessing}
      />
    );
  }

  public render() {
    const { type } = this.props;

    return (
      <StrategyWrapper>
        <Row gutter={24}>
          <Col span={12}>
            <StrategyInformation type={type} />
          </Col>
          <Col span={12}>
            <FieldArray name={type + '.strategies'} render={this.renderStrategyTable} validateOnChange={false} />
          </Col>
        </Row>
      </StrategyWrapper>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  tableProcessing: state.client.tableProcessing,
});

const mapDispatchToProps = (dispatch: Dispatch<StandardAction<any>>) =>
  bindActionCreators(
    {
      redrawGraphs: ClientActions.redrawGraphs,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StrategyContainer);
