import styled from 'styled-components';

export const CarouselWrapper = styled.section.attrs({
  className: 'carousel-wrapper',
})`
  .ant-carousel-vertical .slick-dots-left {
    left: -25px !important;
  }
  .ant-carousel {
    .slick-dots {
      li {
        margin: 5px 2px;
        border-radius: 4px;
        button {
          height: 28px;
          background-color: #979db5;
          opacity: 1;
        }
        &.slick-active {
          button {
            height: 56px;
            background-color: #75bcff;
          }
        }
      }
    }
  }
`;
export const CarouselItem = styled.div.attrs({
  className: 'carousel-item',
})`
  height: 500px;
`;
