import styled from 'styled-components';

export const NewProposedProductStyled = styled.div`
  position: relative;
  .ant-select-open {
    // padding-bottom: 10px;
  }
  .ant-select-open .ant-select-selection {
    // border-color: #d9d9d9;
    // box-shadow: none;
  }
`;

export const ProposePopupWrapper = styled.div`
  position: absolute;
  background: #fff;
  // padding: 8px 8px 0px 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 2;
`;

export const ProposeItem = styled.div`
  margin: 4px 0;
  cursor: pointer;
`;

export const DrawerProductWrapper = styled.div`
  .ant-tabs-bar {
    margin: 0;
  }
`;

export const FundTabContent = styled.div`
  display: flex;
`;

export const FundBlock = styled.div`
  flex: 0 0 340px;
  margin: 0 8px;
`;

export const HorizontalScrollable = styled.div`
  flex: 1;
  flex-wrap: nowrap;
  flex-direction: row;
  display: flex;
  overflow: overlay;
`;
