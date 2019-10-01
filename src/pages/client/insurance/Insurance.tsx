import React, { PureComponent } from 'react';

interface InsuranceProps {
  clientId: number;
  pageData: any;
}

class Insurance extends PureComponent<InsuranceProps> {
  public render() {
    return (
      <div>
        Insurance page
      </div>
    );
  }
}

export default Insurance;
