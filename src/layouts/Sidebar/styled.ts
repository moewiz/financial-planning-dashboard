import styled, { createGlobalStyle } from 'styled-components';
import { Menu, Button, Layout, Skeleton, Input } from 'antd';
import { get } from 'lodash';

export const StickyStyle = createGlobalStyle<{ collapsed?: boolean }>`
  .sticky {
    position: fixed;
    top: 0;
    width: ${(props) => (props.collapsed ? 'calc(100% - 80px)' : 'calc(100% - 295px)')};
    background-color: #fff;
    z-index: 1052;
    margin: 0 -24px;
    padding: 4px 24px 20px 24px;
    box-shadow: 2px 5px 4px 0px rgba(240, 240, 240, 0.7);
  }
  .ant-drawer {
    &-open.strategy-drawer {
      z-index: 1052;
    }
  }
`;
const { Sider } = Layout;

const SubMenu = Menu.SubMenu;
export const ClientInfo = styled.div.attrs({
  className: 'client-Info',
})`
  display: flex;
  align-items: center;
  cursor: pointer;
  .ant-avatar-string {
    transform: scale(1) translateX(-50%) !important;
  }
`;

export const SiderCollapsible = styled(Sider).attrs({
  className: 'client-side-collapsible dumoamay',
})<{ collapsed?: boolean }>`
  &.ant-layout-sider-collapsed {
    flex: 0 0 2px !important;
    max-width: 2px !important;
    min-width: 2px !important;
    width: 2px !important;
    .top-search{
      box-shadow: none;
    }
    .IconSider{
      right: -5px;
    }
    .anticon-search {
      display: none;
    }
    input {
      display: none;
    }
    .birtday-name-fixed {
      left: 10px;
      display: none;
    }
    .btn-sidebar {
      border-radius: 100%;
      width: 40px;
      height: 40px;
      padding: 0 10px;
      transition: all ease 200ms;
      span {
        display: none;
      }
    }
    .client-Info {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 70px;
    }
    .client-full-name {
      display: none;
    }
    .client-item-root {
      .ant-menu-submenu-title {
        padding: 0px 5px !important;
      }
    }
  }
`;
// ant-menu-submenu-open ant-menu-submenu-active
// aria-owns="sub"
export const FullName = styled.span.attrs({
  className: 'client-full-name',
})`
  font-size: 16px;
  font-weight: 500;
  color: #515c83;
  margin-left: 8px;
`;
export const ClientSide = styled(Menu).attrs({
  className: 'client-side-modify',
})`
  border-right: 0px !important;
  &.ant-menu-inline-collapsed {
    width: 0px;
    visibility: hidden;
    .client-item-root{
      display: none;
    }
  }
`;

export const ClientRoot = styled(SubMenu).attrs({
  className: 'client-item-root',
})`
  & > .ant-menu-submenu-title {
    height: 60px !important;
    background: transparent;
    line-height: 60px !important;
    padding-left: 10px !important;
    padding-right: 20px !important;
    margin: 0 auto !important;
    box-shadow: none;
    border-radius: 0;
    position: relative;
    &:hover {
      background-color: transparent;
    }
  }
`;
export const ClientItem = styled(SubMenu).attrs({
  className: 'client-item-modify',
})`
  margin-bottom: 5px;
  i.ant-menu-submenu-arrow {
    display: block;
  }
  .ant-menu-submenu-title {
    height: 35px !important;
    /* background: #f4f6fb; */
    padding-left: 10px !important;
    padding-right: 10px !important;
    line-height: 35px !important;
    margin: 0 auto !important;
    border-radius: 8px;
    position: relative;
    &:hover {
      /* background-color: #e0e3e8; */
      span {
        color: #515c83;
        font-weight: 600;
      }
    }
  }
  .ant-menu-sub {
    width: calc(100% - 55px) !important;
    margin: 0 auto;
    background-color: transparent !important;
  }
`;

export const SubList = styled(Menu.Item).attrs({
  className: 'sub-list-modify',
})`
  margin: 0px !important;
  border-left: 1px solid #e4e8eb;
  padding-left: 30px !important;
  height: 30px !important;
  color: #737c9c;
  font-size: 14px !important;
  i {
    margin-right: 14px;
  }
  &:first-child {
    margin-top: 0px !important;
  }
  &:hover {
    color: #082074 !important;
    border-left: 1px solid #082074;
    background: transparent !important;
  }
  &.ant-menu-item-selected {
    color: #082074;
    border-left: 1px solid #082074;
    background: transparent !important;
    font-weight: 500;
    i {
      color: #082074;
    }
  }
`;

export const StatusItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const DateItem = styled.span`
  font-size: 15px;
  position: relative;
  padding-left: 7px;
  color: #697396;
  display: flex;
  padding-right: 25px;
  align-items: center;
  .anticon {
    font-size: 18px !important;
    margin-right: 20px !important;
  }
`;

interface StatusTags {
  readonly tagName: string;
}

export const StatusTags = styled.span<StatusTags>`
  font-size: 10px;
  width: 96px;
  text-transform: capitalize;
  display: inline-block;
  height: 20px;
  border-radius: 3px;
  text-align: center;
  line-height: 17px;
  color: ${({ tagName, theme }) => get(theme, `colors.text-${tagName}`)};
  border: 1px solid ${({ tagName, theme }) => get(theme, `colors.border-${tagName}`)};
  background-color: ${({ tagName, theme }) => get(theme, `colors.bg-${tagName}`)};
`;
export const ButtonSideBar = styled(Button).attrs({
  className: 'btn-sidebar',
})`
  width: 212px;
  height: 52px;
  border-radius: 26px;
  font-size: 18px;
  display: block;
  margin: 15px auto;
`;
export const SkeletonClient = styled(Skeleton).attrs({
  className: 'Skeleton-Client',
})`
  padding: 15px;
`;

export const InputSearch = styled(Input)`
  border: none;
  color: #515c83;
  &:focus {
    outline: none;
    border: none;
    box-shadow: none;
  }
`;

export const TopSearch = styled.div<{ border?: boolean, className?: string }>`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  border: none;
  padding-left: 30px;
  max-width: 350px;
  position: relative;
  height: 46px;
  box-shadow: 0 2px 4px 0px rgba(0, 0, 0, 0.23);
  .anticon {
    position: absolute;
    right: 10px;
    cursor: pointer;
    z-index: 3;

    &.anticon-search {
      left: 10px;
      right: unset;
      font-size: 18px;
      cursor: default;
    }
  }
  .custom-select {
    width: 100%;
    position: absolute;
    left: 0;
    padding: 0 25px;
    .ant-select-selection {
      border: none;
      box-shadow: none;
      &__rendered {
        line-height: 32px;
      }
    }
    .ant-select-selection-selected-value {
      .code {
        display: none;
      }
    }
  }
`;
