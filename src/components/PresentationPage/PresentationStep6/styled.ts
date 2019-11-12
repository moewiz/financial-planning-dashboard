import styled, { css } from 'styled-components';

export const InvestmentProducts = styled.div`
  display: flex;
  //max-height: 330px;
  margin-bottom: 25px;
`;

export const AssetAllocationComparison = styled(InvestmentProducts)`
  display: flex;
  align-items: flex-start;
`;
export const AssetAllocationGraph = styled.div`
  flex: 50%;
`;

export const ChartTitle = styled.div`
  display: inline-block;
  width: 100%;
  font-size: 14px;
  color: #4e5b86;
  margin-bottom: 10px;
  text-align: left;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const ChartGroupTitle = styled.div`
  color: #4e5b86;
  font-size: ${(props: any) => (props.small ? '15px' : '21px')};
  font-weight: 600;
  margin-bottom: 20px;
  display: block;
  ${(props: any) =>
    props.strategy &&
    css`
      flex: 1;
    `}
`;
