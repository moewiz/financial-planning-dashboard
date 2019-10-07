import React, { useMemo, useState } from 'react';
import { get } from 'lodash';
import { Steps, message } from 'antd';

import DocumentsStep1 from './DocumentsStep1/DocumentsStep1';
import DocumentsStep2 from './DocumentsStep2/DocumentsStep2';
import DocumentsStep3 from './DocumentsStep3/DocumentsStep3';
import DocumentsStep4 from './DocumentsStep4/DocumentsStep4';
import DocumentsStep5 from './DocumentsStep5/DocumentsStep5';
import DocumentsStep6 from './DocumentsStep6/DocumentsStep6';
import DocumentsStep7 from './DocumentsStep7/DocumentsStep7';
import DocumentsStep8 from './DocumentsStep8/DocumentsStep8';

import { DocumentsWrapper, StepActionDocument, BtnStepDocument } from './styled';
import { Formik, FormikActions, FormikContext, FormikProps } from 'formik';

const { Step } = Steps;
const steps = [
  {
    title: 'Step 1',
    content: DocumentsStep1,
    description: 'Reason for seeking advice',
  },
  {
    title: 'Step 2',
    content: DocumentsStep2,
    description: 'What the advice cover',
  },
  {
    title: 'Step 3',
    content: DocumentsStep3,
    description: 'What the advice does not cover',
  },
  {
    title: 'Step 4',
    content: DocumentsStep4,
    description: 'Client is goals',
  },
  {
    title: 'Step 5',
    content: DocumentsStep5,
    description: 'Limitations of client is information',
  },
  {
    title: 'Step 6',
    content: DocumentsStep6,
    description: 'Summary of recommendation',
  },
  {
    title: 'Step 7',
    content: DocumentsStep7,
    description: 'Cost of advice',
  },
  {
    title: 'Step 8',
    content: DocumentsStep8,
    description: 'Cost of advice',
  },
];

export interface FormikPartProps {
  formik: FormikContext<DocumentData>;
}

export interface Row {
  id: number;
  [key: string]: any;
}

interface Column {
  dataIndex: string;
  title: string;
  type?: number;
}

interface Table {
  columns: Array<string | Column>;
  data: Row[];
}

export interface Record {
  type?: string;
  header?: string;
  title: string;
  subtitle?: string;
  table: Table;
}

interface StepProps {
  title: string;
  subtitle?: string;
  record?: Record[];
  table?: Table;
}

export interface DocumentData {
  step1: string;
  step2: StepProps;
  step3: StepProps;
  step4: StepProps;
  step5: StepProps;
  step6: StepProps;
  step7: StepProps;
  step8: StepProps;
}

export interface DocumentsPageProps {
  clientId: number;
  pageData: DocumentData;

  current?: string;
  className?: string;
}

export const SwitcherContext = React.createContext<{
  switcherContext: boolean;
  setSwitcherContext: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

const DocumentsPage = (props: DocumentsPageProps) => {
  const { pageData } = props;
  const [currentStep, updateStep] = useState<number>(0);
  const [switcherContext, setSwitcherContext] = useState(false);
  const value = useMemo(() => ({ switcherContext, setSwitcherContext }), [switcherContext, setSwitcherContext]);
  const onClickStep: React.MouseEventHandler<HTMLElement> = (e) => {
    const stepNumber = parseInt(get(e, 'currentTarget.dataset.stepNumber'), 10);

    if (stepNumber === currentStep && !switcherContext) {
      setSwitcherContext(true);
    }
  };
  const renderForm = () => {
    const StepComponent = steps[currentStep].content;
    return (
      <SwitcherContext.Provider value={value}>
        <Steps
          size="small"
          current={currentStep}
          className="header-step-document"
          onChange={(step: number) => updateStep(step)}
        >
          {steps.map((item, stepNumber: number) => (
            <Step
              key={item.title}
              description={item.description}
              title={item.title}
              onClick={onClickStep}
              data-step-number={stepNumber}
            />
          ))}
        </Steps>
        <div className="steps-content">
          <StepComponent />
        </div>
      </SwitcherContext.Provider>
    );
  };

  return (
    <DocumentsWrapper>
      <Formik
        onSubmit={(values: DocumentData, actions: FormikActions<DocumentData>) => {
          console.log('submitted', values);
          actions.setSubmitting(false);
        }}
        initialValues={pageData}
        enableReinitialize={true}
        render={renderForm}
      />

      <StepActionDocument>
        {/*{currentStep > 0 && <BtnStepDocument onClick={this.prev}>Back</BtnStepDocument>}*/}
        {/*{currentStep < steps.length - 1 && (*/}
        {/*  <BtnStepDocument type="primary" onClick={this.next}>*/}
        {/*    Next*/}
        {/*  </BtnStepDocument>*/}
        {/*)}*/}
        {currentStep === steps.length - 1 && (
          <BtnStepDocument type="primary" onClick={() => message.success('Processing complete!')}>
            Submit
          </BtnStepDocument>
        )}
      </StepActionDocument>
    </DocumentsWrapper>
  );
};

export default DocumentsPage;
