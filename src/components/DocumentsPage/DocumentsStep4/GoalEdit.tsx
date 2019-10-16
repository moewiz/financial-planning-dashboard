import React, { useCallback, useEffect, useState } from 'react';
import { get, map, debounce, filter } from 'lodash';

import EditCell, { EditCellType } from '../../StrategyPage/Drawer/EditCell';
import { TagList, TagStyled } from '../../../pages/client/styled';
import LinkAdvice from './LinkAdvice';

const GoalEdit = (props: any) => {
  const { dataIndex, record, type, editable, onEdit, rowIndex, showLinks } = props;
  const [value, setValue] = useState<any>(get(record, dataIndex));
  const debounceEdit = useCallback(
    debounce((val, name, index) => {
      onEdit(val, name, index);
    }, 500),
    [],
  );
  const onChange = (val: any, name: string) => {
    setValue(val);
    debounceEdit(val, name, rowIndex);
  };
  useEffect(() => {
    setValue(get(record, dataIndex));
  }, [get(record, dataIndex)]);

  if (type === EditCellType.linkCurrentProduct) {
    return (
      <td>{record && record.id && <LinkAdvice {...props} name={dataIndex} value={value} onChange={onChange} />}</td>
    );
  }

  return (
    <td className={props.className}>
      {editable ? (
        <EditCell {...props} name={dataIndex} value={value} onChange={onChange} type={type} />
      ) : (
        props.children
      )}
      {showLinks && (
        <TagList>
          {map(get(record, 'links', []), (product) => (
            <TagStyled
              key={product.id}
              closable={true}
              color="#e2e2e2"
              onClose={() =>
                onEdit(filter(get(record, 'links', []), (link) => link.id !== product.id), 'links', rowIndex)
              }
            >
              {product.value}
            </TagStyled>
          ))}
        </TagList>
      )}
    </td>
  );
};

export default GoalEdit;
