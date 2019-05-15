import { get } from 'lodash';
import React from 'react';
import EditableCell from '../assets/EditableCell';
import {
  ExpandedAssetsGroups,
  ExpandedAssetsInlineGroups,
  ExpandedAssetsText,
  ExpandedSelectGroup,
} from '../assets/styled';

export interface BasicInformation {
  description: string;
  expandable: {
    riskProfile: string;
    hasPrivateHealthInsurance: boolean;
    lookingForCoupleAdvice?: boolean;
    jointRiskProfile?: string;
  };
}
const coupleOptions = [
  {
    value: 'preservation',
    label: 'couple',
  },
  {
    value: 'defensive',
    label: 'couple',
  },
];
const thepartnerOptions = [
  {
    value: 'preservation',
    label: 'is',
  },
  {
    value: 'defensive',
    label: 'is not',
  },
];

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

const joinRiskProfileOptions = riskProfileOptions;

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

  if (description && expandable) {
    const { riskProfile, hasPrivateHealthInsurance, lookingForCoupleAdvice, jointRiskProfile = '' } = expandable;
    if (description === 'Client') {
      return (
        <ExpandedAssetsGroups>
          <ExpandedAssetsInlineGroups>
            <ExpandedAssetsText>Client’s risk profile is</ExpandedAssetsText>
            <ExpandedSelectGroup>
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
            </ExpandedSelectGroup>
            <ExpandedAssetsText>and they</ExpandedAssetsText>
            <ExpandedSelectGroup>
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
            </ExpandedSelectGroup>
            <ExpandedAssetsText>have private health insurance</ExpandedAssetsText>
          </ExpandedAssetsInlineGroups>

          <ExpandedAssetsInlineGroups>
            <ExpandedAssetsText>Client is seeking advice for</ExpandedAssetsText>
            <ExpandedSelectGroup>
              <EditableCell
                record={record}
                dataIndex={'expandable.riskProfile'}
                type={'select'}
                tableName={'basicInformation'}
                options={coupleOptions}
                rowIndex={index}
                editable={true}
                expandedField={true}
              />
            </ExpandedSelectGroup>
          </ExpandedAssetsInlineGroups>

          <ExpandedAssetsInlineGroups>
            <ExpandedAssetsText>The client will retire in</ExpandedAssetsText>
            <ExpandedSelectGroup>
              <EditableCell
                record={record}
                dataIndex={'expandable.retirementYear'}
                type={'date'}
                tableName={'basicInformation'}
                rowIndex={index}
                editable={true}
                expandedField={true}
              />
            </ExpandedSelectGroup>
          </ExpandedAssetsInlineGroups>

          <ExpandedAssetsInlineGroups>
            <ExpandedAssetsText>The partner</ExpandedAssetsText>
            <ExpandedSelectGroup>
              <EditableCell
                record={record}
                dataIndex={'expandable.riskProfile'}
                type={'select'}
                tableName={'basicInformation'}
                options={thepartnerOptions}
                rowIndex={index}
                editable={true}
                expandedField={true}
              />
            </ExpandedSelectGroup>
            <ExpandedAssetsText>a smoker</ExpandedAssetsText>
          </ExpandedAssetsInlineGroups>
        </ExpandedAssetsGroups>
      );
    }
    return (
      <ExpandedAssetsGroups>
          <ExpandedAssetsInlineGroups>
            <ExpandedAssetsText>Partner’s risk profile is</ExpandedAssetsText>
            <ExpandedSelectGroup>
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
            </ExpandedSelectGroup>
            <ExpandedAssetsText>profile and they</ExpandedAssetsText>
            <ExpandedSelectGroup>
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
            </ExpandedSelectGroup>
            <ExpandedAssetsText>have private health insurance</ExpandedAssetsText>
          </ExpandedAssetsInlineGroups>

          <ExpandedAssetsInlineGroups>
            <ExpandedAssetsText>Joint risk profile is</ExpandedAssetsText>
            <ExpandedSelectGroup>
              <EditableCell
                record={record}
                dataIndex={'expandable.riskProfile'}
                type={'select'}
                tableName={'basicInformation'}
                options={coupleOptions}
                rowIndex={index}
                editable={true}
                expandedField={true}
              />
            </ExpandedSelectGroup>
          </ExpandedAssetsInlineGroups>

          <ExpandedAssetsInlineGroups>
            <ExpandedAssetsText>The partner will retire in</ExpandedAssetsText>
            <ExpandedSelectGroup>
              <EditableCell
                record={record}
                dataIndex={'expandable.retirementYear'}
                type={'date'}
                tableName={'basicInformation'}
                rowIndex={index}
                editable={true}
                expandedField={true}
              />
            </ExpandedSelectGroup>
          </ExpandedAssetsInlineGroups>

          <ExpandedAssetsInlineGroups>
            <ExpandedAssetsText>The partner</ExpandedAssetsText>
            <ExpandedSelectGroup>
              <EditableCell
                record={record}
                dataIndex={'expandable.riskProfile'}
                type={'select'}
                tableName={'basicInformation'}
                options={thepartnerOptions}
                rowIndex={index}
                editable={true}
                expandedField={true}
              />
            </ExpandedSelectGroup>
            <ExpandedAssetsText>a smoker</ExpandedAssetsText>
          </ExpandedAssetsInlineGroups>
        </ExpandedAssetsGroups>
    );
  }

  return null;
};

export default ExpandedBasicInformationRow;
