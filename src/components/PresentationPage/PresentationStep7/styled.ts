import styled, { css } from 'styled-components';

export const CardFeesStep = styled.section`

`;
export const FeesTable = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #000;
`;
export const FeesRow = styled.div`
  display: flex;
  border-bottom: 1px solid #000;
  .fees-col-item{
    &:nth-child(2){
      border-left: 1px solid #000;
      border-right: 1px solid #000;
    }
  }
  &:last-child {
    border-bottom: none;
  }
`;
export const FeesRowHead = styled(FeesRow)`
 background-color: #4a85e8;
 .fees-col-item{
  padding: 7px 15px;
  align-items: center;
  color: #000;
  font-weight: 600;
 }
`;
export const FeesColItem = styled.div.attrs({
  className: 'fees-col-item',
})`
  padding: 15px;
  flex: 1;
  display: flex;
`;

export const FeesColCenterItem = styled(FeesColItem)`
  justify-content: center;
`;
export const FeesColBoldItem = styled(FeesColItem)`
  font-weight: 600;
`;