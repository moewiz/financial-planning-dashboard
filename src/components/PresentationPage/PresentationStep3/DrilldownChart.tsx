import React, { useState } from 'react';
import { Icon } from 'antd';
import classNames from 'classnames';
import NetAssetsDrilldownCharts from './NetAssetsDrilldownCharts';
import CashflowDrilldownCharts from './CashflowDrilldownCharts';
import TaxDrilldownCharts from './TaxDrilldownCharts';
import CalmPVDrilldownCharts from './CalmPVDrilldownCharts';

import { DrilldownChartWrapper, ButtonGroup, DrilldownHeader, DrilldownContent, DrilldownButton } from './styled';

interface DrilldownChartProps {
  index: number;
  back: () => void;
  retirementYear: number;
  hasLifeEvent?: boolean;
}

const buttons = [
  ['Assets', 'Liabilities', 'Net Assets'],
  ['Income', 'Expenses', 'Net Assets'],
  ['Tax'],
  ['Retirement Funding'],
];

const DrilldownChart = (props: DrilldownChartProps) => {
  const [currentDrilldown, setCurrentDrilldown] = useState(0);
  const { index, back, retirementYear, hasLifeEvent } = props;

  return (
    <DrilldownChartWrapper>
      <DrilldownHeader>
        <Icon type="arrow-left" onClick={back} />
        {buttons[index] && (
          <ButtonGroup>
            {buttons[index].map((text: string, idx: number) => (
              <DrilldownButton
                className={classNames({ active: idx === currentDrilldown })}
                onClick={() => setCurrentDrilldown(idx)}
                key={idx}
              >
                {text}
              </DrilldownButton>
            ))}
          </ButtonGroup>
        )}
      </DrilldownHeader>
      <DrilldownContent>
        {/*<div>Chart go here: {index}</div>*/}
        <CalmPVDrilldownCharts
          retirementYear={retirementYear}
          currentDrilldown={currentDrilldown}
          shouldShow={index === 3}
        />
        <TaxDrilldownCharts
          retirementYear={retirementYear}
          currentDrilldown={currentDrilldown}
          shouldShow={index === 2}
          hasLifeEvent={hasLifeEvent}
        />
        <CashflowDrilldownCharts
          retirementYear={retirementYear}
          currentDrilldown={currentDrilldown}
          shouldShow={index === 1}
          hasLifeEvent={hasLifeEvent}
        />
        <NetAssetsDrilldownCharts
          retirementYear={retirementYear}
          currentDrilldown={currentDrilldown}
          shouldShow={index === 0}
          hasLifeEvent={hasLifeEvent}
        />
      </DrilldownContent>
    </DrilldownChartWrapper>
  );
};

export default DrilldownChart;
