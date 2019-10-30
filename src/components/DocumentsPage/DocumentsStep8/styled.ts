import styled, { keyframes, css } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
`;
export const DocumentsStep8WP = styled.div.attrs({
  className: 'documents-step-8-wrapper',
})`
  margin-bottom: 50px;
  .fadeIn {
    text-align: center;
    animation-name: ${fadeIn};
    animation-duration: 1s;
    animation-fill-mode: both;
  }
`;

export const ListCardThumbnails = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const CardThumbnailItem = styled.div<{ checked?: boolean; }>`
  background-color: #fff;
  border: 1px solid #dcdcdc;
  cursor: pointer;
  flex: 0 0 27%;
  margin: 15px 10px;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 300ms ease;
  height: 160px;
  border-radius: 0.35rem;
  box-shadow: 4px 4px 10px 3px rgba(100,100,101,0.21), 0 0 15px rgba(115,162,208,0.06);
  box-sizing: border-box;
  transition: all 1.5s ease;
  padding: 10px;
  ${(props) => props.checked && css`
    background-color: #e4fff3;
    border-color: #97dec4;
  `}
`;

export const TitleCard = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #515b83;
`;

export const NumberCard = styled.div`
  font-size: 36px;
  font-weight: 600;
  color: #515b83;
  margin: 10px 0px;
`;

export const StatusCard = styled.div`
  color: #747d9b;
`;

export const DoneCard = styled.div`
  font-size: 36px;
  color: #029c22;
  margin-top: 10px;
`;

export const CardThumbnailChecked = styled(CardThumbnailItem)`
  background-color: #e4fff3;
  transition: background-color 1s ease;
  transition-delay: 3s;
  border: 1px solid #97dec4;
`;
