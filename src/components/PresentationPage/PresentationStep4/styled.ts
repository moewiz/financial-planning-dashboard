import styled, { keyframes } from 'styled-components';
import { Card } from 'antd';

const fadeInIcon = keyframes`
  from {
    opacity: 0;
    -webkit-transform: translate3d(80%, 0, 0);
    transform: translate3d(80%, 0, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    -webkit-transform: translate3d(30px, 0, 0);
    transform: translate3d(30px, 0, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
`;

export const CardList = styled.div.attrs({
  className: 'card-list',
})`
  display: flex;

  .card-item {
    margin: 0 10px;
    flex: 1;
    &:first-child {
      margin-left:0px
    }
    &:last-child {
      margin-right:0px
    }
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
  .ant-skeleton.ant-skeleton-with-avatar {
    margin-bottom: 50px;
    .ant-skeleton-header {
      padding-right: 35px;
      .icon-placeholder {
        width: 100px;
        height: 120px;
      }
    }
    .ant-skeleton-content {
      h3.ant-skeleton-title {
        height: 32px;
        margin-top: 0px;
        margin-bottom: 40px;
      }
    }
  }
  .fadeInIcon {
    animation-name: ${fadeInIcon};
    animation-duration: 0.5s;
    animation-fill-mode: both;
  }
  .fadeIn {
    animation-name: ${fadeIn};
    animation-duration: 0.5s;
    animation-fill-mode: both;
  }

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
