import styled from 'styled-components';
import { Layout } from 'antd';

export const LayoutMain = styled(Layout)`
  .IconSider {
    position: absolute;
    top: 17px;
    right: 10px;
  }
`;
export const MainLayoutContent = styled(Layout).attrs({
  className: 'main-layout-content-home',
})`
  border-left: 1px solid #e8e8e8;
  .topmenu {
    padding-left: 45px;
  }
`;

export const Content = styled(Layout.Content)`
  margin-top: 56px;
`;
