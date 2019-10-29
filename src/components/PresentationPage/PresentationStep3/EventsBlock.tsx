import React from 'react';

import Event from './Event';

const EventsBlock = () => {
  return (
    <>
      <div style={{ width: 295, padding: '15px', border: '1px solid #dedede' }}>
        <Event title={'Market crash'} />
        <Event title={'Life event'} />
        <Event title={'TPD event'} />
        <Event title={'Trauma'} />
      </div>
    </>
  );
};

export default EventsBlock;
