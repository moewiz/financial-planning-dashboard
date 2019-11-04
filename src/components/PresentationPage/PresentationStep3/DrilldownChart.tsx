import React, {useState} from 'react';
import { Icon } from 'antd';
import classNames from 'classnames';
import NetAssetsDrilldownCharts from './NetAssetsDrilldownCharts';
import CashflowDrilldownCharts from './CashflowDrilldownCharts';
import TaxDrilldownCharts from './TaxDrilldownCharts';

import { DrilldownChartWrapper, ButtonGroup, DrilldownHeader, DrilldownContent, DrilldownButton } from './styled';

interface DrilldownChartProps {
  index: number;
  back: () => void;
  retirementYear: number;
}

const buttons = [
  ['Assets', 'Liabilities', 'Net Assets'],
  ['Income', 'Expenses', 'Net Assets'],
  ['Tax'],
  ['Retirement Funding'],
];

const DrilldownChart = (props: DrilldownChartProps) => {
  const [currentDrilldown, setCurrentDrilldown] = useState(0);
  const { index, back, retirementYear } = props;

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
        <div>Chart go here: {index}</div>
        <TaxDrilldownCharts retirementYear={retirementYear} currentDrilldown={currentDrilldown} shouldShow />
        {/*<CashflowDrilldownCharts retirementYear={retirementYear} currentDrilldown={currentDrilldown} shouldShow />*/}
        {/*<NetAssetsDrilldownCharts retirementYear={retirementYear} currentDrilldown={currentDrilldown} />*/}
      </DrilldownContent>
    </DrilldownChartWrapper>
  );
};

export default DrilldownChart;
