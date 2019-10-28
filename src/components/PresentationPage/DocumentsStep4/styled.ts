import styled from 'styled-components';

export const DocumentsStep4Form = styled.div.attrs({
  className: 'documents-step-4-from',
})`
  margin-bottom: 50px;
  textarea{
    width: 100%;
    height: 200px;
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
    &::placeholder {
      color: #989eb5;
    }
  }
`;
