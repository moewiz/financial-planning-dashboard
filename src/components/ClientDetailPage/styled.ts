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
  .ant-calendar-picker {
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
  }
  .ant-input-number-handler-wrap {
    opacity: 0 !important;
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
    }
    /* Input Number */
    &.ant-input-number {
      border-color: transparent;
      background-color: transparent;
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
`;

export const ValueEditCell = styled.span`
  width: 100%;
`;
