import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { isFunction } from 'lodash';
import htmlParser from 'react-html-parser';

import { StandardText as IStandardText } from '../../reducers/client';

const fadeIn = keyframes`
  from {
    opacity: 0;
    -webkit-transform: translate3d(30px, 0, 0);
    transform: translate3d(30px, 0, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
`;

const StandardTextWrapper = styled.section`
  background-color: #f7f7f7;
  padding: 15px;
  min-height: 103px;
  margin-top: 24px;
  .fadeIn {
    animation-name: ${fadeIn};
    animation-duration: 0.5s;
    animation-fill-mode: both;
  }
`;
const Statement = styled.div`
  margin-top: 5px;
  &:first-child {
    margin-top: 0px;
  }
`;
export const Text = styled.span`
  color: #5f698d;
  font-size: 13px;
`;
export const Param = styled.span`
  color: #5f698d;
  font-size: 13px;
  font-weight: 700;
`;

interface StandardTextProp {
  data: IStandardText[];
  loading?: boolean;
  tableProcessing?: string | null;
  className?: string;
}

export const formatString = (
  text: string,
  values: Array<number | string>,
  formattingFunc?: (value: number | string, i: number) => React.ReactNode,
) => {
  const templateSplit = new RegExp(/{{(\d)}}/g);
  const isNumber = new RegExp(/^\d+$/);
  const splitText = text.split(templateSplit);
  return splitText.map((sentence, index) => {
    if (isNumber.test(sentence)) {
      const value = values[Number(sentence)];
      return isFunction(formattingFunc) ? formattingFunc(value, Number(sentence)) : value;
    }
    return htmlParser(sentence);
  });
};

function animateCSS(element: string, animationName: string, callback?: () => void) {
  const node = document.querySelector(element);
  if (node) {
    const handleAnimationEnd = () => {
      node.classList.remove('animated', animationName);
      node.removeEventListener('animationend', handleAnimationEnd);

      if (typeof callback === 'function') {
        callback();
      }
    };
    node.classList.add('animated', animationName);

    node.addEventListener('animationend', handleAnimationEnd);
  }
}

const StandardText = (props: StandardTextProp) => {
  const { data, tableProcessing, loading, className } = props;

  useEffect(() => {
    if (!loading && tableProcessing === null && className) {
      animateCSS('.' + className, 'fadeIn');
    }
  }, [tableProcessing, data, loading]);

  return (
    <StandardTextWrapper>
      <div className={className}>
        {data.map((statement: IStandardText, index) => (
          <Statement key={index}>
            {statement.params && statement.params.length > 0 ? (
              <Text>
                {formatString(statement.text, statement.params, (value, i) => (
                  <Param key={i}>{value}</Param>
                ))}
              </Text>
            ) : (
              <Text>{statement.text}</Text>
            )}
          </Statement>
        ))}
      </div>
    </StandardTextWrapper>
  );
};

export default React.memo(StandardText);
