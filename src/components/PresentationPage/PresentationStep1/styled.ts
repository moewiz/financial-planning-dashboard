import styled from 'styled-components';

export const StepWelcome = styled.div.attrs({
  className: 'presentation-step-welcome',
})`
  display: flex;
  color: #515c83;
  align-items: center;
  justify-content: center;
  margin-top: 90px;
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RightColumn = styled.div`
  flex: 0 0 200px;
  img{
    max-width: 100%;
  }
`;

export const TitleWelcome = styled.div`
  font-size: 48px;
  font-weight: 600;
  margin-bottom: 30px;
`;

export const TitleWelcomeImg = styled.img`
  width: 200px;
  margin-bottom: 30px;
`;

export const PresentationSection = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

export const PresentationLabel = styled.div`
  font-size: 17px;
  margin-right: 5px;
`;

export const PresentationLine = styled.div`
  font-weight: 600;
  font-size: 18px;

`;
