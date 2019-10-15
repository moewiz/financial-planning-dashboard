import styled from 'styled-components';

export const AssetsAllocationWrapper = styled.div`
  display: flex;
  padding: 20px 0;
  color: #4e5d86;
`;

export const FeesWrapper = styled(AssetsAllocationWrapper)`
  .asset-block-container {
    flex: 0 0 380px;
  }
  .table-entry-container {
    margin-top: 0;
    margin-bottom: 20px;
    padding-top: 0;
  }
  .drawer-fund-table .ant-table-tbody {
    tr {
      &:last-child {
        .edit-cell {
          // font-weight: normal;
        }
      }
    }
    .strategy-item .edit-cell {
      &.text {
        text-align: left;
      }
    }
  }
  .drawer-fund-table.no-bold .ant-table-tbody {
    tr {
      &:last-child {
        font-weight: normal;
        .edit-cell {
          font-weight: normal;
        }
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
  margin-bottom: 8px;
`;

export const AssetSubTitle = styled.div``;

export const AssetBlock = styled.div.attrs({
  className: 'asset-block-container',
})<{ proposed?: boolean }>`
  flex: 0 0 auto;
  margin: 0 8px;
`;
