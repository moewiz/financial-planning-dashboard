
import styled, { css } from 'styled-components';

export const EntryInputNumberWrapper = styled.section`
  display: inline;
  cursor: pointer;
  &.bold{
    .ant-input-number{
      border: 1px solid transparent;
      font-size: 12px;
      width: auto;
      transition: all 300ms ease;
      .ant-input-number-handler-wrap{
        opacity: 0;
      }
      &.ant-input-number-focused{
        border: 1px solid #d9d9d9;
        width: 90px;
        transition: width 300ms ease;
        box-shadow: none;
        .ant-input-number-handler-wrap{
          opacity: 1;
        }
      }
      input{
        padding: 0px 0px 0px 5px;
        font-weight: 800;
        width: 60px;
        &:focus{
          width: 90px;
        }
      }
    }
  }
`;
export const EntryInputWrapper = styled.section`
  width: 120px;
  display: inline-block;
  &.default{
    input{
      padding: 0 10px;
      font-size: 14px;
      width: 100%;
      border: 1px solid transparent;
      &:focus{
        border: 1px solid #d9d9d9;
        outline: none;
        box-shadow: none;
      }
    }
  }
`;
export const EntryInputDefault = styled.section`
  width: 170px;
  display: inline-block;
  &.default{
    input{
      padding: 0 10px;
      font-size: 14px;
      width: 100%;
      &:focus{
        border: 1px solid #000;
        outline: none;
        box-shadow: none;
      }
    }
  }
`;

export const PrefixGroup = styled.section`
`;
export const TypeDollarPrefix = styled.span`


`;
export const TypePercentPrefix = styled.span`

`;
