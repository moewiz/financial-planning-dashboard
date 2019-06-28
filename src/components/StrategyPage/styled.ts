import styled, { keyframes } from 'styled-components';
import { Collapse } from 'antd';

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
export const GraphWrapper = styled.div`
  &.marginTop {
    margin-top: -31px;
  }
`;
export const GraphGroup = styled.section`
  overflow: hidden;
  position: relative;
  background: #fff;
  height: 220px;
  border-radius: 0.35rem;
  box-shadow: 4px 4px 10px 3px rgba(100, 100, 101, 0.21), 0 0 15px rgba(115, 162, 208, 0.06);
  box-sizing: border-box;
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
  font-size: 14px;
  color: #4e5b86;
  margin-bottom: 10px;
  .anticon-info-circle {
    margin-right: 5px;
  }
`;

export const StrategyWrapper = styled.div`
  margin-top: 64px;
`;

export const TitleStrategyBlock = styled.h3`
  color: #4e5b86;
  font-size: 21px;
  font-weight: 600;
  margin-bottom: 20px;
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
export const DrawerTableWrapper = styled.div`
  .columns {
    padding: 6px 4px;
    background: #dcdcdc;
    text-align: right;
  }
  .parent {
    i {
      float: left;
    }
    .title {
      font-weight: 600;
    }
  }
  .title {
    float: left;
  }
  .list {
    margin-left: 25px;
    clear: both;
  }
  .drawer-item {
    clear: both;
  }
  .item {
  }
  .values {
    text-align: right;
    padding-right: 6px;
  }
  .cell {
    display: inline-block;
    width: 60px;
    margin: 0 5px;
    text-align: center;
  }
  .edit-cell {
    width: 69px;
    margin-right: 1px;
    border: 1px solid;
    border-color: transparent;
    &:hover {
      border-color: #dcdcdc;
    }
  }
  .ant-input-number {
    &:focus {
      border: 1px solid #dcdcdc !important;
      box-shadow: none;
      outline: 0;
    }
    &-handler-wrap {
      display: none;
    }
    &-input-wrap {
      &:focus {
        outline: 0;
      }
    }
    &-input {
      text-align: center;
      font-weight: 600;
      padding: 0 5px;
    }
  }
  .bold-text {
    .title {
      font-weight: 600;
    }
    .cell {
      font-weight: 600;
    }
  }
`;

export const DrawerItemStyled = styled.section`
  .ant-collapse {
    &-item {
      border-bottom: none !important;
    }
    &-header {
      background: #fff;
      padding: 0px 0px 0px 15px !important;
      color: rgba(0, 0, 0, 0.65) !important;
      font-weight: 600;
      i {
        left: 0 !important;
      }
    }
    .ant-collapse-content > .ant-collapse-content-box {
      padding: 0px;
    }
    &-content {
    }
  }
`;
