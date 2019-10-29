import React, { useState } from 'react';

import { EventWrapper } from './styled';
import EventMenu from './EventMenu';
import EventItem, { Event as EventI } from './EventItem';

interface EventProps {
  title: string;
}

const Event = (props: EventProps) => {
  const { title } = props;
  const [events, setEvents] = useState<EventI[]>([]);
  const createEvent = (key: string) => {
    const newEvent = { key, title: title.toLowerCase(), year: 2019 };
    setEvents([...events, newEvent]);
  };
  const onRemove = (index: number) => {
    setEvents(events.filter((e, i) => i !== index));
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
