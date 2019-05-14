import styled from 'styled-components';

interface PrefixProps {
  dollar?: boolean;
}
export const PrefixGroup = styled.section<PrefixProps>`
  display: flex;
  align-items: center;
  width: 60px;
  .prefix-choose-group{
    .ant-select-enabled{
      /* display: none; */
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
    width: 20px;
    font-weight: 600;
    text-align: center;
  }
  &:hover{
    width: 100px;
    transition: width 300ms ease;
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
  font-weight: 600;
`;
export const TypePercentPrefix = styled.span.attrs({
  className: 'type-percent-prefix',
  })`
  font-weight: 600;
`;
export const PrefixViewGroup = styled.div.attrs({
  className: 'prefix-view-group',
  })`
`;
export const PrefixChooseGroup = styled.div.attrs({
  className: 'prefix-choose-group',
  })`
`;