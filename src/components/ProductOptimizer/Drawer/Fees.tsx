import React, { PureComponent } from 'react';
import { map } from 'lodash';

import { FeesWrapper } from './styled';
import { HorizontalScrollable } from '../styled';
import Fee, { FeeProps } from './Fee';
import feesData from '../../../demo_jsons/step_3m.json';

const Fees = (props: { data?: FeeProps['product']; links?: Array<FeeProps['product']> }) => {
  const { data, links } = props;

  return (
    <FeesWrapper>
      <Fee product={data || feesData.proposed} />

      <HorizontalScrollable>
        {map(links || feesData.links, (product: FeeProps['product'], index: number) => (
          <Fee product={product} key={index} />
        ))}
      </HorizontalScrollable>
    </FeesWrapper>
  );
};

export default Fees;
