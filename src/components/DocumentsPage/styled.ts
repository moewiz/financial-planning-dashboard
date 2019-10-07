
import styled, { css } from 'styled-components';
import { Button } from 'antd';
export const DocumentsWrapper = styled.section`
  padding: 20px;
  .header-step-document{
    margin-bottom: 65px;
    .ant-steps-item-process{
      .ant-steps-item-icon{
        background: #1790ff;
      }
      & > .ant-steps-item-content{
        & > .ant-steps-item-title{
          color: #515c83;
          font-weight: 600;
          &::after{
            background-color: #45a3ff;
          }
        }
        & > .ant-steps-item-description{
          color: #616a8e;
          max-width: 120px;
          font-size: 12px;
          line-height: 14px;
        }
      }
    }
    .ant-steps-item-finish{
      & > .ant-steps-item-content{
        & > .ant-steps-item-description{
          font-size: 12px;
          line-height: 14px;
          max-width: 120px;
        }
      }
    }
    .ant-steps-item-wait {
      .ant-steps-item-icon{
        border-color: #9ba2b8;
        & > .ant-steps-icon{
          color: #9ba2b8;
        }
      }
      & > .ant-steps-item-content{
        & > .ant-steps-item-title{
          color: #9ba2b8;
          &::after{
            background-color: #a3a9be;
          }
        }
        & > .ant-steps-item-description{
          color: #989fb6;
          font-size: 12px;
          line-height: 14px;
          max-width: 120px;
        }
      }
    }
  }
`;
export const StepActionDocument = styled.div.attrs({
  className: 'steps-action',
})`
  display: flex;
  justify-content: flex-end;
`;

export const BtnStepDocument = styled(Button).attrs({
  className: 'btn-step-document',
})`
  width: 85px;
  border-radius: 25px;
  margin-left: 15px;
  background-color: #000;
  border-color: #000;
  color: #fff;
  &:hover{
    opacity: 0.7;
    background-color: #000;
    border-color: #000;
    color: #fff;
  }
  &.ant-btn-primary{
    background-color: #192A6F;
    border-color: #192A6F;
  }
`;
export const StepWrapper = styled.section`
  padding: 0 32px;
  .documents-table {
    margin-bottom: 50px;
    .ant-table-thead {
      background-color: #eceef1;
      & > tr {
        display: flex;
        & > th{
          background-color: #ebeef1;
          color: #515c83;
          flex: 1;
          font-weight: 600;
        }
      }
    }
    .ant-table-tbody{
      font-size: 13px;
      & > tr {
        display: flex;
        & > td{
          flex: 1;
          color: #586388;
        }
      }
      .strategy-item {
        width: 100%;
        .edit-cell {
          width: 100%;
          text-align: left;
          font-weight: normal;
          padding: 0 10px;
          margin-left: -10px;
        }
      }
    }
  }
`;
export const TitleStep = styled.div.attrs({
  className: 'document-title-step',
})`
  color: #515c83;
  text-transform: capitalize;
  font-weight: 600;
  margin-bottom: 5px;
  width: 100%;
  display: inline-block;
  font-size: 16px;
`;

export const TitleStepSmall = styled.div.attrs({
  className: 'document-title-step-small',
})`
  color: #9096af;
  text-transform: capitalize;
  font-size: 13px;
  margin-bottom: 20px;
  width: 100%;
  display: inline-block;
`;
