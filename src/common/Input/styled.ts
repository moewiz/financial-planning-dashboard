import styled, { css } from 'styled-components';
import { Input } from 'antd';

const generalInput = css`
  border: 1px solid #515c83;
  position: relative;
  background: transparent;
  z-index: 1;
  height: 46px;
  padding: 0px 20px;
  &:hover {
    border-color: rgb(116, 126, 169);
  }
  &:focus {
    outline: none;
    transition: all ease 200ms;
    box-shadow: none;
    border-color: rgb(116, 126, 169);
  }
`;

export const InputLabel = styled.p`
  position: absolute;
  transition: all ease 200ms;
  font-size: 16px;
  background: transparent;
  left: 20px;
  color: rgba(81, 92, 131, 0.5);
  top: calc(50% - 20px);
  z-index: 0;
`;

export const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 10px;
  input:not([value=""]) {
    & + p {
      top: -10px;
      font-size: 14px;
      background: #fff;
      height: 20px;
      line-height: 20px;
      z-index: 1;
      padding: 0px 10px;
      left: 10px;
    }
  }
  input{
    ${generalInput};
    &:focus {
      & + p {
        top: -10px;
        font-size: 14px;
        background: #fff;
        height: 20px;
        line-height: 20px;
        z-index: 1;
        padding: 0px 10px;
        left: 10px;
      }
    }
  }
`;

export const InputLogin = styled(Input)``;

export const PasswordWrapper = styled.div`
  position: relative;
  margin-bottom: 10px;
  .title{
    display: none;
  }
  input {
    ${generalInput};
    z-index: 9;
    padding: 0 30px 0 20px;

    &:focus {
      & + span {
        z-index: 10;
        &:after{
          top: -26px;
          padding: 0px 10px;
          right: 292px;
        }
      }
    }
    &:not([value=""]) {
      & + span {
        z-index: 10;
        &:after{
          top: -26px;
          padding: 0px 10px;
          right: 292px;
        }
      }
    }
  }
`;

export const PasswordLogin = styled(Input.Password).attrs({
  className: 'password',
  })`
  & > span{
    &:after{
     content:'Password';
      top: -3px;
      font-size: 14px;
      position: absolute;
      transition: all ease 200ms;
      background: #fff;
      height: 20px;
      line-height: 20px;
      color: #b9bdcd;
      z-index: -1;
      right: 300px
    }
  }
`;
