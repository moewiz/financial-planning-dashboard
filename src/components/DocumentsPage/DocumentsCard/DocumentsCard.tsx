import React from 'react';
import { isFunction } from 'lodash';

import { DocumentsCardWrapper, CardBlock, CardBlockText } from './styled';
import CardThumbnail from './CardThumbnail';
import { StepWrapper, TitleStep, TitleStepSmall } from '../styled';

interface DocumentsCardProps {
  setSlideNumber?: (slideNumber: number) => void;
  title?: string;
  extra?: string;
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

class DocumentsCard extends React.PureComponent<DocumentsCardProps> {
  public goToSlide = (slide: number) => () => {
    const { setSlideNumber } = this.props;
    if (isFunction(setSlideNumber)) {
      setSlideNumber(slide);
    }
  }

  public render(): JSX.Element {
    return (
      <>
        <TitleStep>What the advice covers</TitleStep>
        <TitleStepSmall>Record the scope of advice, as agreed between you and the client.</TitleStepSmall>
        <DocumentsCardWrapper>
          <CardThumbnail record={fixedCard1} onClick={this.goToSlide(0)} />
          <CardThumbnail record={fixedCard2} onClick={this.goToSlide(0)} />
          <CardThumbnail record={userCard} onClick={this.goToSlide(0)} />
          <CardThumbnail />
        </DocumentsCardWrapper>
      </>
    );
  }
}

export default DocumentsCard;
