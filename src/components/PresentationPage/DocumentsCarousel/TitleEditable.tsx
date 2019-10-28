import React, { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';

import { TitleStep, TitleStepSmall } from '../styled';
import EditCell from '../../StrategyPage/Drawer/EditCell';

interface TitleEditableProps {
  defaultValue: string | undefined;
  name: string;
  onChange: (value: any, name: string) => void;

  editable?: boolean;
  subTitle?: boolean;
}

const TitleEditable = (props: TitleEditableProps) => {
  const { editable = false, subTitle = false } = props;
  const Wrapper = subTitle ? TitleStepSmall : TitleStep;
  const [value, setValue] = useState<string>(props.defaultValue || '');
  useEffect(() => {
    setValue(props.defaultValue || '');
  }, [props.defaultValue]);
  const debounceEdit = useCallback(
    debounce((val, name) => {
      props.onChange(val, name);
    }, 500),
    [],
  );
  const onChange = (val: string, name: string) => {
    setValue(val);
    debounceEdit(val, name);
  };

  return (
    <Wrapper editable={editable}>
      <EditCell name={props.name} value={value} onChange={onChange} options={{ disabled: !editable }} />
    </Wrapper>
  );
};

export default TitleEditable;
