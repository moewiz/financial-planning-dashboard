import styled from 'styled-components';

interface PrefixProps {
  dollar?: boolean;
}
export const PrefixGroup = styled.section<PrefixProps>`
  display: flex;
  align-items: center;
  flex-basis: 45px;
  .prefix-choose-group{
    .ant-select-enabled{
      display: none;
      &.ant-select-focused{
        display: inline-block;
      }
    }
  }
  .type-dollar-prefix{
    display: ${(props) => props.dollar ? 'inline' : 'none'};
  }
  .type-percent-prefix{
    display: ${(props) => props.dollar ? 'none' : 'inline'};
  }
  input{
    border: none;
    padding: 0px;
    margin: 0px;
    display: inline-block;
    background: transparent;
    width: 45px;
    font-weight: 600;
    text-align: ${(props) => props.dollar ? 'left!important' : 'right!important'};;
  }
  &:hover{
    flex-basis: 145px;
    transition: width 300ms ease;
    input{
      border: 1px solid #515c83 !important;
      text-align: center!important;
    }
    .prefix-choose-group{
      .ant-select-enabled{
        display: inline-block;
      }

    }
  }
`;
export const TypeDollarPrefix = styled.span.attrs({
  className: 'type-dollar-prefix',
  })`
  color: #6c7596;
  font-weight: 700;
`;
export const TypePercentPrefix = styled.span.attrs({
  className: 'type-percent-prefix',
  })`
  color: #6c7596;
  font-weight: 700;
`;
export const PrefixViewGroup = styled.div.attrs({
  className: 'prefix-view-group',
  })`
    display: flex;
    align-items: center;
`;
export const PrefixChooseGroup = styled.div.attrs({
  className: 'prefix-choose-group',
  })`
   margin: 0 5px !important;
  .ant-select{
    margin-left: 0px !important;
  }
`;
export const PrefixSingleGroup = styled.section.attrs({
  className: 'prefix-single-group',
  })`
    width: 50px;
    position: relative;
    display: flex;
    align-items: center;
    margin: 0 3px;
    .type-percent-prefix{
      position: absolute;
      font-weight: 700;
      right: 5px;
    }
    input{
      margin: 0px;
      font-weight: 700;
      padding: 0px 15px 0px 0px;
      min-width: 35px;
      max-width: 51px;
      text-align: center;
    }
`;
export const ExpandedAssetsGroups = styled.div.attrs({
  className: 'expanded-assets-groups',
  })`
  flex-wrap: wrap;
  display: flex;
`;
export const ExpandedAssetsInlineGroups = styled.div.attrs({
  className: 'expanded-assets-inline-groups',
  })`
  flex: 0 0 100%;
  display: flex;
  align-items: center;
`;
export const ExpandedAssetsText = styled.span.attrs({
  className: 'expanded-assets-text',
  })`
  color: #5f698d;
`;
export const ExpandedAssetsBlock = styled.section.attrs({
  className: 'expanded-assets-block',
  })`
  display: flex;
  flex-direction: column;
`;
export const ExpandedSelectGroup = styled.div.attrs({
  className: 'expanded-select-group',
  })`
  width: auto;
  display: flex;
  font-weight: 700;
  flex-direction: column;
  .ant-select-arrow{
    right: 6px;
  }
  .ant-select{
    margin-left: 0px !important;
  }
  .ant-select-selection__rendered{
    margin: 0 5px !important;
  }
  .ant-select-selection-selected-value{
    padding-right: 0px!important;
  }
  &:hover{
    .ant-select-selection-selected-value{
      padding-right: 15px!important;
    }
  }
`;