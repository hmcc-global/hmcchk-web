import {
  Box,
  Container,
  Flex,
  Text,
  Center,
  Button,
  useMediaQuery,
  Link,
} from '@chakra-ui/react';
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

  const [isWideScreen] = useMediaQuery('(min-width: 800px)');

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

    return `${milestone.milestoneName} (+$${Number(diff).toLocaleString()})`;
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
      paddingY={[0, 30]}
      paddingX={[5, 0]}
      background="linear-gradient(180deg, #F0F5FF 10.74%, #E9F6FF 22.35%, #FFFAEC 30.87%)"
      color="#182E57"
    >
      {fundraiseData != null && (
        <div>
          <Container maxW="container.xl" h="100%" paddingX={[0, 5, 5, 5]}>
            <Box>
              <Text fontWeight="extrabold" fontSize={['3xl', '5xl']} pt={5}>
                MILESTONES
              </Text>
            </Box>
            <Flex
              justifyContent="space-between"
              marginX={[0, 2]}
              lineHeight={['1em', '1.9em']}
              marginTop={[2, 5]}
              gap="3"
            >
              <Box textAlign="left">
                <Box>
                  <Text as="b" fontSize={['sm', '3xl']}>
                    {isWideScreen ? 'TOTAL AMOUNT RAISED' : 'RAISED'}
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
                  <Text as="b" fontSize={['sm', '3xl']}>
                    {isWideScreen ? 'NUMBER OF SUPPORTERS' : 'SUPPORTERS'}
                  </Text>
                </Box>
                <Box mt={[2, 0]}>
                  <Text as="b" fontSize={['lg', '4xl']}>
                    {givers}
                  </Text>
                </Box>
              </Box>
              <Box textAlign="right">
                <Box>
                  <Text as="b" fontSize={['sm', '3xl']}>
                    {isWideScreen ? 'FUNDRAISING TARGET' : 'GOAL'}
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
            <Flex
              justifyContent={['center', 'space-between']}
              textAlign="center"
            >
              <Text fontSize={['lg', '2xl']}>
                Click/hover on the white circles for milestones info!
              </Text>
              {isWideScreen && (
                <Text fontSize={['lg', '2xl']}>Last updated: {updatedAt}</Text>
              )}
            </Flex>
            <Box mt={[10, 20]}>
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
                <Box mt={[10, 20]}>
                  <Text fontWeight="extrabold" fontSize={['3xl', '5xl']}>
                    PLEDGE RECEIVED
                  </Text>
                </Box>
                <Box>
                  <Text fontSize={['lg', '3xl']} fontWeight="thin">
                    A pledge is a commitment, both financial and symbolic, to
                    support our Ripple Out Campaign. Here is the amount of
                    pledge we have received so far!
                  </Text>
                </Box>
                <Flex
                  justifyContent="space-between"
                  marginX={['5%', '6%', '6%', '20%']}
                  lineHeight="30px"
                  mt={[10, 20]}
                >
                  <Box textAlign="center">
                    <Box>
                      <Text as="b" fontSize={['lg', '3xl']}>
                        {isWideScreen
                          ? 'TOTAL PLEDGED AMOUNT'
                          : 'TOTAL PLEDGED'}
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
                <Box textAlign="center" mt={[10, 20]}>
                  <Flex width="100%" justifyContent="center">
                    <Text
                      fontSize={['lg', '3xl']}
                      fontWeight="thin"
                      width={['100%', '80%', '80%', '66%']}
                    >
                      Click below to learn more how to participate in the Ripple
                      Out Campaign!
                    </Text>
                  </Flex>
                  <Box textAlign={['center', 'center']} width="100%" mt={5}>
                    <Link target="_blank" href="https://bit.ly/ripple-pledge">
                      <Button
                        mt={5}
                        mb={10}
                        target="_blank"
                        variant="outline"
                        fontSize={['xl', '2xl']}
                        bgColor="#ffffff"
                        fontWeight="bold"
                        borderColor="#182E57"
                        color="#182E57"
                        py={[8, 10]}
                        width={['70%', '30%']}
                      >
                        I WANT TO <br /> PARTICIPATE!
                      </Button>
                    </Link>
                  </Box>
                </Box>
              </>
            )}
          </Container>
        </div>
      )}
    </Box>
  );
};

export default ProgressSection;
