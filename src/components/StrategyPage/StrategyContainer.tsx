import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { Col, Row } from 'antd';
import { ArrayHelpers, FieldArray } from 'formik';
import { bindActionCreators, Dispatch } from 'redux';
import { isFunction } from 'lodash';

import { RootState, StandardAction } from '../../reducers/reducerTypes';
import { ClientActions, FetchDataEntryPayload, RedrawGraphs } from '../../reducers/client';
import { StrategyTypes } from '../../enums/strategies';
import { StrategyWrapper } from './styled';
import StrategyInformation from './StrategyInformation';
import StrategyTable from './StrategyTable/StrategyTable';
import { StrategyItemI } from './StrategyTable/StrategyItem';
import { getParams } from '../../pages/client/Client';

interface StrategyContainerProps {
  type: StrategyTypes;
  defaultFullValue: any;
  tableProcessing: string | null;

  redrawGraphs?: (payload: FetchDataEntryPayload & { type: string; shouldUpdateGraphs?: boolean }) => RedrawGraphs;
}

class StrategyContainer extends PureComponent<StrategyContainerProps & RouteComponentProps> {
  public addItem = (arrayHelpers: ArrayHelpers) => (data: StrategyItemI) => {
    arrayHelpers.unshift(data);
  }

  public removeItem = (arrayHelpers: ArrayHelpers) => (index: number) => {
    arrayHelpers.remove(index);
  }

  public redrawGraphs = (type: string, shouldUpdateGraphs?: boolean) => {
    const { redrawGraphs, match } = this.props;
    const { clientId, tabName, tagName } = getParams(match.params);

    if (isFunction(redrawGraphs) && clientId && tagName && tabName) {
      const payload: FetchDataEntryPayload & { type: string; shouldUpdateGraphs?: boolean } = {
        type,
        shouldUpdateGraphs,
        clientId,
        tagName,
        tabName,
      };

      redrawGraphs(payload);
    }
  }

  public renderStrategyTable = (arrayHelpers: ArrayHelpers) => {
    const { type, defaultFullValue, tableProcessing } = this.props;

    return (
      <StrategyTable
        type={type}
        addItem={this.addItem(arrayHelpers)}
        removeItem={this.removeItem(arrayHelpers)}
        defaultFullValue={defaultFullValue}
        redrawGraphs={this.redrawGraphs}
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
)(withRouter(StrategyContainer));
