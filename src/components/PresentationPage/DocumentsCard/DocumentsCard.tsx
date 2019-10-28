import React from 'react';
import { isFunction } from 'lodash';
import { FieldArray, FieldArrayRenderProps } from 'formik';

import { DocumentsCardWrapper } from './styled';
import CardThumbnail from './CardThumbnail';
import { TitleStep, TitleStepSmall } from '../styled';
import { Record } from '../PresentationPage';

interface DocumentsCardProps {
  cards: Record[];
  stepName: string;
  title: string;
  subtitle?: string;
  setSlideNumber: (slideNumber: number) => void;
}

const DocumentsCard = (props: DocumentsCardProps) => {
  const { stepName, cards, title, subtitle, setSlideNumber } = props;
  const goToSlide = (slide: number) => () => {
    if (isFunction(setSlideNumber)) {
      setSlideNumber(slide);
    }
  };

  return (
    <>
      <TitleStep>{title}</TitleStep>
      <TitleStepSmall>{subtitle}</TitleStepSmall>
      <DocumentsCardWrapper>
        <FieldArray
          name={`${stepName}.records`}
          render={(fieldArrayProps: FieldArrayRenderProps) => {
            const onAddNewCard = (header: string) => {
              const description = cards[0].table.columns[1];

              fieldArrayProps.push({
                type: 'user',
                header,
                title: header,
                subtitle: '',
                table: { columns: [header, description], data: [] },
              });
            };

            return (
              <>
                {cards.map((card: Record, index: number) => (
                  <CardThumbnail record={card} onClick={goToSlide(index)} key={index} />
                ))}
                <CardThumbnail onAdd={onAddNewCard} />
              </>
            );
          }}
        />
      </DocumentsCardWrapper>
    </>
  );
};

export default DocumentsCard;
