import React from 'react';
import PremiumFeeDetailsTable, { PremiumFeeDetail } from './PremiumFeeDetailsTable';
import CoverDetailsTable, { CoverDetail } from './CoverDetailsTable';

export interface InsuranceProps {
  coverDetails: CoverDetail[];
  premiumFeeDetails: PremiumFeeDetail[];
}

const ExpandedInsuranceRow = (props: {
  record: InsuranceProps;
  index: number;
  indent: number;
  expanded: boolean;
  addRow: (index: number, tableName: string, row: any) => void;
  deleteRow: (index: number, tableName: string, key: number) => void;
  dynamicCustomValue: object;
  maritalState: string;
}) => {
  const { record, index, addRow, deleteRow, dynamicCustomValue, maritalState } = props;
  const { coverDetails, premiumFeeDetails } = record;

  return (
    <>
      <CoverDetailsTable
        data={coverDetails}
        index={index}
        tableName={'coverDetails'}
        addRow={addRow}
        deleteRow={deleteRow}
        dynamicCustomValue={dynamicCustomValue}
        maritalState={maritalState}
      />
      <PremiumFeeDetailsTable
        data={premiumFeeDetails}
        index={index}
        tableName={'premiumFeeDetails'}
        addRow={addRow}
        deleteRow={deleteRow}
      />
    </>
  );
};

export default ExpandedInsuranceRow;
