import React from 'react';
import { Icon } from 'antd';
import classNames from 'classnames';

import { DrilldownChartWrapper, ButtonGroup, DrilldownHeader, DrilldownContent, DrilldownButton } from './styled';

interface DrilldownChartProps {
  index: number;
  back: () => void;
}

const buttons = [
  ['Assets', 'Liabilities', 'Net Assets'],
  ['Income', 'Expenses', 'Net Assets'],
  ['Tax'],
  ['Retirement Funding'],
];

const DrilldownChart = (props: DrilldownChartProps) => {
  const { index, back } = props;

  return (
    <DrilldownChartWrapper>
      <DrilldownHeader>
        <Icon type="arrow-left" onClick={back} />
        {buttons[index] && (
          <ButtonGroup>
            {buttons[index].map((text: string, idx: number) => (
              <DrilldownButton className={classNames({ active: idx === 0 })} key={idx}>{text}</DrilldownButton>
            ))}
          </ButtonGroup>
        )}
      </DrilldownHeader>
      <DrilldownContent>
        <div>Chart go here: {index}</div>
      </DrilldownContent>
    </DrilldownChartWrapper>
  );
};

export default DrilldownChart;
