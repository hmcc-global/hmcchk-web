import React, { useLayoutEffect } from 'react';
import { Flex } from 'components';
import { useLocation } from 'react-router-dom';
import TenYearHeroSection from './TenYearHeroSection';
import ThreeFoldCommitment from './ThreeFoldCommitment';
import TenYearHeartSection from './TenYearHeartContainer';
import WaysToParticipate from './WaysToParticipate';

const TenYearCommitmentContainer = () => {
  const { search } = useLocation();
  const isEmbed = new URLSearchParams(search).get('embed') === '1';

  // ponytail: DOM hide assumes App sibling order NavBar → #main-container → MobileNavBar
  // and Footer as last child of main; revisit if that layout changes
  useLayoutEffect(() => {
    if (!isEmbed) return;

    const main = document.getElementById('main-container');
    if (!main) return;

    const chrome = [
      main.previousElementSibling,
      main.nextElementSibling,
      main.lastElementChild,
    ].filter(Boolean);

    chrome.forEach((el) => {
      el.dataset.prevDisplay = el.style.display;
      el.style.display = 'none';
    });
    const prevMt = main.style.marginTop;
    const prevMb = main.style.marginBottom;
    main.style.marginTop = '0';
    main.style.marginBottom = '0';

    return () => {
      chrome.forEach((el) => {
        el.style.display = el.dataset.prevDisplay || '';
        delete el.dataset.prevDisplay;
      });
      main.style.marginTop = prevMt;
      main.style.marginBottom = prevMb;
    };
  }, [isEmbed]);

  return (
    <Flex direction="column" sx={{ overscrollBehaviorX: 'none' }}>
      <TenYearHeroSection />
      <ThreeFoldCommitment />
      <TenYearHeartSection />
      <WaysToParticipate />
    </Flex>
  );
};

export default TenYearCommitmentContainer;
