import React from 'react';
import { CardItemStyled } from './styled';

interface CardItemProps {
  src: number;
  children: React.ReactNode;
  onClick?: () => void;
}

const CardItem = (props: CardItemProps) => {
  const { src, onClick } = props;

  return (
    <CardItemStyled
      hoverable
      cover={
        <img
          alt="example"
          src={`http://sgp18.siteground.asia/~whistle4/images/${src}.png`}
          style={{ width: 100, height: 100, margin: '0 auto' }}
        />
      }
      onClick={onClick}
    >
      {props.children}
    </CardItemStyled>
  );
};

export default CardItem;
