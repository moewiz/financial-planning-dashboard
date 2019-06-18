import React from 'react';
import { Icon } from 'antd';
import { StatisticWrapper, StatisticLabel, StatisticGroup,
  StatisticValue, StatisticSubValue, StatisticUpDown } from './styled';

export interface Statistic {
  total: number;
  isIncrease: boolean;
  differenceNumber: number;
  subValue?: number;
}

interface StatisticItemProps {
  title: string;
  subTitle?: string;
}

const StatisticItem = (props: StatisticItemProps & Statistic) => {
  const { title, total, isIncrease, differenceNumber, subTitle, subValue } = props;
  return (
    <StatisticWrapper>
      <StatisticGroup className="active">
        <StatisticLabel> {title}: </StatisticLabel>
        <StatisticValue>$ {total}</StatisticValue>
        <StatisticUpDown>
          {isIncrease ? <Icon type="caret-up" /> : <Icon type="caret-down" />} ${differenceNumber}
        </StatisticUpDown>
        {subTitle && subValue && (
          <>
            <StatisticLabel>{subTitle}:</StatisticLabel>
            <StatisticSubValue>(age {subValue})</StatisticSubValue>
          </>
        )}
      </StatisticGroup>
    </StatisticWrapper>
  );
};

export default StatisticItem;
