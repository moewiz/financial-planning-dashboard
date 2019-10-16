import React, { useState } from 'react';
import { DatePicker } from 'antd';
import moment, { Moment } from 'moment';

import { EntryPickerTable } from '../../../common/EntryPicker/styled';
import { DatePickerMode } from 'antd/lib/date-picker/interface';

interface YearPickerProps {
  value: any;
  name: string;
  onChange: (value: any, name: string) => void;
}

const yearFormat = 'YYYY';

const YearPicker = (props: YearPickerProps) => {
  const { value, onChange, name } = props;
  const [open, setOpen] = useState<boolean>(false);
  const yearMoment = value ? moment(value, yearFormat) : moment();
  const onPanelChange = (selected: Moment | undefined, mode: DatePickerMode) => {
    if (selected) {
      onChange(selected.year(), name);
      setOpen(false);
    }
  };
  const handleOpenChange = (status: boolean) => {
    setOpen(status);
  };

  return (
    <EntryPickerTable>
      <DatePicker
        value={yearMoment}
        mode="year"
        placeholder="Select year"
        format={yearFormat}
        onPanelChange={onPanelChange}
        onOpenChange={handleOpenChange}
        open={open}
        allowClear={false}
      />
    </EntryPickerTable>
  );
};

export default YearPicker;
