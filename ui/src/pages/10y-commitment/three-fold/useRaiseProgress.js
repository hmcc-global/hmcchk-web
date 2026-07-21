import { useEffect, useState } from 'react';
import { customAxios as axios } from 'utils/customAxios';
import { RAISE_CAMPAIGN_NAME, RAISE_CATEGORY_KEY } from '../constants';

// Reads the live "Raise" fundraising figures from the Fundraise table.
// GET /api/fundraise/get?campaignName=<RAISE_CAMPAIGN_NAME> returns the array
// of category rows for the campaign; we pick the one keyed RAISE_CATEGORY_KEY.
// In that row `amount` is the raised total and milestones[0].milestoneAmount
// is the goal. Stays at zero until the row loads (or if it's missing).
export const useRaiseProgress = () => {
  const [progress, setProgress] = useState({ raised: 0, goal: 0 });

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const { data } = await axios.get('/api/fundraise/get', {
          params: { campaignName: RAISE_CAMPAIGN_NAME },
        });
        const row = Array.isArray(data)
          ? data.find((c) => c.categoryKey === RAISE_CATEGORY_KEY)
          : null;
        if (!row || !active) return;

        setProgress({
          raised: Number(row.amount) || 0,
          goal: Number(row.milestones?.[0]?.milestoneAmount) || 0,
        });
      } catch (err) {
        console.log(err);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return progress;
};
