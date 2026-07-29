import React from 'react';
import CommitmentPanel from './CommitmentPanel';
import ReproduceDotGrid from './ReproduceDotGrid';

const ReproducePanel = ({ onPrev, onNext }) => {
  return (
    <CommitmentPanel
      heading="Reproduce 1,000 Disciples"
      onPrev={onPrev}
      onNext={onNext}
      body="We will intentionally raise up 1,000 faithful followers of Christ, men and women, who are equipped to serve and go wherever God calls them."
    >
      <ReproduceDotGrid />
    </CommitmentPanel>
  );
};

export default ReproducePanel;
