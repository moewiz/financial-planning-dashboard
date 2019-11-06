import React, { useMemo, useState } from 'react';
import { Formik, FormikActions, FormikContext, FormikProps } from 'formik';
import { get } from 'lodash';
import { Steps, message } from 'antd';
import { createGlobalStyle } from 'styled-components';

import { DocumentsWrapper } from './styled';
import PresentationStep1 from './PresentationStep1/PresentationStep1';
import PresentationStep2 from './PresentationStep2/PresentationStep2';
import PresentationStep3 from './PresentationStep3/PresentationStep3';
import PresentationStep4 from './PresentationStep4/PresentationStep4';
import PresentationStep5 from './PresentationStep5/PresentationStep5';
import PresentationStep6 from './PresentationStep6/PresentationStep6';
import PresentationStep7 from './PresentationStep7/PresentationStep7';
import PresentationStep8 from './PresentationStep8/PresentationStep8';

const { Step } = Steps;
const steps = [
  {
    title: 'Step 1',
    content: PresentationStep1,
    description: 'Welcome',
  },
  {
    title: 'Step 2',
    content: PresentationStep2,
    description: 'Current Position',
  },
  {
    title: 'Step 3',
    content: PresentationStep3,
    description: 'Current Projection',
  },
  {
    title: 'Step 4',
    content: PresentationStep4,
    description: 'Strategies',
  },
  {
    title: 'Step 5',
    content: PresentationStep5,
    description: 'Proposed Projection',
  },
  {
    title: 'Step 6',
    content: PresentationStep6,
    description: 'Investment Product Comparison',
  },
  {
    title: 'Step 7',
    content: PresentationStep7,
    description: 'Fees',
  },
  {
    title: 'Step 8',
    content: PresentationStep8,
    description: 'Thank you and Goodbye',
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
  title: string;
  subtitle?: string;
  header: string;
  table: Table;
  type?: string;
  dropdown?: string[];
}

export interface StepProps {
  title: string;
  subtitle?: string;
  records?: Record[];
  table?: Table;
  description?: string;
}

export interface DocumentData {
  step1: StepProps;
  step2: StepProps;
  step3: StepProps;
  step4: StepProps;
  step5: Record;
  step6: StepProps;
  step7: Record;
  step8: StepProps;
}

export interface DocumentsPageProps {
  loading: boolean;
  clientId: number;
  pageData: DocumentData;

  current?: string;
  className?: string;
}

const CrispClientStyled = createGlobalStyle<{ hideCrisp?: boolean }>`
  ${(props) =>
    props.hideCrisp &&
    `
    .crisp-client {
      display: none;
    }
  `}
`;

export const PresentationSwitcherContext = React.createContext<{
  switcherContext: boolean;
  setSwitcherContext: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

const PresentationPage = (props: DocumentsPageProps) => {
  const { pageData, loading } = props;
  const [currentStep, updateStep] = useState<number>(0);
  const [switcherContext, setSwitcherContext] = useState(false);
  const value = useMemo(() => ({ switcherContext, setSwitcherContext }), [switcherContext, setSwitcherContext]);
  const onClickStep: React.MouseEventHandler<HTMLElement> = (e) => {
    const stepNumber = parseInt(get(e, 'currentTarget.dataset.stepNumber'), 10);

    if (stepNumber === currentStep && !switcherContext) {
      setSwitcherContext(true);
    }
  };
  const renderForm = (formikProps: FormikProps<DocumentData>) => {
    const StepComponent = steps[currentStep].content;
    const onClickSubmit = () => {
      formikProps.submitForm();
      message.success('Processing complete!');
    };

    return (
      <>
        <PresentationSwitcherContext.Provider value={value}>
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
          {/* <div className="steps-content">{!loading && !isEmpty(formikProps.values) ? <StepComponent /> : <Spin />}</div> */}
          <div className="steps-content">{<StepComponent />}</div>
        </PresentationSwitcherContext.Provider>
      </>
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
      <CrispClientStyled hideCrisp={true} />
    </DocumentsWrapper>
  );
};

export default PresentationPage;
