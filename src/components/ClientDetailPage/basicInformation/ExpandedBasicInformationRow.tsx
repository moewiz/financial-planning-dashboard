import React from 'react';
import { get } from 'lodash';
import EditableCell from '../assets/EditableCell';

export interface BasicInformation {
  description: string;
  expandable: {
    riskProfile: string;
    hasPrivateHealthInsurance: boolean;
    lookingForCoupleAdvice?: boolean;
    jointRiskProfile?: string;
  };
}

const riskProfileOptions = [
  {
    value: 'preservation',
    label: 'preservation',
  },
  {
    value: 'defensive',
    label: 'defensive',
  },
  {
    value: 'moderate',
    label: 'moderate',
  },
  {
    value: 'balanced',
    label: 'balanced',
  },
  {
    value: 'growth',
    label: 'growth',
  },
  {
    value: 'highGrowth',
    label: 'high growth',
  },
];

const hasPrivateHealthInsuranceOptions = [{ value: true, label: 'did' }, { value: false, label: 'did not' }];

const profileText = {
  defensive: 'defensive',
  highGrowth: 'high growth',
};

const ExpandedBasicInformationRow = (
  record: BasicInformation,
  index: number,
  indent: number,
  expanded: boolean,
): React.ReactNode => {
  const { expandable, description } = record;
  console.log('ExpandedBasicInformationRow', { record, index, indent, expanded });

  if (description && expandable) {
    const { riskProfile, hasPrivateHealthInsurance, lookingForCoupleAdvice, jointRiskProfile = '' } = expandable;
    if (description === 'Client') {
      return (
        <div>
          <div>
            Client’s risk profile is{' '}
            <b>
              <EditableCell
                record={record}
                dataIndex={'expandable.riskProfile'}
                type={'select'}
                tableName={'basicInformation'}
                options={riskProfileOptions}
                rowIndex={index}
                editable={true}
                expandedField={true}
              />
            </b>{' '}
            and they{' '}
            <b>
              <EditableCell
                record={record}
                dataIndex={'expandable.hasPrivateHealthInsurance'}
                type={'select'}
                tableName={'basicInformation'}
                options={hasPrivateHealthInsuranceOptions}
                rowIndex={index}
                editable={true}
                expandedField={true}
              />
            </b>{' '}
            have private health insurance
          </div>
          <div>
            Client is seeking advice for <b>{lookingForCoupleAdvice ? 'couple' : 'couple'}</b>
          </div>
          <div>
            The client will retire in <b>XXXX</b>
          </div>
          <div>
            The client <b>is not</b> a smoker
          </div>
        </div>
      );
    }
    return (
      <div>
        <div>
          Partner's risk profile is <b>{get(profileText, riskProfile)}</b> profile and they{' '}
          <b>{hasPrivateHealthInsurance ? 'did' : 'did not'}</b> have private health insurance
        </div>
        <div>
          Joint risk profile is <b>{get(profileText, jointRiskProfile)}</b>
        </div>
        <div>
          The partner will retire in <b>XXXX</b>
        </div>
        <div>
          The partner <b>is not</b> a smoker
        </div>
      </div>
    );
  }

  return null;
};

export default ExpandedBasicInformationRow;
