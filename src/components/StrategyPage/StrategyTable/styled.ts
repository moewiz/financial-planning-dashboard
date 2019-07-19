import styled from 'styled-components';
interface HeaderTitleStrategyProps {
  small?: boolean;
}

export const HeaderTitleStrategy = styled.div.attrs({})<HeaderTitleStrategyProps>`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e8e8e8;
  padding-bottom: 10px;
  width: calc(100% - 20px);
  i {
    font-size: ${(props) => (props.small ? '16px' : '22px')};
    color: #072074;
    margin-right: 10px;
    &:focus {
      outline: none;
    }
  }
`;
export const HeaderTitleMargin = styled.span`
  flex: 0 0 55px;
  text-align: center;
  margin-right: 90px;
  font-size: 13px;
`;
export const HeaderTitleMark = styled.span`
  flex: 0 0 55px;
  text-align: center;
  font-size: 13px;
`;
export const StrategyTableContent = styled.div`
  color: #5f698d;
  max-height: 500px;
  overflow: overlay;
  padding-right: 20px;
`;
export const StrategyTableItems = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0px;
  border-bottom: 1px solid rgb(232, 232, 232);
  &:first-child {
    padding-top: 5px;
  }
`;
export const CheckboxCustomize = styled.div`
  margin-left: 1px;
  align-self: flex-start;
  padding-top: 6px;
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #fff;
    border-color: #9198af;
  }
  .ant-checkbox-checked .ant-checkbox-inner::after {
    border-color: #20317b;
    width: 6px;
    height: 11px;
    top: 45%;
    left: 5px;
  }
  .ant-checkbox-checked::after {
    border-color: #9198af;
  }
  .ant-checkbox-inner {
    border-color: #9198af;
    border-radius: 0;
    width: 20px;
    height: 20px;
  }
  .ant-checkbox-wrapper:hover .ant-checkbox-inner,
  .ant-checkbox:hover .ant-checkbox-inner,
  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: #9198af;
  }
`;
export const CheckboxCustomizeX = styled.div`
  flex: 0 0 55px;
  text-align: right;
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #fff;
    border-color: #9198af;
  }
  .ant-checkbox-checked .ant-checkbox-inner::after {
    border-color: #20317b;
    width: 6px;
    height: 11px;
    left: 5px;
    top: 45%;
  }
  .ant-checkbox-checked::after {
    border-color: #9198af;
  }
  .ant-checkbox-inner {
    border-color: #9198af;
    border-radius: 0;
    width: 20px;
    height: 20px;
  }
  .ant-checkbox-wrapper:hover .ant-checkbox-inner,
  .ant-checkbox:hover .ant-checkbox-inner,
  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: #9198af;
  }
`;
export const StrategyTableText = styled.span`
  padding: 0 15px;
  flex: 1;
`;

export const StrategyTableIcon = styled.span`
  color: #586488;
  align-self: flex-start;
  padding-top: 6px;
  font-size: 18px;
  cursor: pointer;
  flex: 0 0 55px;
  text-align: right;
  i {
    &:hover {
      opacity: 0.7;
    }
  }
`;
