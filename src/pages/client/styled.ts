import styled from 'styled-components';

interface HeaderTitleTableProps {
  small?: boolean;
}

interface TextTitleProps {
  small?: boolean;
}

export const TableEntryContainer = styled.section.attrs({
  className: 'table-entry-container',
})`
  padding: 20px;
  .expenditure-table,
  .income-table{
    .ant-table-thead{
      tr{
        th:first-child{
          padding-left: 20px
        }
      }
    }
    .ant-table-tbody{
      tr{
        td:first-child{
          padding-left: 20px
        }
      }
    }
  }
  /* table layout here */
  .table-general{
    table{
      table-layout: fixed;
    }
    .ant-row.ant-form-item{
      margin: 0px;
      width: 100%;
      .ant-form-item-children{
        .picker-date{
          margin: 0px;
          width: 100%;
          .ant-calendar-picker{
            width: 100%;
          }
        }
        & > div{
          margin: 0px;
        }
      }
    }
    .ant-select{
      margin-left: -10px;
    }
  .ant-table-expand-icon-col{
    width: 40px;
  }
  .ant-form-item-control{
    line-height: 35px;
  }
  .ant-table-expand-icon-th,
  .ant-table-row-expand-icon-cell{
    width: 40px;
    padding: 16px 0px;
    min-width: 40px;
  }
  .ant-table-tbody > tr > td{
    padding: 10px;
  }
  .ant-table-thead > tr > th{
    background-color: #eaedef;
    color: #505c84;
    padding: 16px 10px;
    font-weight: 600;
  }
`;
export const ActionTableGeneral = styled.section<{ visible?: boolean }>`
  display: ${(props) => (props.visible ? 'flex' : 'none !important')};
  margin: 20px 0;
  flex: 0 0 100%;
  justify-content: flex-end;
  .ant-btn-default {
    background-color: #212121;
    color: #fff;
  }
  .ant-btn {
    font-weight: 600;
    margin-right: 15px;
    width: 150px;
    height: 44px;
    border-radius: 24px;
  }
`;
export const HeaderTitleTable = styled.div.attrs({
  className: 'table-entry-header',
})<HeaderTitleTableProps>`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  i {
    font-size: ${(props) => (props.small ? '16px' : '24px')};
    color: #072074;
    margin-right: 10px;
  }
`;

export const TextTitle = styled.span<TextTitleProps>`
  color: #072074;
  font-size: ${(props) => (props.small ? '14px' : '21px')};
`;

export const DivideLine = styled.span`
  background-color: #e8e8e8;
  height: 1px;
  flex: 1;
  margin-left: 10px;
`;

export const InnerTableNoDelContainer = styled.section`
  color: #072074;
  font-size: 21px;
  margin-bottom: 20px;
  .ant-table-small {
    border: none;
    & > .ant-table-content > .ant-table-body {
      margin: 0;
    }
    .ant-table-thead > tr > th {
      background-color: #eaedef;
      color: #505c84;
      font-weight: normal;
      font-size: 12px;
    }
    & > .ant-table-content > .ant-table-body > table > .ant-table-thead > tr > th {
      border-bottom: none;
      padding: 0;
      padding: 2px 0;
    }
    & > .ant-table-content > .ant-table-body > table > .ant-table-tbody > tr {
      position: relative;
      &:hover:not(.ant-table-expanded-row) > td {
        background: initial;
      }
    }
    & > .ant-table-content > .ant-table-body > table > .ant-table-tbody > tr > td {
      border-bottom: none;
      padding: 2px 0;
      width: 20px;
      &.operation {
      }
    }
  }
`;
export const InnerTableContainer = styled.section`
  color: #072074;
  margin-top: 10px;
  font-size: 21px;
  .contribution-withdrawals-table{
    max-width: 700px;
    width: 100%
  }
  .ant-table-wrapper {
    margin-left: -24px;
  }
  .ant-table-small {
    border: none;
    & > .ant-table-content > .ant-table-body {
      margin: 0;
    }
    .ant-table-thead > tr > th {
      background-color: #eaedef;
      color: #505c84;
      font-weight: normal;
      font-size: 12px;
    }
    & > .ant-table-content > .ant-table-body > table > .ant-table-thead > tr > th {
      border-bottom: none;
      padding: 0;
      padding: 2px 0;
    }
    & > .ant-table-content > .ant-table-body > table > .ant-table-tbody > tr {
      position: relative;
      &:hover:not(.ant-table-expanded-row) > td {
        background: initial;
      }
    }
    & > .ant-table-content > .ant-table-body > table > .ant-table-tbody > tr > td {
      border-bottom: none;
      padding: 2px 0;
      width: 20px;
      &.operation {
      }
    }
  }
`;
