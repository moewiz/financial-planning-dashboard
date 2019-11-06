import styled from 'styled-components';

export const AssetsAllocationWrapper = styled.div`
  display: flex;
  padding: 20px 0;
  color: #4e5d86;
`;

export const FeesWrapper = styled(AssetsAllocationWrapper)`
  .asset-block-container {
    flex: 0 0 380px;
    .asset-block-title {
      width: 380px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
  .table-entry-container {
    margin-top: 0;
    margin-bottom: 20px;
    padding-top: 0;
  }
  .drawer-fund-table {
    .ant-table-body {
      height: 265px;
    }
    .ant-table-tbody {
      tr {
        &:last-child {
          .investments-bold{
            font-weight: 600;
          }
          .edit-cell {
          }
          td {
            input{
              font-weight: 600!important;
            }
          }
        }
      }
      .strategy-item .edit-cell {
        &.text {
          text-align: left;
        }
      }
    }
    .ant-table-footer {
      display: flex;
      background-color: #fff;
      color: #4e5d86;
      font-weight: 600;
      .title {
        flex: 1;
      }
      .value {
        flex: 0 0 188px;
        text-align: right;
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

export const AssetTitle = styled.div.attrs({
  className: 'asset-block-title',
})`
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
