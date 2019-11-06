import styled from 'styled-components';

export const EditableCellWrap = styled.section.attrs({
  className: 'editable-cell-value-wrap',
})`
  cursor: pointer;
  min-height: 35px;
  display: flex;
  align-items: center;
  width: 100%;
  height: 35px;
  .picker-year{
    .ant-calendar-picker {
      .ant-calendar-picker-input {
        font-weight: 700;
      }
    }
    &:hover {
      .ant-calendar-picker-input {
        &:not(.ant-input-disabled) {
          border-color: #d9d9d9;
          box-shadow: none;
        }
      }
    }
    &:focus {
      .ant-calendar-picker-input {
        &:not(.ant-input-disabled) {
          border-color: #515c83;
        }
      }
    }
  }
  .ant-select-selection-selected-value {
    color: #5f698d;
    /* Using margin because when hover border 1px and no hover border transparent hidden */
    margin-top: -2px;
    padding-right: 8px;
  }
  .ant-input-number-handler-wrap {
    opacity: 0 !important;
    display: none;
  }
  div {
    /* Select Type */
    &.ant-select-focused {
      .ant-select-selection {
        box-shadow: none;
        border: 1px solid #515c83;
      }
    }
    &.readOnly {
      line-height: 20px;
      padding-right: 0px;
      .ant-select-selection {
        border-color: transparent;
        background-color: transparent;
      }
      .ant-select-arrow {
        color: transparent;
      }
      &:hover {
        .ant-select-selection {
          border-color: #d9d9d9;
        }
        .ant-select-arrow {
          color: #d9d9d9;
        }
      }
      &.disabled{
       .ant-select-arrow {
          color: transparent;
        }
      }
      &.ant-select-disabled{
        cursor: pointer;
        &:hover{
          .ant-select-selection {
            border-color: #d9d9d9;
            cursor: pointer;
          }
          .ant-select-arrow {
            color: transparent;
          }
        }
      }
    }
    /* Input Number */
    &.ant-input-number {
      border-color: transparent;
      background-color: transparent;
      width: 100%;
      &.ant-input-number-focused {
        box-shadow: none;
        border-right: none;
      }
      &.readOnly {
        border-color: transparent;
        background-color: transparent;
      }
    }
  }
  /* Input general */
  input {
    border-color: #d9d9d9;
    color: #5f698d;
    margin-left: -10px;
    cursor: pointer;
    box-shadow: none;
    background: transparent;
    min-height: 35px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 10px;
    transition: all 300ms ease;
    height: 35px;
    &.ant-input-number-input {
      background-color: transparent;
      border: 1px solid transparent;
      &:hover {
        border-color: #d9d9d9;
      }
    }
    &.readOnly {
      background-color: transparent;
      border: 1px solid transparent;
      &:hover {
        border-color: #d9d9d9;
      }
    }
    &.ant-input[disabled] {
      color: #5f698d;
      border: none;
      background-color: transparent;
    }
    &:focus {
      border: 1px solid #515c83;
    }
  }
  .smallInput {
    &.ant-input-number {
      width: 100%;
    }
    input.ant-input-number-input {
      border: 1px solid #d9d9d9;
    }
    .ant-select-selection {
      background: transparent;
    }
  }
`;

export const ValueEditCell = styled.span`
  width: 100%;
`;
