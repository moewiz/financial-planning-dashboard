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
  flex: 0 0 25%;

`;
export const StepPositionRight = styled.div.attrs({
  className: 'presentation-position-right',
})`
  flex: 0 0 calc(75% - 20px);
  margin-left: 20px;
`;

export const StepPositionTop = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 30px;
`;

export const StepPositionBottom = styled.div`
  box-shadow: 0 2px 4px 0px rgba(0,0,0,0.23);
  padding: 35px 0px 45px 0px;
  display: inline-block;
  width: 100%;
  margin: 0 auto;
  position: relative;
  .chartjs-render-monitor{
    transform: scale(1.2);
  }
`;

export const TitlePositionStep = styled.div`
  font-size: 16px;
  margin-bottom: 5px;
  font-weight: 600;
`;

export const ValPositionStep = styled.div`
 font-size: 18px;
`;

export const IcomeBlockStep = styled.div`
  box-shadow: 0 2px 4px 0px rgba(0,0,0,0.23);
  flex: 0 0 calc(50% - 20px);
  margin: 10px 10px;
  text-align: center;
  padding: 25px 10px;
  border-radius: 5px;
`;

export const ExpensesBlockStep = styled(IcomeBlockStep)`
`;

export const AssetsBlockStep = styled(IcomeBlockStep)`
`;

export const LiabilitiesBlockStep = styled(IcomeBlockStep)`
`;

export const CardChartPositionStep = styled.section`
  box-shadow: 0 2px 4px 0px rgba(0,0,0,0.23);
  flex: 0 0 calc(50% - 30px);
  max-width: 50%;
  margin-right: 15px;
`;

export const CardPointPositionStep = styled(CardChartPositionStep)`
   margin-right: 0px;
   margin-left: 15px;
`;
export const KeyPoitList = styled.div`
 display: flex;
 color: #697396;
 flex-direction: column;
`;
export const KeyPoitItem = styled.div`
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
    min-height: 75px;
  }
`;

export const DoughnutDesc = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  text-align: center;
  left: calc(50% - 30px);
  top: calc(50% + 5px);
`;
export const LineDoughnut = styled.span`
  font-size: 13px;
`;
export const LineDoughnutText = styled.span`
  font-size: 12px;
  margin-top: -3px;
`;
