import React from 'react';
import CommitmentPanel from './CommitmentPanel';
import ReproduceDotGrid from './ReproduceDotGrid';

const ReproducePanel = () => {
  return (
    <CommitmentPanel
      heading="Reproduce 1,000 Disciples"
      body="We will intentionally raise up 1,000 faithful followers of Christ, men and women, who are equipped to serve and go wherever God calls them."
    >
      <ReproduceDotGrid />
    </CommitmentPanel>
  );
};

export default ReproducePanel;
