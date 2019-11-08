import React from 'react';
import { map } from 'lodash';

import { FeesWrapper } from './styled';
import { HorizontalScrollable } from '../styled';
import Fee, { FeeProps } from './Fee';
import feesData from '../../../demo_jsons/step_3m.json';

const Fees = (props: { data?: FeeProps['product']; links?: Array<FeeProps['product']>; readOnly?: boolean }) => {
  const { data, links, readOnly } = props;
  const haveLinkedProducts = (links ? links.length > 0 : feesData.links.length > 0);

  return (
    <FeesWrapper haveLinkedProducts={haveLinkedProducts}>
      <Fee product={data || feesData.proposed} readOnly={readOnly} />

      <HorizontalScrollable>
        {map(links || feesData.links, (product: FeeProps['product'], index: number) => (
          <Fee product={product} key={index} readOnly={readOnly} />
        ))}
      </HorizontalScrollable>
    </FeesWrapper>
  );
};

export default Fees;
