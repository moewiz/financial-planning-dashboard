import styled from 'styled-components';

export const EventWrapper = styled.div`
  margin-bottom: 20px;

  .table-entry-header {
    margin-bottom: 20px;
  }
`;

export const EventItemWrapper = styled.div`
  display: flex;
  align-items: baseline;
  color: #4e5b86;
  margin: 10px 0;

  .checkbox-customized {
    padding-top: 0;
  }

  .remove {
    font-size: 16px;
    margin-left: 5px;
  }
`;

export const Owner = styled.b`
  text-transform: capitalize;
`;

export const Sentence = styled.div`
  margin-left: 10px;
`;

export const SlidersBlockWrapper = styled.div`
  padding-bottom: 10px;
`;

export const SliderWrapper = styled.div`
  margin-bottom: 20px;
`;
export const SliderTitle = styled.div`
  font-weight: 600;
`;
export const ValueWrapper = styled.div<{ marks?: boolean }>`
  display: flex;
  align-items: center;
  .ant-slider {
    margin: ${(props) => (props.marks ? '14px 6px 10px' : '14px 0 10px')};
  }
`;
export const ValueStyled = styled.div`
  flex: 0 0 80px;
  margin-left: 14px;
`;
