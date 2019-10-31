import React from 'react';

interface DrilldownChartProps {
  index: number;
  back: () => void;
}

const DrilldownChart = (props: DrilldownChartProps) => {
  const { index, back } = props;
  return (
    <div>
      <button onClick={back}>Back to home</button>
      Chart index: {index}
    </div>
  );
};

export default DrilldownChart;
