import styled, { css } from 'styled-components';

export const EventWrapper = styled.div`
  margin-bottom: 20px;

  .table-entry-header {
    margin-bottom: 20px;
  }
`;

export const EventItemWrapper = styled.div`
  display: flex;
  align-items: baseline;
  color: #4e5b86;
  margin: 10px 0;

  .checkbox-customized {
    padding-top: 0;
  }

  .remove {
    font-size: 16px;
    margin-left: 5px;
  }
`;

export const Owner = styled.b`
  text-transform: capitalize;
`;

export const Sentence = styled.div`
  margin-left: 10px;
`;

export const SlidersBlockWrapper = styled.div`
  padding-bottom: 10px;
`;

export const SliderWrapper = styled.div`
  margin-bottom: 20px;
`;
export const SliderTitle = styled.div`
  font-weight: 600;
`;
export const ValueWrapper = styled.div<{ marks?: boolean }>`
  display: flex;
  align-items: center;
  .ant-slider {
    margin: ${props => (props.marks ? '14px 6px 10px' : '14px 0 10px')};
  }
`;
export const ValueStyled = styled.div`
  flex: 0 0 80px;
  margin-left: 14px;
`;
export const ChartsBlockWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  & > div {
    &:last-child {
      margin-bottom: 0px;
    }
    &:nth-child(3) {
      margin-bottom: 0px;
    }
  }
`;
export const ChartBlock = styled.div`
  box-shadow: 0 2px 4px 0px rgba(0, 0, 0, 0.23);
  flex: 0 0 calc(50% - 20px);
  text-align: center;
  border-radius: 5px;
  padding: 30px 15px;
  ${(props: { hidden?: boolean }) =>
    props.hidden &&
    css`
      visibility: hidden;
    `};

  &:hover {
    cursor: pointer;
  }
`;

export const ChartBlockLeft = styled(ChartBlock)`
  margin-right: 10px;
  margin-bottom: 20px;
`;

export const ChartBlockRight = styled(ChartBlock)`
  margin-left: 10px;
  margin-bottom: 20px;
`;

export const ChartBlockDrillDown = styled(ChartBlock)`
  margin-top: 10px;
`;

export const DrilldownChartWrapper = styled.div`
  height: 100%;
  .anticon.anticon-arrow-left {
    font-size: 24px;
    padding: 8px;
  }
`;
export const DrilldownHeader = styled.div`
  display: flex;
`;
export const DrilldownContent = styled.div`
  height: 100%;
`;
export const ButtonGroup = styled(ChartsBlockWrapper)``;
export const DrilldownButton = styled.button`
  min-width: 180px;
  text-align: center;
  padding: 5px 20px;
  margin: 0 20px;
  font-weight: 600;
  border: 1px solid #dedede;
  border-radius: 4px;
  outline: none;

  &:hover,
  &.active {
    cursor: pointer;
    border-color: #03a9f4;
  }
`;
