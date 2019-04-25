import React from 'react';
import { get } from 'lodash';

export interface BasicInformation {
  description: string;
  expandable: {
    riskProfile: string;
    hasPrivateHealthInsurance: boolean;
    lookingForCoupleAdvice?: boolean;
    jointRiskProfile?: string;
  };
}

const profileText = {
  defensive: 'defensive',
  highGrowth: 'high growth',
};

const ExpandedBasicInformationRow: React.FC<BasicInformation> = (props) => {
  const { expandable, description } = props;
  if (description && expandable) {
    const { riskProfile, hasPrivateHealthInsurance, lookingForCoupleAdvice, jointRiskProfile = '' } = expandable;
    if (description === 'Client') {
      return (
        <div>
          <p>
            Client's risk profile is <b>{get(profileText, riskProfile)}</b> and they{' '}
            <b>{hasPrivateHealthInsurance ? 'did' : 'did not'}</b> have private health insurance
          </p>
          <p>
            Client is seeking advice for <b>{lookingForCoupleAdvice ? 'couple' : 'couple'}</b>
          </p>
        </div>
      );
    }
    return (
      <div>
        <p>
          Partner's risk profile is <b>{get(profileText, riskProfile)}</b> profile and they{' '}
          <b>{hasPrivateHealthInsurance ? 'did' : 'did not'}</b> have private health insurance
        </p>
        <p>
          Joint risk profile is <b>{get(profileText, jointRiskProfile)}</b>
        </p>
      </div>
    );
  }

  return null;
};

export default ExpandedBasicInformationRow;
