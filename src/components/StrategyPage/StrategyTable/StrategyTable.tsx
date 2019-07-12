import React, { PureComponent } from 'react';
import { get, map } from 'lodash';
import { Cascader, Empty, Icon } from 'antd';
import { TextTitle } from '../../../pages/client/styled';
import { StrategyTypes } from '../../../enums/strategies';
import { HeaderTitleMargin, HeaderTitleMark, HeaderTitleStrategy, StrategyTableContent } from './styled';
import { CascaderOptionType } from 'antd/lib/cascader';
import StrategyItem, { StrategyItemI } from './StrategyItem';
import { strategyChoices } from '../../../enums/strategyChoices';
import { DynamicData, StrategyEntry } from '../../../reducers/client';
import { connect, FormikContext } from 'formik';

interface FormikPartProps {
  formik: FormikContext<StrategyEntry>;
}

interface StrategyTableProps {
  type: StrategyTypes;
  addItem: (data: StrategyItemI) => void;
  removeItem: (index: number) => void;
  client: DynamicData;
  partner: DynamicData;
  defaultFullValue: any;
}

class StrategyTable extends PureComponent<FormikPartProps & StrategyTableProps> {
  public addItem = (value: string[], selectedOptions?: CascaderOptionType[]): void => {
    const { addItem } = this.props;

    addItem({ check: true, sentence: value.join('.') });
  }

  public getOptions = () => {
    const { type } = this.props;
    return strategyChoices[type] || [];
  }

  public render() {
    const { type, removeItem, client, partner, defaultFullValue, formik } = this.props;
    const shouldShowMarkAndMargin = type === StrategyTypes.EstatePlanning;
    const strategies = get(this.props, ['formik', 'values', type, 'strategies'], []);

    return (
      <>
        <HeaderTitleStrategy>
          <Cascader
            popupClassName="cascader-customize"
            options={this.getOptions()}
            onChange={this.addItem}
            value={[]}
            expandTrigger="hover"
          >
            <Icon type={'plus-square'} theme={'filled'} />
          </Cascader>
          <TextTitle small={true}>Strategy</TextTitle>
          {shouldShowMarkAndMargin && (
            <>
              <HeaderTitleMark>Mark</HeaderTitleMark>
              <HeaderTitleMargin>Margin</HeaderTitleMargin>
            </>
          )}
        </HeaderTitleStrategy>
        <StrategyTableContent>
          {strategies && strategies.length > 0 ? (
            map(strategies, (strategy: StrategyItemI, index: number) => (
              <StrategyItem
                key={index}
                strategyType={type}
                strategyIndex={index}
                strategy={strategy}
                margin={shouldShowMarkAndMargin}
                mark={shouldShowMarkAndMargin}
                removeItem={removeItem}
                client={client}
                partner={partner}
                defaultFullValue={defaultFullValue}
                setFieldValue={formik.setFieldValue}
              />
            ))
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </StrategyTableContent>
      </>
    );
  }
}

export default connect<StrategyTableProps, StrategyEntry>(StrategyTable);
