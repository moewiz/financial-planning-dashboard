import styled, { css } from 'styled-components';
import { Card } from 'antd';
export const CardFeesStep = styled.section`

`;
export const FeesTable = styled.div`
  max-width: 943px;
  margin: 0 auto;
  font-size: 16px;
  .fees-col-type{
    color: #515c83;
    font-size: 16px;
  }
  .documents-table{
    margin-bottom: 30px;
  }
  .fees-col-fee{
    color: #515c83;
    font-size: 16px;
    p{
      display: inline-block;
      width: 100%;
      &:first-child{
        margin-bottom: 10px;
      }
      &:last-child{
        margin-bottom: 0px;
      }
    }
  }
`;

export const CardListStep7 = styled.div.attrs({
  className: 'card-list-step7',
})`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  .card-item-step7 {
    margin: 0 10px;
    flex: 1;
    box-shadow: 0 2px 4px 0px rgba(0,0,0,0.23);
    max-width: 220px;
    &:first-child {
      margin-left:0px
    }
    &:last-child {
      margin-right:0px
    }
  }
`;

export const CardItemStyled = styled(Card).attrs({
  className: 'card-item-step7',
})`
  p {
    font-weight: 600;
    font-size: 16px;
    color: #4e5b86;
    margin-bottom: 0;
    text-align: center;
  }

  .ant-card-cover {
    padding: 20px 10px 0px;
  }

  .ant-card-body {
    padding: 20px;
  }
`;
export const CardStep7Container = styled(Card).attrs({
  className: 'card-step7-container',
})`
  max-width: 943px;
  margin: 0 auto!important;
  .ant-card-head-title{
    color: #515c83;
    padding: 10px 0px;
  }
  .ant-card-body{
    padding: 0px;
    .ant-card-body{
      color: #515c83;
      font-size: 16px;
      padding: 20px;
    }
  }
`;