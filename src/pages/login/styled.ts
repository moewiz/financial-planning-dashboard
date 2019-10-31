import styled from 'styled-components';

export const LoginMain = styled.div`
  background-image: url(./images/bg-login-indra.png);
  height: 100vh;
  background-repeat: no-repeat;
  background-position: center 80%;
  background-size: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  &:after{
    content:'';
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0px;
    left: 0px;
    background:rgba(54, 46, 69, .3);
  }
`;
