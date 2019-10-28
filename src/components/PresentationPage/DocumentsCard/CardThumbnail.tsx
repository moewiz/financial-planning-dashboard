import React, { useCallback, useState } from 'react';
import { map, debounce, isFunction } from 'lodash';

import { Record, Row } from '../PresentationPage';
import { CardBlock, CardBlockText } from './styled';
import EditCell from '../../StrategyPage/Drawer/EditCell';

const CardThumbnail = (props: { record?: Record; onClick?: () => void; onAdd?: (header: string) => void }) => {
  const { record, onClick, onAdd } = props;

  if (record) {
    const { header, table } = record;

    return (
      <CardBlock title={header} onClick={onClick}>
        {map(
          table.data,
          (row: Row, index: number) =>
            row.value && row.value.trim() !== '' && <CardBlockText key={index}>{row.value}</CardBlockText>,
        )}
      </CardBlock>
    );
  }
  const [title, setTitle] = useState<string | null>(null);
  const onChange = useCallback((val: any, name: string) => {
    setTitle(val);
  }, []);
  const onPressEnter = debounce(() => {
    if (isFunction(onAdd) && title && title.trim() !== '') {
      onAdd(title);
      setTitle(null);
    }
  }, 300);

  return (
    <CardBlock
      title={
        <EditCell name="title" options={{ placeholder: 'New Title', onPressEnter }} value={title} onChange={onChange} />
      }
      isplaceholder="true"
    />
  );
};

export default CardThumbnail;
