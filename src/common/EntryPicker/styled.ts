
import styled, { css } from 'styled-components';

export const EntryPickerTable = styled.section`
  align-items: center;
  display: flex;
  &.picker-year{
    width: 60px;
    input{
      font-weight: 700;
      padding: 0px;
    }
  }
  .input-hidden{
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
  .dropdown-value {
    color: #5f698d;
    margin-left: -10px;
    cursor: pointer;
    box-shadow: none;
    background: transparent;
    min-height: 35px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0 10px;
    transition: all 300ms ease;
    height: 35px;
    border: 1px solid transparent;
    &:hover {
      border: 1px solid #d9d9d9;
    }
    span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
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
    padding: 0px 10px;
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
