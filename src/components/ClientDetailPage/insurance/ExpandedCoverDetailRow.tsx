import React from 'react';
import EditableCell from '../assets/EditableCell';
import {
  ExpandedAssetsGroups,
  ExpandedAssetsInlineGroups,
  ExpandedAssetsText,
  ExpandedSelectGroup,
} from '../assets/styled';
import {
  standaloneLinkedOptions,
} from '../../../enums/options';
import { CoverDetail } from './CoverDetailsTable';

const ExpandedCoverDetailRow = (props: {
  record: CoverDetail;
  index: number;
  indent: number;
  expanded: boolean;
  insuranceIndex: number;
}) => {
  const { record, index, insuranceIndex } = props;
  const { expandable, coverType } = record;

  switch (coverType) {
    case 'life': {
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
          </ExpandedAssetsInlineGroups>
        </ExpandedAssetsGroups>
      );
    }
    default: {
      return (
        <ExpandedAssetsGroups>
          <ExpandedAssetsInlineGroups>
            <ExpandedAssetsText>This is default section</ExpandedAssetsText>
          </ExpandedAssetsInlineGroups>
        </ExpandedAssetsGroups>
      );
    }
  }
};

export default ExpandedCoverDetailRow;
