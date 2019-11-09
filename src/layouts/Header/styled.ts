import styled, { css } from 'styled-components';
import { Input } from 'antd';

export const TopMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 46px;
  box-shadow: 0 2px 4px 0px rgba(0, 0, 0, 0.23);
  padding: 0px 25px;
`;

export const InputSearch = styled(Input)`
  border: none;
  color: #515c83;
  &:focus {
    outline: none;
    border: none;
    box-shadow: none;
  }
`;

export const TopSearch = styled.div<{ border?: boolean }>`
  display: flex;
  align-items: center;
  ${(props) =>
    props.border &&
    css`
      border: 1px solid #999;
      margin-top: 20px;
      max-width: 350px;
      position: relative;
      height: 34px;
      .anticon {
        position: absolute;
        right: 10px;
        cursor: pointer;
        z-index: 3;

        &.anticon-search {
          left: 10px;
          right: unset;
          font-size: 18px;
          cursor: default;
        }
      }
    `}
  .custom-select {
    width: 100%;
    position: absolute;
    left: 0;
    padding: 0 25px;
    .ant-select-selection {
      border: none;
      box-shadow: none;
      &__rendered {
        line-height: 32px;
      }
    }
    &.ant-select-disabled {
      .ant-select-selection {
        background-color: #fff;
      }
    }
    .ant-select-selection-selected-value {
      .code {
        display: none;
      }
    }
  }
`;

export const MenuItem = styled.div`
  display: flex;
  color: #515c83;
  height: 100%;
  align-items: center;
  .ant-avatar {
    /* margin-right: 10px; */
  }
  .client-full-name {
    font-size: 14px;
    margin: 0 0px 0px 10px;
    height: 46px;
    line-height: 46px;
  }
`;
