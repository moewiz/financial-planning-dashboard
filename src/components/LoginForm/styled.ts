
import styled from 'styled-components';
import { Button } from 'antd';

export const LoginFormWrap = styled.section`
    position: relative;
    z-index: 1;
    background-color: #fff;
    overflow: hidden;
    width: 545px;
    border-radius: 10px;
    .ant-btn-primary[disabled]{
    }
`;

export const ButtonSignIn = styled(Button)`
  margin-bottom: 15px;
  box-shadow: 0 3px 7px -2px rgba(0, 0, 0, 0.5);
  float: right;
  height: 32px;
  border: none;
  margin-left: 10px;
`;
export const SubHeading = styled.span`
  font-size: 18px;
  color: #252525;
  display: inline-block;
  text-align: center;
  margin: 5px 0px 30px 0px;
  width: 100%;
`;

export const SubVerifyHeading = styled(SubHeading)`
  margin: 5px 0px 0px 0px;
`;
export const SubNumberHeading = styled(SubHeading)`
  font-weight: 700
`;