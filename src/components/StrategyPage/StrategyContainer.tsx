import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { Col, Row } from 'antd';
import { ArrayHelpers, FieldArray } from 'formik';
import { bindActionCreators, Dispatch } from 'redux';
import { isFunction } from 'lodash';
import uuidv1 from 'uuid/v1';

import { RootState, StandardAction } from '../../reducers/reducerTypes';
import { ClientActions, FetchDataEntryPayload, RedrawGraphs } from '../../reducers/client';
import { StrategyTypes } from '../../enums/strategies';
import { StrategyWrapper } from './styled';
import StrategyInformation from './StrategyInformation';
import StrategyTable from './StrategyTable/StrategyTable';
import { getParams } from '../../pages/client/Client';
import { createEvent } from '../../utils/GA';
import { getStrategyTitle } from './StrategyPage';
import { StrategyItemI } from './StrategyTable/StrategyItem';

interface StrategyContainerProps {
  type: StrategyTypes;
  defaultFullValue: any;
  tableProcessing: string | null;

  redrawGraphs?: (payload: FetchDataEntryPayload & { type: string; shouldUpdateGraphs?: boolean }) => RedrawGraphs;
}

class StrategyContainer extends PureComponent<StrategyContainerProps & RouteComponentProps> {
  public addItem = (arrayHelpers: ArrayHelpers) => (values: string[]) => {
    const { match, type } = this.props;
    const label = `${getStrategyTitle(type)} - ${values.join('.')}`;
    const data = { id: uuidv1(), check: true, sentence: values.join('.') };
    const [owner, strategyType] = values;

    createEvent('strategy', 'create', label, getParams(match.params).clientId);
    // TODO integrate the API
    if (strategyType === 'commenceAccount') {
      this.redrawGraphs(true);
    } else {
      arrayHelpers.unshift(data);
      this.redrawGraphs(false);
    }
  }

  public removeItem = (arrayHelpers: ArrayHelpers) => (index: number, strategy: StrategyItemI) => {
    const { match, type } = this.props;
    const label = `${getStrategyTitle(type)} - ${strategy.sentence}`;

    createEvent('strategy', 'delete', label, getParams(match.params).clientId);
    arrayHelpers.remove(index);
  }

  public redrawGraphs = (shouldUpdateGraphs: boolean = false) => {
    const { redrawGraphs, match, type } = this.props;
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
    const { type, match } = this.props;

    return (
      <StrategyWrapper>
        <Row gutter={24}>
          <Col span={12}>
            <StrategyInformation type={type} clientId={getParams(match.params).clientId} />
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
