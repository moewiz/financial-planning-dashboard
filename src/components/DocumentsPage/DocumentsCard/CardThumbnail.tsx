import React, { useCallback, useState } from 'react';
import { map, debounce } from 'lodash';

import { Record, Row } from '../DocumentsPage';
import { CardBlock, CardBlockText } from './styled';
import EditCell from '../../StrategyPage/Drawer/EditCell';

const CardThumbnail = (props: { record?: Record }) => {
  const { record } = props;

  if (record) {
    const { header, table } = record;

    return (
      <CardBlock title={header}>
        {map(
          table.data,
          (row: Row, index: number) => row && row.value && <CardBlockText key={index}>{row.value}</CardBlockText>,
        )}
      </CardBlock>
    );
  }
  const [title, setTitle] = useState<string | null>(null);
  const onChange = useCallback((val: any, name: string) => {
    setTitle(val);
  }, []);
  const onPressEnter = debounce(() => {
    console.log('create a new user card with title', title);
  }, 300);

  return (
    <CardBlock
      title={
        <EditCell
          name="title"
          options={{ placeholder: 'New Title', onPressEnter }}
          value={title}
          onChange={onChange}
        />
      }
      isplaceholder="true"
    />
  );
};

export default CardThumbnail;
