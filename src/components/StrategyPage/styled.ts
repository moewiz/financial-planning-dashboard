import styled, { keyframes } from 'styled-components';
import { Form } from 'formik';
import { Collapse } from 'antd';

const { Panel } = Collapse;

const slideOutUp = keyframes`
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    visibility: hidden;
    transform: translate3d(0, -100%, 0);
  }
`;

const slideInUp = keyframes`
  from {
    transform: translate3d(0, 100%, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`;

export const StrategyPageWrapper = styled.div`
  padding: 48px 24px;
`;
export const FormWrapper = styled(Form)`
  &.paddingTop {
    margin-top: 328px;
  }
  margin-top: 64px;
  .ant-collapse {
    > .ant-collapse-item {
      border-bottom: none;
    }
  }
`;
export const PanelWrapper = styled(Panel)`
`;
export const GraphWrapper = styled.div`
`;
export const GraphGroup = styled.section`
  overflow: hidden;
  position: relative;
  background: #fff;
  height: 220px;
  border-radius: 0.35rem;
  box-shadow: 4px 4px 10px 3px rgba(100, 100, 101, 0.21), 0 0 15px rgba(115, 162, 208, 0.06);
  box-sizing: border-box;
  &.hasOnClick {
    cursor: pointer;
  }
`;
export const GraphCard = styled.div`
  height: 220px;
  width: 100%;
  padding: 10px 10px 6px 6px;
  overflow: hidden;
  position: absolute;
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-name: ${slideOutUp};
  &.active {
    animation-duration: 1s;
    animation-fill-mode: both;
    animation-name: ${slideInUp};
  }
`;
export const GraphTitle = styled.div`
  display: inline-block;
  width: 100%;
  font-size: 20px;
  color: #4e5b86;
  margin-bottom: 10px;
  .anticon-info-circle {
    margin-right: 5px;
  }
`;

export const StrategyWrapper = styled.div`
`;

export const TitleStrategyBlock = styled.h3`
  color: #4e5b86;
  font-size: 21px;
  font-weight: 600;
  margin-bottom: 0;
`;
// Style StrategyInfoWrapper
export const StrategyInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StatisticWrapper = styled.div`
  overflow: hidden;
  position: relative;
  height: 220px;
  background: #fff;
  border-radius: 0.35rem;
  box-shadow: 4px 4px 10px 3px rgba(100, 100, 101, 0.21), 0 0 15px rgba(115, 162, 208, 0.06);
`;
export const StatisticGroup = styled.div`
  animation-name: ${slideOutUp};
  animation-duration: 1s;
  animation-fill-mode: both;
  padding: 20px 20px;
  top: 0px;
  left: 0px;
  margin: 0px;
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: absolute;
  z-index: 20;
  &.active {
    animation-duration: 1s;
    animation-fill-mode: both;
    animation-name: ${slideInUp};
  }
`;

export const StatisticLabel = styled.span`
  display: inline-block;
  width: 100%;
  font-size: 14px;
  color: #4e5b86;
`;
export const StatisticValue = styled.span`
  display: inline-block;
  width: 100%;
  font-size: 26px;
  font-weight: 700;
  color: #4e5b86;
`;
export const StatisticSubValue = styled.span`
  display: inline-block;
  width: 100%;
  font-size: 16px;
  font-weight: 700;
  color: #4e5b86;
`;
export const StatisticUpDown = styled.span`
  font-size: 16px;
  color: #4e5b86;
  display: inline-block;
  margin-bottom: 14px;
  width: 100%;
  .anticon-caret-up {
    color: #29c308;
  }
  .anticon-caret-down {
    color: #ff0000;
  }
`;
