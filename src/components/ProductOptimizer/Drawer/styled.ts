import styled from 'styled-components';

export const AssetsAllocationWrapper = styled.div`
  display: flex;
  padding: 20px 0;
  color: #4e5d86;
`;

export const FeesWrapper = styled(AssetsAllocationWrapper)`
  .asset-block-container {
    flex: 0 0 360px;
  }
  .table-entry-container {
    margin-top: 0;
    padding-top: 0;
  }
  .drawer-fund-table .ant-table-tbody {
    tr {
      &:last-child {
        .edit-cell {
          font-weight: normal;
        }
      }
    }
    .strategy-item .edit-cell {
      &.text {
        text-align: left;
      }
    }
  }
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

export const AssetBlock = styled.div.attrs({
  className: 'asset-block-container',
})<{ proposed?: boolean }>`
  flex: 0 0 ${(props) => (props.proposed ? 'auto' : '240px')};
  margin: 0 8px;
`;
