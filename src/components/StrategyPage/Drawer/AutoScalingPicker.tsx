import React, { CSSProperties, useEffect, useState } from 'react';
import moment, { Moment } from 'moment';
import { DatePicker } from 'antd';
import { get } from 'lodash';
const { MonthPicker } = DatePicker;

import { EntryPickerTable } from '../../../common/EntryPicker/styled';

interface AutoScalingPickerProps {
  value: moment.Moment;
  onChange: (date: Moment, dateString: string | number) => void;
  placeholder: string;
  format: string;
  allowClear: boolean;
}

const hideStyles: CSSProperties = {
  position: 'absolute',
  height: 0,
  overflow: 'hidden',
  whiteSpace: 'pre',
  fontSize: 13,
  fontWeight: 600,
};

const AutoScalingPicker = (props: AutoScalingPickerProps) => {
  const { value, onChange, placeholder, format } = props;
  const [inputWidth, setInputWidth] = useState<string>();
  const hideRef = React.createRef<HTMLSpanElement>();
  const monthPicker = React.createRef<any>();

  useEffect(() => {
    if (monthPicker && hideRef && hideRef.current) {
      hideRef.current.textContent = get(monthPicker, 'current.picker.input.value');
      setInputWidth(hideRef.current.offsetWidth + 5 + 'px');
    }
  }, [value]);

  return (
    <EntryPickerTable>
      <span style={hideStyles} ref={hideRef} />
      <MonthPicker
        defaultValue={value}
        onChange={onChange}
        placeholder={placeholder}
        format={format}
        allowClear={false}
        style={{ width: inputWidth }}
        ref={monthPicker}
      />
    </EntryPickerTable>
  );
};

export default AutoScalingPicker;
