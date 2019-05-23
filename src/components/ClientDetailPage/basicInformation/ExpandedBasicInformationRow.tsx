import React from 'react';
import EditableCell from '../assets/EditableCell';
import {
  ExpandedAssetsGroups,
  ExpandedAssetsInlineGroups,
  ExpandedAssetsText,
  ExpandedSelectGroup,
} from '../assets/styled';
import {
  hasPrivateHealthInsuranceOptions,
  isOrNotOptions,
  lookingForCoupleAdviceOptions,
  riskProfileOptions,
} from '../../../enums/options';

export interface BasicInformation {
  description: string;
  expandable: {
    riskProfile: string;
    hasPrivateHealthInsurance: boolean;
    lookingForCoupleAdvice?: boolean;
    jointRiskProfile?: string;
  };
}

const joinRiskProfileOptions = riskProfileOptions;

const ExpandedBasicInformationRow = (
  record: BasicInformation,
  index: number,
  indent: number,
  expanded: boolean,
): React.ReactNode => {
  const { expandable, description } = record;

  if (description && expandable) {
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
                dataIndex={'expandable.lookingForCoupleAdvice'}
                type={'select'}
                tableName={'basicInformation'}
                options={lookingForCoupleAdviceOptions}
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
                pickerType={'year'}
                tableName={'basicInformation'}
                rowIndex={index}
                editable={true}
                expandedField={true}
                disabledYear={true}
              />
            </ExpandedSelectGroup>
          </ExpandedAssetsInlineGroups>

          <ExpandedAssetsInlineGroups>
            <ExpandedAssetsText>The client</ExpandedAssetsText>
            <ExpandedSelectGroup>
              <EditableCell
                record={record}
                dataIndex={'expandable.isSmoker'}
                type={'select'}
                tableName={'basicInformation'}
                options={isOrNotOptions}
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
              dataIndex={'expandable.jointRiskProfile'}
              type={'select'}
              tableName={'basicInformation'}
              options={joinRiskProfileOptions}
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
              pickerType={'year'}
              tableName={'basicInformation'}
              rowIndex={index}
              editable={true}
              expandedField={true}
              disabledYear={true}
            />
          </ExpandedSelectGroup>
        </ExpandedAssetsInlineGroups>

        <ExpandedAssetsInlineGroups>
          <ExpandedAssetsText>The partner</ExpandedAssetsText>
          <ExpandedSelectGroup>
            <EditableCell
              record={record}
              dataIndex={'expandable.isSmoker'}
              type={'select'}
              tableName={'basicInformation'}
              options={isOrNotOptions}
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
