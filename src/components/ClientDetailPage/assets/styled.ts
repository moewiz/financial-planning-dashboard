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
    width: 40px;
    font-weight: 600;
    text-align: center!important;
  }
  &:hover{
    flex-basis: 145px;
    transition: width 300ms ease;
    input{
      border: 1px solid #515c83 !important;
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
  font-weight: 600;
`;
export const TypePercentPrefix = styled.span.attrs({
  className: 'type-percent-prefix',
  })`
  color: #6c7596;
  font-weight: 600;
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
`;
export const PrefixSingleGroup = styled.section.attrs({
  className: 'prefix-single-group',
  })`
    width: 45px;
    position: relative;
    display: flex;
    align-items: center;
    margin: 0 3px;
    .type-percent-prefix{
      position: absolute;
      font-weight: 600;
      right: 3px;
    }
    input{
      margin: 0px;
      font-weight: 600;
      padding: 0 3px;
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
