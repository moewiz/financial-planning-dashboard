import React from 'react';

import Event from './Event';

const EventsBlock = (props: { setHasLifeEvent?: (hasLifeEvent: boolean) => void }) => {
  const { setHasLifeEvent = () => null } = props;
  return (
    <>
      <Event title="Market crash" />
      <Event title="Life event" setHasLifeEvent={setHasLifeEvent} />
      <Event title="TPD event" />
      <Event title="Trauma" />
    </>
  );
};

export default EventsBlock;
