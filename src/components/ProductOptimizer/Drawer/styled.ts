import styled from 'styled-components';

export const AssetsAllocationWrapper = styled.div`
  display: flex;
  padding: 20px 0;
  color: #4e5d86;
`;

export const AssetTitleBlock = styled.div<{ marginLeft?: boolean }>`
  margin-left: ${(props) => (props.marginLeft ? '170px' : 0)};
  padding: 20px 0;
  div {
    text-align: center;
  }
`;

export const AssetTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

export const AssetSubTitle = styled.div``;

export const AssetBlock = styled.div<{ proposed?: boolean }>`
  flex: 0 0 ${(props) => (props.proposed ? 460 : 240)};
  margin: 0 8px;
`;
