import React, { useCallback, useEffect, useState } from 'react';
import { debounce, filter, get, map } from 'lodash';

import EditCell, { EditCellType } from '../../StrategyPage/Drawer/EditCell';
import { TagList, TagStyled } from '../../../pages/client/styled';
import LinkAdvice from './LinkAdvice';

const GoalEdit = (props: any) => {
  const { dataIndex, record, type, editable, onEdit, rowIndex, showLinks } = props;
  const [value, setValue] = useState<any>(get(record, dataIndex));
  const debounceEdit = useCallback(
    debounce((val, name, index) => {
      onEdit(val, name, index, record);
    }, 300),
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
      <td>
        {record && record.id && record.id !== -1 && (
          <LinkAdvice {...props} name={dataIndex} value={value} onChange={onChange} />
        )}
      </td>
    );
  }

  const handleClose = (removedTag: any) => {
    const newLinks = filter(get(record, 'links', []), (tag) => {
      return JSON.stringify(tag) !== JSON.stringify(removedTag);
    });
    onEdit(newLinks, 'links', rowIndex);
  };
  const links = get(record, 'links', []);

  return (
    <td className={props.className}>
      {editable ? (
        <EditCell {...props} name={dataIndex} value={value} onChange={onChange} type={type} />
      ) : (
        props.children
      )}
      {showLinks && (
        <TagList>
          {map(links, (tag) => (
            <TagStyled key={JSON.stringify(tag)} closable={true} color="#e2e2e2" onClose={() => handleClose(tag)}>
              {tag.value}
            </TagStyled>
          ))}
        </TagList>
      )}
    </td>
  );
};

export default GoalEdit;
