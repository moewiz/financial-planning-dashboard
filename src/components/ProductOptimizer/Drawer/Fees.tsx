import React, { PureComponent } from 'react';
import { map } from 'lodash';

import { FeesWrapper } from './styled';
import { HorizontalScrollable } from '../styled';
import Fee from './Fee';
import feesData from '../../../demo_jsons/step_3d.json';

class Fees extends PureComponent {
  public render() {
    return (
      <FeesWrapper>
        <Fee product={feesData.proposed} />

        <HorizontalScrollable>
          {map(feesData.links, (product, index: number) => (
            <Fee product={product} key={index} />
          ))}
        </HorizontalScrollable>
      </FeesWrapper>
    );
  }
}

export default Fees;
