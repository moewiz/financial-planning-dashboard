import React from 'react';
import styled from 'styled-components';
import { isFunction } from 'lodash';
import htmlParser from 'react-html-parser';
import { StandardText as IStandardText } from '../../reducers/client';

const StandardTextWrapper = styled.section`
  background-color: #f7f7f7;
  padding: 15px;
  min-height: 103px;
  margin-top: 24px;
`;
const Statement = styled.div`
  margin-top: 5px;
  &:first-child {
    margin-top: 0px;
  }
`;
const Text = styled.span`
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

const StandardText = (props: StandardTextProp) => {
  const { data } = props;
  return (
    <StandardTextWrapper>
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
    </StandardTextWrapper>
  );
};

export default React.memo(StandardText);
