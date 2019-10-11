import React, { PureComponent } from 'react';
import { get, map } from 'lodash';
import { Dropdown, Empty, Icon, Menu } from 'antd';
import { connect, FormikContext } from 'formik';

import { StrategyEntry } from '../../../reducers/client';
import { StrategyTypes } from '../../../enums/strategies';
import { Choice, strategyChoices } from '../../../enums/strategyChoices';
import { TextTitle, Spinner } from '../../../pages/client/styled';
import { HeaderTitleMargin, HeaderTitleMark, HeaderTitleStrategy, StrategyTableContent } from './styled';
import StrategyItem, { StrategyItemI } from './StrategyItem';

const { SubMenu, Item } = Menu;

interface FormikPartProps {
  formik: FormikContext<StrategyEntry>;
}

interface StrategyTableProps {
  type: StrategyTypes;
  addItem: (values: string[]) => void;
  removeItem: (index: number, strategy: StrategyItemI) => void;
  defaultFullValue: any;
  tableProcessing: string | null;
  redrawGraphs: (shouldUpdateGraphs?: boolean) => void;
}

class StrategyTable extends PureComponent<FormikPartProps & StrategyTableProps> {
  public addItem = (values: string[]): void => {
    const { addItem } = this.props;
    addItem(values);
  }

  public getOptions = () => {
    const { type } = this.props;
    return strategyChoices[type] || [];
  }

  public renderItem = (option: Choice, index: number | string, parentKeys: string[] = []) => {
    if (option.children && option.children.length > 0) {
      return (
        <SubMenu title={option.label} key={index}>
          {map(option.children, (otp: Choice, idx: number) =>
            this.renderItem(otp, `${index}.${idx}`, [...parentKeys, option.value]),
          )}
        </SubMenu>
      );
    }
    const onClickItem = () => {
      const values = [...parentKeys, option.value];
      this.addItem(values);
    };

    return (
      <Item onClick={onClickItem} key={index}>
        {option.label}
      </Item>
    );
  }

  public renderMenu = () => {
    const options = this.getOptions();
    const menu = map(options, (option: Choice, index: number) => this.renderItem(option, index, []));

    return <Menu>{menu}</Menu>;
  }

  public render() {
    const { type, removeItem, defaultFullValue, formik, tableProcessing, redrawGraphs } = this.props;
    const shouldShowMarkAndMargin = type === StrategyTypes.EstatePlanning;
    const strategies = get(this.props, ['formik', 'values', type, 'strategies'], []);
    const client = get(this.props, ['formik', 'values', 'client'], {});
    const partner = get(this.props, ['formik', 'values', 'partner'], {});

    return (
      <>
        <HeaderTitleStrategy>
          <Dropdown overlay={this.renderMenu()} trigger={['click']}>
            <Icon type={'plus-square'} theme={'filled'} />
          </Dropdown>
          <TextTitle small={true} strategy>
            Strategy
          </TextTitle>
          {shouldShowMarkAndMargin && (
            <>
              <HeaderTitleMark>Mark</HeaderTitleMark>
              <HeaderTitleMargin>Margin</HeaderTitleMargin>
            </>
          )}
          {tableProcessing && tableProcessing === type && <Spinner />}
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
                redrawGraphs={redrawGraphs}
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
