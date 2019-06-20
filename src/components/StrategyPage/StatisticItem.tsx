import React, { memo, useEffect, useState } from 'react';
import numeral from 'numeral';
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
  listOfKpi: Statistic[];
}

const StatisticItem = (props: StatisticItemProps) => {
  const { title, subTitle, listOfKpi } = props;
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
          <StatisticValue>$ {numeral(kpi.total).format('0,0')}</StatisticValue>
          <StatisticUpDown>
            {kpi.isIncrease ? <Icon type="caret-up" /> : <Icon type="caret-down" />} ${numeral(kpi.delta).format('0,0')}
          </StatisticUpDown>
          {subTitle && kpi.subValue && (
            <>
              <StatisticLabel>{subTitle}:</StatisticLabel>
              <StatisticSubValue>(age {kpi.subValue})</StatisticSubValue>
            </>
          )}
        </StatisticGroup>
      ))}
    </StatisticWrapper>
  );
};

export default memo(StatisticItem);
