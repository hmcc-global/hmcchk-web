import React from 'react';
import { TabGroup } from '../../components';
import HongKongContent from './HongKongContent';
import InternationalContent from './InternationalContent';
import SomeOtherContent from './SomeOtherContent';

const TestingPage = () => {
  const tabOptions = [
    {
      title: 'Hong Kong',
      content: <HongKongContent />,
    },
    {
      title: 'International',
      content: <InternationalContent />,
    },
    {
      title: 'Some Other Content',
      content: <SomeOtherContent />,
    },
  ];

  return (
    <div>
      <TabGroup 
        options={tabOptions}
        defaultSelected={0}
        // typography={tenYearTheme.typography.subheading}
        // Optional customizations:
        // selectorBg="#your-color"
        // selectorColor="#your-text-color" 
        // inactiveColor="#your-inactive-color"
      />
    </div>
  );
};

export default TestingPage;