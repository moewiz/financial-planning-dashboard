import React, { CSSProperties, useEffect, useState } from 'react';
import { get } from 'lodash';
import { Input } from 'antd';

import { QuotationMark } from './styled';

interface AutoScalingInput {
  className: string;
  onChangeText: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: any;
  quotationMark: boolean;
  options?: any;
  optionalProps: { [key: string]: any };
}

const hideStyles: CSSProperties = {
  position: 'absolute',
  height: 0,
  overflow: 'hidden',
  whiteSpace: 'pre',
  fontSize: 13,
  fontWeight: 600,
};

const AutoScalingInput = (props: AutoScalingInput) => {
  const { value, onChangeText, className, quotationMark, optionalProps, options } = props;
  const [inputWidth, setInputWidth] = useState<string>();
  const hideRef = React.createRef<HTMLSpanElement>();
  const inputText = React.createRef();

  useEffect(() => {
    if (inputText && hideRef && hideRef.current) {
      hideRef.current.textContent = value.length ? get(inputText, 'current.input.value') : get(options, 'placeholder');
      setInputWidth(hideRef.current.offsetWidth + 14 + 'px');
    }
  }, [value]);

  if (quotationMark) {
    return (
      <QuotationMark hideQuotationMark={value.length === 0}>
        <span style={hideStyles} ref={hideRef} />
        <Input
          value={value}
          onChange={onChangeText}
          className={className}
          {...optionalProps}
          {...options}
          style={{ width: inputWidth }}
          ref={inputText}
        />
      </QuotationMark>
    );
  }

  return (
    <>
      <span style={hideStyles} ref={hideRef} />
      <Input
        value={value}
        onChange={onChangeText}
        className={className}
        {...optionalProps}
        {...options}
        style={{ width: inputWidth }}
        ref={inputText}
      />
    </>
  );
};

export default AutoScalingInput;
