import styled from 'styled-components';
import { Button, Form } from 'antd';

export const ModalNameBirthDay = styled.section.attrs({
  className : 'birtday-name-fixed',
})`
  /* position: fixed;
  bottom: 10px;
  left: 47px; */
`;

export const ButtonModalFixed = styled(Button).attrs({
  className : 'btn-modal-fixed',
})`
  width: 52px!important;
  height: 52px!important;;
  font-size: 19px;
  position: fixed;
  bottom: 47px;
  right: 47px;
`;
export const TitleForm = styled.span`
    font-size: 22px;
    color: #515c83;
    display: inline-block;
    width: 100%;
    margin-bottom: 30px;
    text-align: center;
`;

export const ModalFormHome = styled(Form)`
  max-width: 300px;
  margin: 0 auto!important;
  .ant-form-item-label{
    line-height: 24px;
    label{
      font-size: 12px;
      color: #515c83;
    }
  }
  .ant-form-item-children{
    width: 100%;
  }
  .ant-input{
    height: 40px;
    width: 100%;
  }
`;
