import styled, { css } from 'styled-components';
import { Card } from 'antd';

export const DocumentsCardWrapper = styled.div.attrs({
  className: 'documents-card-wrapper',
})`
  margin-bottom: 50px;
  margin-top: 20px;
  flex-wrap: wrap;
  display: flex;
`;
export const CardBlock = styled(Card).attrs({
  className: 'card-documents',
})<{ isplaceholder?: string }>`
  cursor: pointer;
  flex: 0 0 calc(100% / 3 - (40px / 3));
  margin-bottom: 20px !important;
  border-color: #9599a8 !important;
  border-radius: 5px !important;
  ${(props) =>
    props.isplaceholder &&
    css`
      border-color: #cecece !important;
    `}
  &:nth-child(3n+2) {
    margin: 0px 20px 20px 20px;
  }
  .ant-card-body {
    padding: 10px 15px;
    height: 134px;
    overflow: overlay;
  }
  .ant-card-head {
    min-height: 48px;
    padding: 0 15px;
    .ant-card-head-title {
      color: #515c83;
      padding: 15px 0px;
      font-size: 15px;
      font-weight: 600;
    }

    .strategy-item {
      width: 100%;

      .ant-input.edit-cell {
        width: 100%;
        text-align: left;
        border: none;
        font-size: 15px;
        color: #515c83;

        &:focus {
          border: none !important;
        }
      }
    }
  }
`;
export const CardBlockText = styled.p.attrs({
  className: 'documents-card-text',
})`
  color: #515c83;
  position: relative;
  padding-left: 15px;
  margin-bottom: 5px;
  &::after {
    width: 6px;
    height: 6px;
    content: '';
    position: absolute;
    left: 0px;
    top: calc(50% - 3px);
    background: #515c83;
    border-radius: 100%;
  }
`;
