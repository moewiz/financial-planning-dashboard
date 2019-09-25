import React, { PureComponent } from 'react';

import { FeesWrapper } from './styled';
import { HorizontalScrollable } from '../styled';
import Fee from './Fee';

class Fees extends PureComponent {
  public render() {
    return (
      <FeesWrapper>
        <Fee title="Product X" subTitle="Proposed" />

        <HorizontalScrollable>
          <Fee title="Product A" subTitle="RoP - alternative"/>
          <Fee title="Product B" subTitle="RoP - alternative"/>
        </HorizontalScrollable>
      </FeesWrapper>
    );
  }
}

export default Fees;
