import React, { useState } from 'react';

import { EventWrapper } from '../PresentationStep3/styled';
import EventMenu from './EventMenu';
import EventItem, { Event as EventI } from './EventItem';

interface EventProps {
  title: string;
  setHasLifeEvent?: (hasLifeEvent: boolean) => void;
}

const Event = (props: EventProps) => {
  const { title, setHasLifeEvent = () => null } = props;
  const [events, setEvents] = useState<EventI[]>([]);
  const createEvent = (key: string) => {
    const newEvent = { key, title: title.toLowerCase(), year: 2019 };
    setEvents([...events, newEvent]);
    setHasLifeEvent(true);
  };
  const onRemove = (index: number) => {
    const newEventList = events.filter((e, i) => i !== index);
    setHasLifeEvent(!!newEventList.length);
    setEvents(newEventList);
  };

  return (
    <EventWrapper>
      <EventMenu title={title} createEvent={createEvent} />
      {events.map((event: EventI, index) => (
        <EventItem event={event} onRemove={onRemove} index={index} key={index} />
      ))}
    </EventWrapper>
  );
};

export default Event;
