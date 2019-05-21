import React from 'react';
import EditableCell from '../assets/EditableCell';
import {
  ExpandedInsuranceGroups,
  ExpandedAssetsInlineGroups,
  ExpandedAssetsText,
  ExpandedSelectGroup,
  PrefixSingleGroup,
} from '../assets/styled';
import {
  benefitDefaultAgeOptions,
  COVER_TYPE,
  incomeProtectionTypeOptions,
  standaloneLinkedOptions,
  superlinkedOptions,
  tpdTypeOptions,
  waitingPeriodTypeOptions,
} from '../../../enums/options';
import { CoverDetail } from './CoverDetailsTable';
const linkedProductOptions = [{ value: 1, label: 'AAA' }, { value: 2, label: 'BBB' }, { value: 3, label: 'CCC' }];

const ExpandedCoverDetailRow = (props: {
  record: CoverDetail;
  index: number;
  indent: number;
  expanded: boolean;
  insuranceIndex: number;
}) => {
  const { record, index, insuranceIndex } = props;
  const { expandable, coverType } = record;

  switch (COVER_TYPE[coverType]) {
    case COVER_TYPE.life:
    case COVER_TYPE.trauma: {
      return (
        <ExpandedAssetsGroups>
          <ExpandedAssetsInlineGroups>
            <ExpandedAssetsText>The cover is</ExpandedAssetsText>
            <ExpandedSelectGroup>
              <EditableCell
                record={record}
                type={'select'}
                tableName={`insurance[${insuranceIndex}].coverDetails`}
                rowIndex={index}
                dataIndex={'expandable.isLinked'}
                options={standaloneLinkedOptions}
                editable={true}
                expandedField={true}
              />
            </ExpandedSelectGroup>
            {expandable.isLinked && (
              <>
                <ExpandedAssetsText>to</ExpandedAssetsText>
                <ExpandedSelectGroup>
                  <EditableCell
                    record={record}
                    type={'select'}
                    tableName={`insurance[${insuranceIndex}].coverDetails`}
                    rowIndex={index}
                    dataIndex={'expandable.linkedProduct'}
                    options={linkedProductOptions}
                    editable={true}
                    expandedField={true}
                  />
                </ExpandedSelectGroup>
              </>
            )}
          </ExpandedAssetsInlineGroups>
        </ExpandedAssetsGroups>
      );
    }
    case COVER_TYPE.tpd: {
      return (
        <ExpandedInsuranceGroups>
          <ExpandedAssetsInlineGroups>
            <ExpandedAssetsText>This TDP cover is of type</ExpandedAssetsText>
            <ExpandedSelectGroup>
              <EditableCell
                record={record}
                type={'select'}
                tableName={`insurance[${insuranceIndex}].coverDetails`}
                rowIndex={index}
                dataIndex={'expandable.tpdType'}
                options={tpdTypeOptions}
                editable={true}
                expandedField={true}
              />
            </ExpandedSelectGroup>
            <ExpandedAssetsText>and</ExpandedAssetsText>
            <ExpandedSelectGroup>
              <EditableCell
                record={record}
                type={'select'}
                tableName={`insurance[${insuranceIndex}].coverDetails`}
                rowIndex={index}
                dataIndex={'expandable.superlinked'}
                options={superlinkedOptions}
                editable={true}
                expandedField={true}
              />
            </ExpandedSelectGroup>
            <ExpandedAssetsText>to super</ExpandedAssetsText>
          </ExpandedAssetsInlineGroups>
          <ExpandedAssetsInlineGroups>
            <ExpandedAssetsText>The cover is</ExpandedAssetsText>
            <ExpandedSelectGroup>
              <EditableCell
                record={record}
                type={'select'}
                tableName={`insurance[${insuranceIndex}].coverDetails`}
                rowIndex={index}
                dataIndex={'expandable.isLinked'}
                options={standaloneLinkedOptions}
                editable={true}
                expandedField={true}
              />
            </ExpandedSelectGroup>
            {expandable.isLinked && (
              <>
                <ExpandedAssetsText>to</ExpandedAssetsText>
                <ExpandedSelectGroup>
                  <EditableCell
                    record={record}
                    type={'select'}
                    tableName={`insurance[${insuranceIndex}].coverDetails`}
                    rowIndex={index}
                    dataIndex={'expandable.linkedProduct'}
                    options={linkedProductOptions}
                    editable={true}
                    expandedField={true}
                  />
                </ExpandedSelectGroup>
              </>
            )}
          </ExpandedAssetsInlineGroups>
        </ExpandedInsuranceGroups>
      );
    }
    case COVER_TYPE.incomeProtection: {
      return (
        <ExpandedAssetsGroups>
          <ExpandedAssetsInlineGroups>
            <ExpandedAssetsText>This Income Protection cover is</ExpandedAssetsText>
            <ExpandedSelectGroup>
              <EditableCell
                record={record}
                type={'select'}
                tableName={`insurance[${insuranceIndex}].coverDetails`}
                rowIndex={index}
                dataIndex={'expandable.incomeProtectionType'}
                options={incomeProtectionTypeOptions}
                editable={true}
                expandedField={true}
              />
            </ExpandedSelectGroup>
            <ExpandedAssetsText>and</ExpandedAssetsText>
            <ExpandedSelectGroup>
              <EditableCell
                record={record}
                type={'select'}
                tableName={`insurance[${insuranceIndex}].coverDetails`}
                rowIndex={index}
                dataIndex={'expandable.superlinked'}
                options={superlinkedOptions}
                editable={true}
                expandedField={true}
              />
            </ExpandedSelectGroup>
          </ExpandedAssetsInlineGroups>
          <ExpandedAssetsInlineGroups>
            <ExpandedAssetsText>The cover is</ExpandedAssetsText>
            <ExpandedSelectGroup>
              <EditableCell
                record={record}
                type={'select'}
                tableName={`insurance[${insuranceIndex}].coverDetails`}
                rowIndex={index}
                dataIndex={'expandable.isLinked'}
                options={standaloneLinkedOptions}
                editable={true}
                expandedField={true}
              />
            </ExpandedSelectGroup>
            {expandable.isLinked && (
              <>
                <ExpandedAssetsText>to</ExpandedAssetsText>
                <ExpandedSelectGroup>
                  <EditableCell
                    record={record}
                    type={'select'}
                    tableName={`insurance[${insuranceIndex}].coverDetails`}
                    rowIndex={index}
                    dataIndex={'expandable.linkedProduct'}
                    options={linkedProductOptions}
                    editable={true}
                    expandedField={true}
                  />
                </ExpandedSelectGroup>
              </>
            )}
          </ExpandedAssetsInlineGroups>
          <ExpandedAssetsInlineGroups>
            <ExpandedAssetsText>The cover has a waiting period of</ExpandedAssetsText>
            <PrefixSingleGroup>
              <EditableCell
                record={record}
                tableName={`insurance[${insuranceIndex}].coverDetails`}
                rowIndex={index}
                dataIndex={'expandable.waitingPeriodLength'}
                type={'number'}
                editable={true}
                expandedField={true}
              />
            </PrefixSingleGroup>
            <ExpandedSelectGroup>
              <EditableCell
                record={record}
                type={'select'}
                tableName={`insurance[${insuranceIndex}].coverDetails`}
                rowIndex={index}
                dataIndex={'expandable.waitingPeriodType'}
                options={waitingPeriodTypeOptions}
                editable={true}
                expandedField={true}
              />
            </ExpandedSelectGroup>
            <ExpandedAssetsText>and a benefit period of</ExpandedAssetsText>
            <ExpandedSelectGroup>
              <EditableCell
                record={record}
                type={'select'}
                tableName={`insurance[${insuranceIndex}].coverDetails`}
                rowIndex={index}
                dataIndex={'expandable.benefitAtDefaultAge'}
                options={benefitDefaultAgeOptions}
                editable={true}
                expandedField={true}
              />
            </ExpandedSelectGroup>
            {expandable.benefitAtDefaultAge === false && (
              <PrefixSingleGroup>
                <EditableCell
                  record={record}
                  tableName={`insurance[${insuranceIndex}].coverDetails`}
                  rowIndex={index}
                  dataIndex={'expandable.benefitCustomAge'}
                  type={'number'}
                  editable={true}
                  expandedField={true}
                />
              </PrefixSingleGroup>
            )}
          </ExpandedAssetsInlineGroups>
        </ExpandedAssetsGroups>
      );
    }
    default: {
      return (
        <ExpandedInsuranceGroups>
          <ExpandedAssetsInlineGroups>
            <ExpandedAssetsText>This is default section</ExpandedAssetsText>
          </ExpandedAssetsInlineGroups>
        </ExpandedInsuranceGroups>
      );
    }
  }
};

export default ExpandedCoverDetailRow;
