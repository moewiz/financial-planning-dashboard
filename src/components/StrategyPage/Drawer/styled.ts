import styled, { keyframes } from 'styled-components';
import { Tabs } from 'antd';
const { TabPane } = Tabs;

export const DrawerTitle = styled.h4`
  display: inline-block;
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  color: #4e5b86;
  margin-bottom: 10px;
  .ant-spin-spinning{
    margin-left: 10px;
  }
`;

export const DrawerSubContent = styled.p`
  display: inline-block;
  width: 65%;
  font-size: 13px;
  color: #4e5b86;
  margin-bottom: 25px;
`;
export const DrawerNote = styled.p`
  font-size: 11px;
  color: #4e5b86;
`;
export const MainDrawerSection = styled.section`
`;

export const TabsCustomized = styled(Tabs).attrs({
  className: 'tabs-customized',
})`
  .ant-tabs-nav {
    .ant-tabs-tab{
      font-size: 13px;
      margin-right: 24px;
      padding: 8px 16px;
    }
    .ant-tabs-ink-bar{
      height: 1px;
    }
    .ant-tabs-nav-scroll{
      border-color: #efefef;
    }
  }
`;
export const TabsPaneCustomized = styled(TabPane).attrs({
  className: 'tabs-pane-customized',
})`

`;

export const DrawerTableHeader = styled.div`
  padding: 10px 5px;
  background: #ebeef1;
  text-align: right;
  .cell{
    font-weight: 600;
  }
`;
export const DrawerTableContent = styled.section`
  color: #4e5d86;
`;
export const DrawerTableWrapper = styled.div`
  .parent {
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
    color: #4e5d86;
    font-size: 13px;
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
export const DrawerTableRows = styled.div`
  margin-bottom: 10px;
  border-bottom: 1px solid #ededed;
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
    &-focused {
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
      color: #4e5d86;
    }
  }
  .ant-collapse {
    &-item {
      border-bottom: none !important;
    }
    &-header {
      padding: 0px 0px 0px 20px !important;
      color: #4e5d86 !important;
      display: flex;
      align-items: center;
      min-height: 45px;
      border-bottom: 1px solid #ededed;
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

export const DrawerTableParent = styled.div`
    display: flex;
    align-items: center;
    min-height: 45px;
    padding-bottom: 5px;
    border-bottom: 1px solid #ededed;
    font-weight: 600;
  i {
    float: left;
    margin-right: 10px;
  }
`;

export const DrawerRowTitle = styled.span.attrs({
  className: 'drawer-title-row',
})`
  font-weight: 600;
  flex: 1;
  padding-left: 20px;
`;

export const DrawerRowSubTitle = styled.span.attrs({
  className: 'drawer-title-sub-row',
})`
  flex: 1;
  color: #4e5d86;
  /* padding-left: 50px; */
`;

export const DrawerTableList = styled.div.attrs({
  className: 'drawer-table-list',
})`
  .drawer-title-sub-row{
    padding-left: 50px;
  }
  .drawer-table-list{
    .drawer-title-sub-row{
      padding-left: 70px;
    }
  }
`;

export const DrawerTableListItems = styled.div`
  display: flex;
  min-height: 35px;
  align-items: center;
  border-bottom: 1px solid #ededed;
  &:last-child{
    border: none;
  }
  &:first-child{
   border-bottom: 1px solid #ededed;
  }
  &.bold-text{
    .drawer-table-sub-list{
      font-weight: 600;
    }
    .drawer-title-sub-row{
      font-weight: 600;
    }
  }
   
`;

export const DrawerTableSubList = styled.div.attrs({
  className: 'drawer-table-sub-list',
})`
  display: flex;
  align-items: center;
  min-height: 35px;
  border-bottom: 1px solid #ededed;
  &:last-child{
    border: none;
  }
  &:first-child{
   border-bottom: 1px solid #ededed;
  }
  .drawer-title-sub-row{
    padding-left: 75px;
  }
`;

export const ActionDrawerGeneral = styled.section<{ visible?: boolean }>`
  display: flex;
  margin: 20px 0;
  flex: 0 0 100%;
  justify-content: flex-end;
  .ant-btn-default {
    background-color: #212121;
    color: #fff;
  }
  .ant-btn {
    font-weight: 600;
    margin-right: 15px;
    width: 135px;
    opacity: ${(props) => (props.visible ? '1' : '0.7')};
    height: 38px;
    border-radius: 18px;
  }
`;

export const DrawerFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  p {
    flex: 0 0 500px;
  }
`;

export const ActionDrawerBlock = styled.div`
  display: flex;
  align-items: center;
`;
