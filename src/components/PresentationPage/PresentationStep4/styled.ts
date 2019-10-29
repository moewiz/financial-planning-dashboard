import styled from 'styled-components';
import { Card } from 'antd';

export const CardList = styled.div.attrs({
  className: 'card-list',
})`
  display: flex;

  .card-item {
    margin: 0 10px;
  }
`;

export const CardItemStyled = styled(Card).attrs({
  className: 'card-item',
})`
  p {
    font-weight: 600;
    font-size: 13px;
    color: #4e5b86;
    margin-bottom: 0;
    text-align: center;
  }

  .ant-card-cover {
    padding: 30px 10px 20px;
  }

  .ant-card-body {
    padding: 20px;
  }
`;
