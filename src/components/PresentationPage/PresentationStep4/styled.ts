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

export const TemplateWrapper = styled.div`
  padding: 0 32px;
`;

export const TemplateHeader = styled.div`
  display: flex;
  margin-bottom: 50px;
  .header-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 30px;
    &--title {
      font-size: 40px;
      font-weight: 600;
      padding: 0 0 10px 10px;
    }
    &--content {
      font-size: 16px;
    }
  }
`;

export const TemplateContent = styled.div`
  ul {
    list-style-type: disc;
    li {
      margin-bottom: 15px;
    }
  }
`;
