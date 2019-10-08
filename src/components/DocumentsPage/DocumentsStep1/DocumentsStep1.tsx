import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'formik';
import { debounce } from 'lodash';

import { StepWrapper, TitleStep, TitleStepSmall } from '../styled';
import { DocumentsStep1Form } from './styled';
import { DocumentData, FormikPartProps } from '../DocumentsPage';
import EditCell, { EditCellType } from '../../StrategyPage/Drawer/EditCell';

const DocumentsStep1 = (props: FormikPartProps) => {
  const { formik } = props;
  const [value, setValue] = useState(formik.values.step1);
  useEffect(() => {
    setValue(formik.values.step1);
  }, [formik.values.step1]);
  const placeholder =
    'What are your reasons for seeking financial advice? ' +
    'For example, are you going through a life event, such as starting a family or retrenchment, or ' +
    'are you planning for a future event such  as retirement? You may wish to include any personal goals you have. ' +
    'For example, do you want to spend less time worrying about money and more time with your family, or would you ' +
    'like to be in a financial position to  reduce your working hours?';
  const debounceEdit = useCallback(
    debounce((val, name) => {
      formik.setFieldValue(name, val);
    }, 500),
    [],
  );
  const onChange = (val: any, name: string) => {
    setValue(val);
    debounceEdit(val, name);
  };

  return (
    <StepWrapper>
      <TitleStep>Why did Ian & Deborah seek advice?</TitleStep>
      <TitleStepSmall>Your purpose for seeking advice</TitleStepSmall>
      <DocumentsStep1Form>
        <EditCell
          name={'step1'}
          value={value}
          onChange={onChange}
          type={EditCellType.textarea}
          placeholder={placeholder}
        />
      </DocumentsStep1Form>
    </StepWrapper>
  );
};

export default connect<{}, DocumentData>(DocumentsStep1);
