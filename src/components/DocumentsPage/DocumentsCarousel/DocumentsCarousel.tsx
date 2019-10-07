import React from 'react';
import { Carousel } from 'antd';

import { CarouselWrapper } from './styled';
import CardDetails from './CardDetails';

export interface DocumentsCarouselProps {
  slideNumber?: number;
  effect?: string;
  dotPosition?: string;
}

const fixedCard1 = {
  type: 'fixed',
  header: 'Super',
  title: 'What the advice cover (Superannuation)',
  subtitle: 'Record the Superannuation-related scope of advice, as agreed between you and the client.',
  table: {
    columns: ['Superannuation', 'Advice Limitations'],
    data: [
      {
        id: 1,
        value: 'Contributions',
        description: 'No Limitations',
      },
      {
        id: 2,
        value: 'Platform Review',
        description: 'No Limitations',
      },
      {
        id: 3,
        value: 'Portfolio Review',
        description: 'No Limitations',
      },
      {
        id: 4,
        value: 'SMSF',
        description: 'No Limitations',
      },
    ],
  },
};

const fixedCard2 = {
  type: 'fixed',
  header: 'Retirement Income',
  title: 'What the advice cover (Retirement Income)',
  subtitle: 'Record the Retirement Income-related scope of advice, as agreed between you and the client.',
  table: {
    columns: ['Retirement Income', 'Advice Limitations'],
    data: [
      {
        id: 1,
        value: '',
        description: 'No Limitations',
      },
    ],
  },
};

const userCard = {
  type: 'user',
  header: 'Test',
  title: 'What the advice cover (Test)',
  subtitle: 'Record the Test-related scope of advice, as agreed between you and the client.',
  table: {
    columns: ['Test', 'Advice Limitations'],
    data: [
      {
        id: 1,
        value: 'Lorem',
        description: 'Lorem ipsum dolor sit amet',
      },
      {
        id: 2,
        value: 'Some text',
        description: 'Some description',
      },
    ],
  },
};

class DocumentsCarousel extends React.PureComponent<DocumentsCarouselProps> {
  public render(): JSX.Element {
    const { slideNumber } = this.props;

    return (
      <>
        <CarouselWrapper>
          <Carousel effect="fade" dotPosition={'left'} initialSlide={slideNumber} lazyLoad="progressive">
            {/* Loop records */}
            <CardDetails record={fixedCard1} />
            <CardDetails record={fixedCard2} />
            <CardDetails record={userCard} />

            {/* Step 5 & Step 7  */}
            {/* There's no slider */}
          </Carousel>
        </CarouselWrapper>
      </>
    );
  }
}

export default DocumentsCarousel;
