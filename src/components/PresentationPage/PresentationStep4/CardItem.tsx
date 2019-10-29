import React from 'react';
import { CardItemStyled } from './styled';

interface CardItemProps {
  src: number;
  children: React.ReactNode;
}

const CardItem = (props: CardItemProps) => {
  const { src } = props;

  return (
    <CardItemStyled
      hoverable
      cover={
        <img alt="example" src={`http://sgp18.siteground.asia/~whistle4/images/${src}.svg`} style={{ height: 100 }} />
      }
    >
      {props.children}
    </CardItemStyled>
  );
};

export default CardItem;
