import styled from 'styled-components';

export const DocumentsStep1Form = styled.div.attrs({
  className: 'documents-step-1-from',
})`
  margin-bottom: 50px;

  textarea.ant-input {
    width: 100%;
    min-height: 200px;
    max-height: 500px !important;
    padding: 20px;
    color: #616b8e;
    resize: none;
    border: 1px solid #989eb5;
    border-radius: 10px;
    font-size: 14px;
    &:focus{
      outline: none;
      border: 1px solid #50566e;
    }
    &:hover {
      border-color: #989eb5;
    }
    &::placeholder {
      color: #989eb5;
    }
  }
`;
