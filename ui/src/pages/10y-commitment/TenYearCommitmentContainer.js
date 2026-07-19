import React, { useLayoutEffect } from 'react';
import { Flex } from 'components';
import { useLocation } from 'react-router-dom';
import TenYearHeroSection from './TenYearHeroSection';
import ThreeFoldCommitment from './ThreeFoldCommitment';
import TenYearHeartSection from './TenYearHeartContainer';
import WaysToParticipate from './WaysToParticipate';

const EMBED_CHROME_IDS = [
  'site-navbar',
  'site-mobile-navbar',
  'site-footer',
];

const TenYearCommitmentContainer = () => {
  const { search } = useLocation();
  const isEmbed = new URLSearchParams(search).get('embed') === '1';

  useLayoutEffect(() => {
    if (!isEmbed) return;

    const main = document.getElementById('main-container');
    const chrome = EMBED_CHROME_IDS.map((id) =>
      document.getElementById(id)
    ).filter(Boolean);

    chrome.forEach((el) => {
      el.dataset.prevDisplay = el.style.display;
      el.style.display = 'none';
    });

    const prevMt = main?.style.marginTop;
    const prevMb = main?.style.marginBottom;
    if (main) {
      main.style.marginTop = '0';
      main.style.marginBottom = '0';
    }

    return () => {
      chrome.forEach((el) => {
        el.style.display = el.dataset.prevDisplay || '';
        delete el.dataset.prevDisplay;
      });
      if (main) {
        main.style.marginTop = prevMt;
        main.style.marginBottom = prevMb;
      }
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
