import React, { useState } from 'react';
import { Icon, Popconfirm } from 'antd';

import { EventItemWrapper, Owner, Sentence } from './styled';
import CheckboxInput from '../../StrategyPage/Drawer/CheckboxInput';

export interface Event {
  key: string;
  title: string;
  year: number;
}

interface EventItemProps {
  event: Event;
  index: number;
  onRemove: (index: number) => void;
}

const EventItem = (props: EventItemProps) => {
  const { event, index, onRemove } = props;
  const [checkboxValue, setCheckboxValue] = useState<boolean>(true);

  return (
    <EventItemWrapper>
      <CheckboxInput value={checkboxValue} onChange={setCheckboxValue} />
      <Sentence>
        <Owner>{event.key}</Owner> {event.title} added for the year <b>{event.year}</b>
      </Sentence>
      <Popconfirm title="Really delete?" onConfirm={() => onRemove(index)}>
        <Icon className="remove" type="close-square" theme="twoTone" />
      </Popconfirm>
    </EventItemWrapper>
  );
};

export default EventItem;
