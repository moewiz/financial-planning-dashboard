
import styled, { css } from 'styled-components';

export const EntryPickerTable = styled.section`
  align-items: center;
  display: flex;
  .input-hidden{
    postion: absolute;
    input{
      display: none;
    }
  }
  &.has-none{
    .anticon-calendar{
      display: none;
    }
    .ant-calendar-picker-input{
      border: 1px solid transparent;
      &:hover{
        border: 1px solid rebeccapurple;
      }
    }
  }
  &.text-small{
    .ant-input{
      font-size: 12px;
    }
  }
  &.font-bold{
    .ant-input{
      font-weight: 800;
    }
  }
`;
export const DateButtonCustom = styled.div`
  padding: 8px 0px;
  display: inline-flex;
  flex-direction: column;
  button{
    background: none;
    border: none;
    color: #1890ff;
    box-shadow: none;
    padding: 0px;
    text-align: left;
    width: fit-content;
    &:hover{
      color: #192A6F;
      background-color: transparent;
      border: none!important;
      text-decoration: underline!important;
    }
    &.dropdown-selected{
      background-color: #1890ff;
      padding: 0 10px;
      color: #fff;
      &:hover{
        opacity: 0.7
      }
    }
  }
`;
