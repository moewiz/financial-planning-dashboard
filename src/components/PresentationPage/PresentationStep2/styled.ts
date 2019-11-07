import styled from 'styled-components';

export const StepCurrentPosition = styled.div.attrs({
  className: 'presentation-step-position',
})`
  display: flex;
  color: #515c83;
  width: 100%;
`;

export const StepPositionLeft = styled.div.attrs({
  className: 'presentation-position-left',
})`
  flex: 0 0 35%;

`;
export const StepPositionRight = styled.div.attrs({
  className: 'presentation-position-right',
})`
  // flex: 0 0 calc(75% - 20px);
  flex: 1;
  margin-left: 20px;
`;

export const StepPositionTop = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 30px;
  .ant-card-body{
    padding: 15px;
    min-height: 223px;
  }
`;

export const StepPositionBottom = styled.div`
  box-shadow: 0 2px 4px 0px rgba(0,0,0,0.23);
  padding: 35px 10px;
  display: inline-block;
  width: 100%;
  margin: 0 auto;
  position: relative;
  min-height: 330px;
  &.income-doughnut{
    .presentation-doughnut-desc{
      left: calc(50% - 32px);
      top: calc(50% + 20px);
    }
  }
  &.asset-doughnut{
    .presentation-doughnut-desc{
      left: calc(50% - 36px);
      top: calc(50% + 27px);
    }
  }
  .chartjs-render-monitor{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export const TitlePositionStep = styled.div`
  font-size: 16px;
  margin-bottom: 5px;
  font-weight: 600;
`;

export const ValPositionStep = styled.div`
 font-size: 16px;
`;

export const BlockStep = styled.div`
  box-shadow: 0 2px 4px 0px rgba(0,0,0,0.23);
  flex: 0 0 calc(50% - 10px);
  text-align: center;
  padding: 36px 10px;
  border-radius: 5px;
`;

export const IcomeBlockStep = styled(BlockStep)`
  margin-right: 10px;
  margin-bottom: 20px;
`;

export const ExpensesBlockStep = styled(BlockStep)`
  margin-left: 10px;
  margin-bottom: 20px;
`;

export const AssetsBlockStep = styled(BlockStep)`
  margin-right: 10px;
`;

export const LiabilitiesBlockStep = styled(BlockStep)`
  margin-left: 10px;
`;

export const CardChartPositionStep = styled.section`
  box-shadow: 0 2px 4px 0px rgba(0,0,0,0.23);
  // flex: 0 0 calc(50% - 30px);
  flex: 1;
  max-width: 50%;
  margin-right: 15px;
  .ant-card-head-title{
     padding: 10px 0px;
   }
`;

export const CardPointPositionStep = styled(CardChartPositionStep)`
   margin-right: 0px;
   margin-left: 15px;
`;
export const KeyPointList = styled.div`
 display: flex;
 color: #697396;
 flex-direction: column;
`;
export const KeyPointItem = styled.div`
 font-size: 16px;
 margin-bottom: 10px;
 .anticon {
  font-size: 18px ;
  margin-right: 20px;
  }
`;
export const CardResultsPositionStep = styled.div`
  .ant-card-grid{
    padding: 15px!important;
    min-height: 141px;
    text-align: center;
    align-items: center;
    display: flex;
    font-size: 16px;
    justify-content: center;
  }
  .ant-card-head-title{
     padding: 10px 0px;
   }
`;

export const DoughnutDesc = styled.div.attrs({
  className: 'presentation-doughnut-desc',
})`
  position: absolute;
  display: flex;
  flex-direction: column;
  text-align: center;
  transform: translateY(-50%);
`;
export const LineDoughnut = styled.span`
  font-size: 13px;
`;
export const LineDoughnutText = styled.span`
  font-size: 12px;
  margin-top: -3px;
`;
