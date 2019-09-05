import styled from 'styled-components';

export const NewProposedProductStyled = styled.div`
  position: relative;
  .ant-select-open {
    padding-bottom: 10px;
  }
  .ant-select-open .ant-select-selection {
    border-color: #d9d9d9;
    box-shadow: none;
  }
`;

export const ProposePopup = styled.div`
  position: absolute;
  background: #fff;
  padding: 0px 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 2;
`;

export const ProposeItem = styled.div`
  margin: 4px 0;
`;
