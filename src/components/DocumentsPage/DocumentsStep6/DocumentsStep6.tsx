import React from 'react';
import { connect } from 'formik';

import DocumentsCard from '../DocumentsCard/DocumentsCard';
import DocumentsCarousel from '../DocumentsCarousel/DocumentsCarousel';
import { TitleStep, TitleStepSmall, StepWrapper } from '../styled';
import { DocumentsStep6WP } from './styled';
import { DocumentData, FormikPartProps } from '../DocumentsPage';

class DocumentsStep6 extends React.PureComponent<FormikPartProps> {
  public state = {
    slideNumber: 0,
  };
  public setSlideNumber = (slideNumber: number) => {
    this.setState({ slideNumber });
  }
  public render(): JSX.Element {
    const { slideNumber } = this.state;
    return (
      <StepWrapper>
        <TitleStep>Summary of Recommendations</TitleStep>
        <TitleStepSmall>Supporting text goes here</TitleStepSmall>
        <DocumentsStep6WP>
          {slideNumber > 0 ? (
            <DocumentsCarousel slideNumber={slideNumber} />
          ) : (
            <DocumentsCard setSlideNumber={this.setSlideNumber} />
          )}
        </DocumentsStep6WP>
      </StepWrapper>
    );
  }
}

export default connect<{}, DocumentData>(DocumentsStep6);
