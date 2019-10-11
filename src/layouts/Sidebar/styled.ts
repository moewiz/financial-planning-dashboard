import styled, { createGlobalStyle } from 'styled-components';
import { Menu, Button, Layout, Skeleton } from 'antd';
import { get } from 'lodash';

export const StickyStyle = createGlobalStyle<{ collapsed?: boolean }>`
  .sticky {
    position: fixed;
    top: 0;
    width: ${(props) => (props.collapsed ? 'calc(100% - 80px)' : 'calc(100% - 295px)')};
    background-color: #fff;
    z-index: 1051;
    margin: 0 -24px;
    padding: 4px 24px 20px 24px;
    box-shadow: 2px 5px 4px 0px rgba(240, 240, 240, 0.7);
  }
  .ant-drawer.ant-drawer-open {
    z-index: 1052;
  }
`;
const { Sider } = Layout;

const SubMenu = Menu.SubMenu;
export const ClientInfo = styled.div.attrs({
  className: 'client-Info',
})`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 0px 15px;
  cursor: pointer;
`;

export const SiderCollapsible = styled(Sider).attrs({
  className: 'client-side-collapsible',
})<{ collapsed?: boolean }>`
  &.ant-layout-sider-collapsed {
    .btn-sidebar {
      border-radius: 100%;
      width: 60px;
      height: 60px;
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
    & > .ant-menu-submenu {
      & > .ant-menu-submenu-title {
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
  margin-top: 10px;
  font-size: 18px;
  font-weight: 500;
  color: #515c83;
  // margin-left: 15px;
`;
export const ClientSide = styled(Menu).attrs({
  className: 'client-side-modify',
})`
  height: calc(100vh - 90px);
  overflow-y: overlay;
  overflow-x: hidden;
  border-right: none !important;
`;

export const ClientRoot = styled(SubMenu).attrs({
  className: 'client-item-root',
})`
  i.ant-menu-submenu-arrow {
    display: none;
  }
  & > .ant-menu-submenu-title {
    height: 138px !important;
    background: transparent;
    line-height: 40px !important;
    width: calc(100% - 40px) !important;
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
  margin-bottom: 15px;
  i.ant-menu-submenu-arrow {
    display: block;
  }
  .ant-menu-submenu-title {
    height: 40px !important;
    background: #f4f6fb;
    padding-left: 24px !important;
    line-height: 40px !important;
    width: calc(100% - 40px) !important;
    margin: 0 auto !important;
    box-shadow: 0px 2px 7px -2px #acacad;
    border-radius: 8px;
    position: relative;
    &:hover {
      background-color: #e0e3e8;
    }
  }
  .ant-menu-sub {
    width: calc(100% - 40px) !important;
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
  height: 34px !important;
  color: #737c9c;
  font-size: 18px !important;
  i {
    margin-right: 14px;
  }
  &:first-child {
    margin-top: 10px !important;
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
  font-size: 12px;
  position: relative;
  padding-left: 20px;
  color: #697396;
  &:after {
    content: '';
    width: 10px;
    height: 10px;
    background: #d8d8d8;
    display: inline-block;
    border-radius: 100%;
    position: absolute;
    left: 0px;
    top: calc(50% - 5px);
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
