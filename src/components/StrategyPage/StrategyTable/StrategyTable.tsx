import React, { PureComponent } from 'react';
import { map } from 'lodash';
import { Icon, Cascader, Empty } from 'antd';
import { TextTitle } from '../../../pages/client/styled';
import { StrategyTypes } from '../../../enums/strategies';
import { StrategyTableContent, HeaderTitleMargin, HeaderTitleMark, HeaderTitleStrategy } from './styled';
import { CascaderOptionType } from 'antd/lib/cascader';
import StrategyItem, { StrategyItemI } from './StrategyItem';

interface StrategyTableProps {
  type: StrategyTypes;
  strategies: StrategyItemI[];
  addItem: (data: any) => void;
  removeItem: (index: number) => void;
}

const options = [
  {
    value: 'client',
    label: 'Client',
    children: [
      {
        value: 'salarySacrifice',
        label: 'Salary Sacrifice',
        children: [
          {
            value: 'maximise',
            label: 'Maximise',
          },
          {
            value: 'fixedRegular',
            label: 'Fixed - regular',
          },
          {
            value: 'customOneOff',
            label: 'Custom - one off',
          },
        ],
      },
      {
        value: 'nonConcessional contribution',
        label: 'Non-concessional contribution',
        children: [
          {
            value: 'maximise',
            label: 'Maximise',
          },
          {
            value: 'fixedRegular',
            label: 'Fixed - regular',
          },
          {
            value: 'customOneOff',
            label: 'Custom - one off',
          },
        ],
      },
      {
        value: 'personalDeductible',
        label: 'Personal deductible contributions',
        children: [
          {
            value: 'maximise',
            label: 'Maximise',
          },
          {
            value: 'fixedRegular',
            label: 'Fixed - regular',
          },
          {
            value: 'customOneOff',
            label: 'Custom - one off',
          },
        ],
      },
      {
        value: 'spouse',
        label: 'Spouse contribution',
        children: [
          {
            value: 'oneOff',
            label: 'One off',
          },
          {
            value: 'regular',
            label: 'Regular',
          },
        ],
      },
    ],
  },
  {
    value: 'partner',
    label: 'Partner',
    children: [
      {
        value: 'salarySacrifice',
        label: 'Salary Sacrifice',
        children: [
          {
            value: 'maximise',
            label: 'Maximise',
          },
          {
            value: 'fixedRegular',
            label: 'Fixed - regular',
          },
          {
            value: 'customOneOff',
            label: 'Custom - one off',
          },
        ],
      },
      {
        value: 'nonConcessional contribution',
        label: 'Non-concessional contribution',
        children: [
          {
            value: 'maximise',
            label: 'Maximise',
          },
          {
            value: 'fixedRegular',
            label: 'Fixed - regular',
          },
          {
            value: 'customOneOff',
            label: 'Custom - one off',
          },
        ],
      },
      {
        value: 'personalDeductible',
        label: 'Personal deductible contributions',
        children: [
          {
            value: 'maximise',
            label: 'Maximise',
          },
          {
            value: 'fixedRegular',
            label: 'Fixed - regular',
          },
          {
            value: 'customOneOff',
            label: 'Custom - one off',
          },
        ],
      },
      {
        value: 'spouse',
        label: 'Spouse contribution',
        children: [
          {
            value: 'oneOff',
            label: 'One off',
          },
          {
            value: 'regular',
            label: 'Regular',
          },
        ],
      },
    ],
  },
];

class StrategyTable extends PureComponent<StrategyTableProps> {
  public onChange = (value: string[], selectedOptions?: CascaderOptionType[]): void => {
    console.log(value);
  }

  public render() {
    const { strategies, type } = this.props;

    if (type === StrategyTypes.EstatePlanning) {
      return (
        <>
          <HeaderTitleStrategy>
            <Cascader
              popupClassName="cascader-customize"
              options={options}
              onChange={this.onChange}
              value={[]}
              expandTrigger="hover"
            >
              <Icon type={'plus-square'} theme={'filled'} />
            </Cascader>
            <TextTitle small={true}>Strategy</TextTitle>
            <HeaderTitleMark>Mark</HeaderTitleMark>
            <HeaderTitleMargin>Margin</HeaderTitleMargin>
          </HeaderTitleStrategy>
          <StrategyTableContent>
            {strategies && strategies.length > 0 ? (
              map(strategies, (strategy: StrategyItemI, index: number) => (
                <StrategyItem key={index} strategy={strategy} margin mark />
              ))
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </StrategyTableContent>
        </>
      );
    }

    return (
      <>
        <HeaderTitleStrategy>
          <Cascader
            popupClassName="cascader-customize"
            options={options}
            onChange={this.onChange}
            value={[]}
            expandTrigger="hover"
          >
            <Icon type={'plus-square'} theme={'filled'} />
          </Cascader>
          <TextTitle small={true}>Strategy</TextTitle>
        </HeaderTitleStrategy>
        <StrategyTableContent>
          {strategies && strategies.length > 0 ? (
            map(strategies, (strategy: StrategyItemI, index: number) => (
              <StrategyItem key={index} strategy={strategy} />
            ))
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </StrategyTableContent>
      </>
    );
  }
}

export default StrategyTable;
