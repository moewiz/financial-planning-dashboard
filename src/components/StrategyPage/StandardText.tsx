import React from 'react';
import { Typography } from 'antd';

const { Paragraph } = Typography;

interface StandardTextProp {
  data: Array<{ text: string; params?: string[] }>;
}

const StandardText = (props: StandardTextProp) => {
  return (
    <div>
      <Paragraph>
        Superanuation funds will continue to be invested in line with your <b>xx</b> risk profile
      </Paragraph>
      <Paragraph>
        Product fees of <b>x.x%</b> factored in superannuation value
      </Paragraph>
      <Paragraph>Funds transferred into pension phase at retirement</Paragraph>
    </div>
  );
};

export default StandardText;
