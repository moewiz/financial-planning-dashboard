import React, { useState, useEffect } from 'react';
import { filter, get } from 'lodash';
import { Icon, Skeleton } from 'antd';

import { Record } from '../DocumentsPage';
import { CardThumbnailItem, StatusCard, TitleCard, NumberCard, DoneCard } from './styled';

const CardStatistic = (props: { record: Record; onClick: () => void; loadedPage: boolean }) => {
  const { record, onClick, loadedPage } = props;
  const [isLoading, setIsLoading] = useState(true);
  const numberIssues = filter(record.table.data, (d) => d.id !== -1 && !d.isOverwrite).length;
  const checked = get(record, 'table.data.length') === 0 || numberIssues === 0;

  useEffect(() => {
    // Hack: Make "loading skeleton" MUCH FASTER after if loads first time
    const loadingTime = loadedPage ? 1500 : 4000;
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, loadingTime);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
  const handleOnClick = () => {
    if (!isLoading) {
      onClick();
    }
  };

  return (
    <CardThumbnailItem onClick={handleOnClick} checked={checked && !isLoading}>
      <Skeleton loading={isLoading} active={true}>
        {checked ? (
          <div className="fadeIn">
            <TitleCard>{record.header}</TitleCard>
            <DoneCard>
              <Icon type="check" />
            </DoneCard>
          </div>
        ) : (
          <div className="fadeIn">
            <TitleCard>{record.header}</TitleCard>
            <NumberCard>{numberIssues}</NumberCard>
            <StatusCard>Open issue{numberIssues > 1 && 's'}</StatusCard>
          </div>
        )}
      </Skeleton>
    </CardThumbnailItem>
  );
};

export default CardStatistic;
