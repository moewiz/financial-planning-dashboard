import React from 'react';
import styled from 'styled-components';

const StandardTextWrapper = styled.section`
  background-color: #f7f7f7;
  padding: 15px;
  min-height: 103px;
  margin-top: 24px;
`;
const Statement = styled.div`
  margin-top: 5px;
  &:first-child {
    margin-top: 0px;
  }
`;
const Text = styled.span`
  color: #5f698d;
  font-size: 13px;
`;
const Param = styled.span`
  color: #5f698d;
  font-size: 13px;
  font-weight: 700;
`;

interface StandardTextProp {
  data: Array<{ text: string; params?: string[] }>;
}

const StandardText = (props: StandardTextProp) => {
  return (
    <StandardTextWrapper>
      <Statement>
        <Text>Superannuation funds will continue to be invested in line with your</Text> <Param>xx</Param>{' '}
        <Text>risk profile</Text>
      </Statement>
      <Statement>
        <Text>Product fees of</Text> <Param>x.x%</Param> <Text>factored in superannuation value</Text>
      </Statement>
      <Statement>
        <Text>Funds transferred into pension phase at retirement</Text>
      </Statement>
    </StandardTextWrapper>
  );
};

export default StandardText;
