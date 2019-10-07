import React from 'react';
import { connect } from 'formik';

import DocumentsCard from '../DocumentsCard/DocumentsCard';
import DocumentsCarousel from '../DocumentsCarousel/DocumentsCarousel';
import { TitleStep, TitleStepSmall, StepWrapper } from '../styled';
import { DocumentsStep2WP } from './styled';
import { DocumentData, FormikPartProps } from '../DocumentsPage';

class DocumentsStep2 extends React.PureComponent<FormikPartProps> {
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
        <DocumentsStep2WP>
          {/*{slideNumber > 0 ? (*/}
          {/*  <DocumentsCarousel slideNumber={slideNumber} />*/}
          {/*) : (*/}
          {/*  <DocumentsCard setSlideNumber={this.setSlideNumber} />*/}
          {/*)}*/}
          <DocumentsCarousel slideNumber={slideNumber} />
        </DocumentsStep2WP>
      </StepWrapper>
    );
  }
}

export default connect<{}, DocumentData>(DocumentsStep2);
