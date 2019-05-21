import React from 'react';
import PremiumFeeDetailsTable, { PremiumFeeDetail } from './PremiumFeeDetailsTable';
import CoverDetailsTable, { CoverDetail } from './CoverDetailsTable';

export interface LiabilityProps {
  coverDetails: CoverDetail[];
  premiumFeeDetails: PremiumFeeDetail[];
}

const ExpandedInsuranceRow: React.FC<LiabilityProps> = (record: any, index: number) => {
  const { coverDetails, premiumFeeDetails } = record;

  return (
    <>
      <CoverDetailsTable
        data={coverDetails}
        index={index}
        tableName={'coverDetails'}
      />
      <PremiumFeeDetailsTable
        data={premiumFeeDetails}
        index={index}
        tableName={'premiumFeeDetails'}
      />
    </>
  );
};

export default ExpandedInsuranceRow;
