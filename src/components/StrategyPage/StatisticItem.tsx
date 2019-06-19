import React, { memo, useEffect, useState } from 'react';
import { Icon } from 'antd';
import classNames from 'classnames';

import {
  StatisticWrapper,
  StatisticLabel,
  StatisticGroup,
  StatisticValue,
  StatisticSubValue,
  StatisticUpDown,
} from './styled';

export interface Statistic {
  total: number;
  isIncrease: boolean;
  delta: number;
  subValue?: number;
}

interface StatisticItemProps {
  title: string;
  subTitle?: string;
}
const listOfKpi = [
  {
    accumulationBalance: 9999999,
    isIncrease: true,
    delta: 21600,
    retirementYear: 2049,
  },
  {
    accumulationBalance: 8888888,
    isIncrease: false,
    delta: 9500,
    retirementYear: 2049,
  },
];

const StatisticItem = (props: StatisticItemProps & Statistic) => {
  const { title, total, isIncrease, delta, subTitle, subValue } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const updateActiveIndex = () => {
    const nextActiveIndex = activeIndex + 1 >= listOfKpi.length ? 0 : activeIndex + 1;
    setActiveIndex(nextActiveIndex);
  };
  useEffect(() => {
    const id = setInterval(updateActiveIndex, 6000);
    return () => clearInterval(id);
  }, [activeIndex]);

  return (
    <StatisticWrapper>
      {listOfKpi.map((kpi, index) => (
        <StatisticGroup key={index} className={classNames({ active: index === activeIndex })}>
          <StatisticLabel> {title}: </StatisticLabel>
          <StatisticValue>$ {total}</StatisticValue>
          <StatisticUpDown>
            {isIncrease ? <Icon type="caret-up" /> : <Icon type="caret-down" />} ${delta}
          </StatisticUpDown>
          {subTitle && subValue && (
            <>
              <StatisticLabel>{subTitle}:</StatisticLabel>
              <StatisticSubValue>(age {subValue})</StatisticSubValue>
            </>
          )}
        </StatisticGroup>
      ))}
    </StatisticWrapper>
  );
};

export default memo(StatisticItem);
