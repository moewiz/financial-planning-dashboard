import React, { memo, useEffect, useState } from 'react';
import numeral from 'numeral';
import { Icon } from 'antd';
import classNames from 'classnames';
import { isBoolean, isString } from 'lodash';

import {
  StatisticWrapper,
  StatisticLabel,
  StatisticGroup,
  StatisticValue,
  StatisticSubValue,
  StatisticUpDown,
} from './styled';
import { GRAPH_FREQUENCY } from '../../enums/timer';

export interface Statistic {
  title: string;
  value: number;
  isIncrease: boolean;
  delta: number;
  subTitle?: string;
  subValue?: number;
}

interface StatisticItemProps {
  listOfKpi: Statistic[];
}

const StatisticItem = (props: StatisticItemProps) => {
  const { listOfKpi } = props;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((index) => (index + 1 >= listOfKpi.length ? 0 : index + 1));
    }, GRAPH_FREQUENCY);
    return () => clearInterval(id);
  }, []);

  return (
    <StatisticWrapper>
      {listOfKpi.map(({ title, value, isIncrease, delta, subTitle, subValue }, index) => (
        <StatisticGroup key={index} className={classNames({ active: index === activeIndex })}>
          <StatisticLabel>{title}:</StatisticLabel>
          <StatisticValue>{isString(value) ? value : `$ ${numeral(value).format('0,0')}`}</StatisticValue>
          <StatisticUpDown>
            {isBoolean(isIncrease) ? (
              isIncrease ? (
                <Icon type="caret-up" />
              ) : (
                <Icon type="caret-down" />
              )
            ) : (
              <Icon type="minus" />
            )}
            {delta}
          </StatisticUpDown>
          {subTitle && subValue && (
            <>
              <StatisticLabel>{subTitle}:</StatisticLabel>
              <StatisticSubValue>Age {subValue}</StatisticSubValue>
            </>
          )}
        </StatisticGroup>
      ))}
    </StatisticWrapper>
  );
};

export default memo(StatisticItem);
