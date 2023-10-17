import { Box, Container, Flex, Text, Center, Button } from '@chakra-ui/react';
import ProgressBar from './ProgressBar';
import { useEffect, useState } from 'react';
import { customAxios as axios } from '../helpers/customAxios';
import MilestoneProgressBar from './MilestoneProgressBar';
import { DateTime } from 'luxon';

// TODO: Remove later. Keeping it here in case someone wants to test locally with dummy data.
// const fundraiseDataTest = {
//   givers: 20,
//   amount: 2000000,
//   milestones: [
//     {
//       milestoneName: "Milestone 1",
//       milestoneAmount: 1000000,
//       milestoneDeadline: "Mid Oct",
//     },
//     {
//       milestoneName: "Milestone 2",
//       milestoneAmount: 1500000,
//       milestoneDeadline: "End of Oct",
//     },
//     {
//       milestoneName: "Milestone 3",
//       milestoneAmount: 2000000,
//       milestoneDeadline: "Nov",
//     },
//   ]
// }

const ProgressSection = ({ bodyFontSize }) => {
  const [fundraiseData, setFundraiseData] = useState(null);
  const [pledgeData, setPledgeData] = useState(null);

  useEffect(() => {
    fetchFundraiseData();
  }, []);

  const fetchFundraiseData = async () => {
    const res = await axios.get('/api/fundraise/get', {
      params: {
        campaignName: 'Ripple Out',
      },
    });
    const { data } = res;

    for (const item of data) {
      if (item.categoryKey === 'funds') {
        setFundraiseData(item);
      } else if (item.categoryKey === 'pledge') {
        setPledgeData(item);
      }
    }
  };

  const getTarget = (milestones) => {
    const target = milestones.slice(-1)[0].milestoneAmount;
    return target;
  };

  const getMilestoneLabel = (milestones, i) => {
    const milestone = milestones[i];
    var diff;

    if (i === 0) {
      diff = milestone.milestoneAmount;
    } else {
      const prevMilestone = milestones[i - 1];
      diff = milestone.milestoneAmount - prevMilestone.milestoneAmount;
    }

    return `${milestone.milestoneName} (+$${Number(diff).toLocaleString()} BY ${
      milestone.milestoneDeadline
    })`;
  };

  const getCurrentMilestoneIndex = (milestones, amount) => {
    return milestones.findIndex(
      (milestone) => milestone.milestoneAmount > amount
    );
  };

  const getMilestoneLevels = (milestones, amount, i) => {
    const milestone = milestones[i];
    let diff;

    if (i === 0) {
      diff = milestone.milestoneAmount;
    } else {
      const prevMilestone = milestones[i - 1];
      diff = milestone.milestoneAmount - prevMilestone.milestoneAmount;
    }

    let prevMilestoneAmount;
    if (i === 0) {
      prevMilestoneAmount = 0;
    } else {
      prevMilestoneAmount = milestones[i - 1].milestoneAmount;
    }

    const currentMilestone = getCurrentMilestoneIndex(milestones, amount);

    let achieved;
    if (i === currentMilestone) {
      achieved = amount - prevMilestoneAmount;
    } else if (currentMilestone === -1) {
      achieved = diff;
    } else if (i > currentMilestone) {
      achieved = 0;
    } else {
      achieved = diff;
    }

    return {
      achieved,
      target: diff,
    };
  };

  const dateTimeFormatter = (p) => {
    if (p) {
      const dateTimeFormat = 'dd MMM yyyy, HH:mm:ss';
      const dateTimeObj = DateTime.fromISO(p);
      if (dateTimeObj.isValid) return dateTimeObj.toFormat(dateTimeFormat);
    }

    return '';
  };

  const amount = fundraiseData?.amount;
  const givers = fundraiseData?.givers;
  const milestones = fundraiseData?.milestones;
  const updatedAt = dateTimeFormatter(fundraiseData?.updatedAt);

  return (
    <Box
      w="full"
      bgPos={['right', 'center']}
      display={['block', 'block']}
      marginY={[0, 10]}
    >
      {fundraiseData != null && (
        <div>
          <Container maxW="container.xl" h="100%" paddingX={0}>
            <Box>
              <Text fontWeight="extrabold" fontSize={['3xl', '5xl']}>
                MILESTONES
              </Text>
            </Box>
            <Flex
              justifyContent="space-between"
              marginX={[0, 2]}
              lineHeight={['1em', '1.9em']}
              marginTop={5}
              gap="3"
            >
              <Box textAlign="left">
                <Box>
                  <Text as="b" fontSize={['sm', '3xl']}>
                    TOTAL AMOUNT RAISED
                  </Text>
                </Box>
                <Box mt={[2, 0]}>
                  <Text as="b" fontSize={['lg', '4xl']}>
                    {`$${Number(amount).toLocaleString()}`}
                  </Text>
                </Box>
              </Box>
              <Box textAlign="center">
                <Box>
                  <Text as="b" fontSize={['lg', '3xl']}>
                    NUMBER OF SUPPORTERS
                  </Text>
                </Box>
                <Box mt={[2, 0]}>
                  <Text as="b" fontSize={['2xl', '4xl']}>
                    {givers}
                  </Text>
                </Box>
              </Box>
              <Box textAlign="right">
                <Box>
                  <Text as="b" fontSize={['sm', '3xl']}>
                    FUNDRAISING TARGET
                  </Text>
                </Box>
                <Box mt={[2, 0]}>
                  <Text as="b" fontSize={['lg', '4xl']}>
                    {`$${Number(getTarget(milestones)).toLocaleString()}`}
                  </Text>
                </Box>
              </Box>
            </Flex>
            <Center flexDir="column">
              <ProgressBar
                bgcolor="#7C9AD4"
                amount={amount}
                milestones={milestones}
                target={getTarget(milestones)}
              />
            </Center>
            <Flex justifyContent="center" marginX="2">
              <Text fontSize={['xl', '3xl']}>
                Click/hover on the white circles for milestones info!
              </Text>
            </Flex>
            <Flex justifyContent="right">
              <Text fontSize={['lg', '2xl']}>Last updated: {updatedAt}</Text>
            </Flex>
            <Box marginTop={8}>
              <Text fontWeight="extrabold" fontSize={['3xl', '5xl']}>
                NEEDS
              </Text>
            </Box>
            <Box lineHeight="20px">
              <Text fontSize={['xl', '3xl']}>
                Reach a milestone to unlock the next one!
              </Text>
            </Box>
            <Box borderColor="black" borderWidth={1} marginTop={6} padding={3}>
              {milestones.map((_, i) => {
                const label = getMilestoneLabel(milestones, i);
                const levels = getMilestoneLevels(milestones, amount, i);

                var shouldDisplay =
                  i <= getCurrentMilestoneIndex(milestones, amount) ||
                  getCurrentMilestoneIndex(milestones, amount) === -1;

                return (
                  <Box>
                    <Text
                      as="b"
                      fontSize={['xl', '3xl']}
                      color={shouldDisplay ? 'black' : 'grey'}
                    >{`MILESTONE ${i + 1}: ${label}`}</Text>
                    {shouldDisplay && (
                      <MilestoneProgressBar
                        bgcolor="#7C9AD4"
                        achieved={levels.achieved}
                        target={levels.target}
                      />
                    )}
                  </Box>
                );
              })}
            </Box>
            {pledgeData && (
              <>
                <Box mt={8}>
                  <Text fontWeight="extrabold" fontSize={['3xl', '5xl']}>
                    PLEDGES
                  </Text>
                </Box>
                <Box>
                  <Text as="b" fontSize={bodyFontSize}>
                    What is a Pledge?
                  </Text>
                  <Text fontSize={bodyFontSize}>
                    A pledge is a commitment, both financial and symbolic, to
                    support our Ripple Out Campaign. When you make a pledge, you
                    are promising to donate a specific amount of money over a
                    designated period of time by March 2024.
                  </Text>

                  <Text as="b" fontSize={bodyFontSize}>
                    Why Make a Pledge?
                  </Text>
                  <Text fontSize={bodyFontSize}>
                    By making a pledge, you play a crucial role in helping us
                    realize our vision for a vibrant and nurturing space where
                    we can reach out to more people with the Gospel. Your
                    support will enable us to create an environment that fosters
                    spiritual growth, offers a gathering place for our
                    community, and facilitates meaningful outreach programs.
                  </Text>
                  <Text fontSize={bodyFontSize}>
                    Pledge your support to the Ripple Out Campaign by filling
                    out this form!
                  </Text>
                  <Box textAlign={['center', 'left']}>
                    <Button
                      my={2}
                      as="a"
                      href="https://bit.ly/ripple-pledge"
                      target="_blank"
                      variant="outline"
                      fontSize="xl"
                      bgColor="#ffffff"
                      fontWeight="bold"
                      borderColor="#182E57"
                      color="#182E57"
                    >
                      SUBMIT YOUR PLEDGE
                    </Button>
                  </Box>
                </Box>
                <Flex
                  justifyContent="space-between"
                  marginX={['5%', '20%']}
                  lineHeight="30px"
                  marginTop={5}
                >
                  <Box textAlign="center">
                    <Box>
                      <Text as="b" fontSize={['lg', '3xl']}>
                        TOTAL PLEDGED AMOUNT
                      </Text>
                    </Box>
                    <Box>
                      <Text as="b" fontSize={['xl', '4xl']}>
                        {`$${pledgeData.amount.toLocaleString()}`}
                      </Text>
                    </Box>
                  </Box>
                  <Box textAlign="center">
                    <Box>
                      <Text as="b" fontSize={['lg', '3xl']}>
                        PARTICIPANTS
                      </Text>
                    </Box>
                    <Box>
                      <Text as="b" fontSize={['xl', '4xl']}>
                        {`${pledgeData.givers.toLocaleString()}`}
                      </Text>
                    </Box>
                  </Box>
                </Flex>
              </>
            )}
          </Container>
        </div>
      )}
    </Box>
  );
};

export default ProgressSection;
