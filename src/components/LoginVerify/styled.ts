import styled from 'styled-components';
import { Button } from 'antd';

export const LoginVerifyWrap = styled.section`
  position: relative;
  z-index: 1;
  background-color: #fff;
  overflow: hidden;
  /* width: 534px; */
  border-radius: 10px;
  h2.ant-typography {
    margin: 30px 0px 0px;
  }
  .verify-form {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .ant-form-item {
      margin-left: 20px;
      &:first-child {
        margin-left: 0px;
      }
      &:last-child {
        flex: 0 0 100%;
        margin-bottom: 0px;
      }
    }
    .otp-error {
      height: 20px;
    }
  }
  .ant-input {
    width: 55px;
    height: 55px;
    font-size: 30px;
    color: #252525;
    padding: 0px;
    text-align: center;
    &:focus {
      & + span {
        display: none;
      }
    }
  }
`;

export const ResendCode = styled.section`
  font-size: 14px;
  color: #515c83;
  display: inline-block;
  text-align: center;
  margin: 20px 0px;
  width: 100%;
  span {
    margin-right: 10px;
    margin-left: 10px;
  }
  i {
    color: '#192a6f';
  }
  a {
    color: #0036f4;
  }
`;

export const ButtonVerify = styled(Button)`
  box-shadow: 0 3px 7px -2px rgba(0, 0, 0, 0.5);
  float: right;
  height: 32px;
  border: none;
  margin-right: 10px;
  margin-bottom: 40px;
  margin-top: 20px;
`;