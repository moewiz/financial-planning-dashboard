import styled from 'styled-components';

export const NewProposedProductStyled = styled.div`
  .ant-select-open {
    // padding-bottom: 10px;
  }
  .ant-select-open .ant-select-selection {
    // border-color: #d9d9d9;
    // box-shadow: none;
  }
  .ant-select {
    margin-left: 0px;
    .ant-select{
      &-selection{
        &__choice{
          font-size: 10px;
          color: #112054;
          margin-top: 3px;
          background-color: rgb(226, 226, 226);
          border: 1px solid transparent;
          border-radius: 4px;
          &__remove{
            .anticon-close{
              font-size: 10px !important;
              background-color: #112054;
              border-radius: 50%;
              padding: 2px;
              color: #fff;
            }
          }
        }
        &__rendered{
        }
      }
    }
  }
`;

export const ProposePopupWrapper = styled.div`
  position: absolute;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 2;
`;

export const ProposeItem = styled.div`
  margin: 4px 0;
  cursor: pointer;
`;

export const DrawerProductWrapper = styled.div`
  .ant-tabs-bar {
    margin: 0;
  }
`;

export const FundTabContent = styled.div`
  display: flex;
`;

export const FundBlock = styled.div`
  flex: 0 0 350px;
  margin: 0 8px;
  transition: opacity ease 400ms;
  &.all-proposed{
    opacity: 1;
  }
  &.proposed-active{
    opacity: 1;
  }
  &.proposed-inavtive{
    opacity: .5;
  }
`;

export const HorizontalScrollable = styled.div`
  flex: 1;
  flex-wrap: nowrap;
  flex-direction: row;
  display: flex;
  overflow: overlay;
  padding-bottom: 20px;
`;
