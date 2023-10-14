import { Box, Container, Flex, Text, Center } from '@chakra-ui/react';
import ProgressBar from './ProgressBar';
import { useEffect, useState } from 'react';
import { customAxios as axios } from "../helpers/customAxios";
import MilestoneProgressBar from './MilestoneProgressBar';

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

const ProgressSection = () => {
  const [fundraiseData, setFundraiseData] = useState(null);

  useEffect(() => {
    fetchFundraiseData();
  }, []);

  const fetchFundraiseData = async () => {
    const res = await axios.get('/api/fundraise/get', {
      params: {
        campaignName: 'Ripple Out'
      }
    });
    const { data } = res;

    setFundraiseData(data[0]);
  };

  const getTarget = (milestones) => {
    const target = milestones.slice(-1)[0].milestoneAmount;
    return target;
  };

  const getMilestoneLabel = (milestones, i) => {
    const milestone = milestones[i];
    var diff;

    if (i == 0) {
      diff = milestone.milestoneAmount;
    } else {
      const prevMilestone = milestones[i-1];
      diff = milestone.milestoneAmount - prevMilestone.milestoneAmount;
    }

    return `${milestone.milestoneName} (+$${diff.toLocaleString()} BY ${milestone.milestoneDeadline})`;
  }

  const getCurrentMilestoneIndex = (milestones, amount) => {
    return milestones.findIndex((milestone) => milestone.milestoneAmount > amount);
  }

  const getMilestoneLevels = (milestones, amount, i) => {
    const milestone = milestones[i];
    var diff;

    if (i == 0) {
      diff = milestone.milestoneAmount;
    } else {
      const prevMilestone = milestones[i-1];
      diff = milestone.milestoneAmount - prevMilestone.milestoneAmount;
    }

    var prevMilestoneAmount;
    if (i == 0) {
      prevMilestoneAmount = 0;
    } else {
      prevMilestoneAmount = milestones[i-1].milestoneAmount;
    }

    const currentMilestone = getCurrentMilestoneIndex(milestones, amount);

    var achieved;
    if (i == currentMilestone) {
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
  }

  const amount = fundraiseData?.amount;
  const givers = fundraiseData?.givers;
  const milestones = fundraiseData?.milestones;

  return (
    <Box
      w="full"
      bgPos={['right', 'center']}
      display={['block', 'block']}
      marginY={[0, 10]}
    >
      {
        fundraiseData != null &&
        <div>
          <Container maxW="container.xl" h="100%" paddingX={0}>
            <Box>
              <Text fontWeight="extrabold" fontSize={["3xl", "5xl"]}>MILESTONES</Text>
            </Box>
            <Flex justifyContent="space-between" marginX={[0, 2]} lineHeight="30px" marginTop={5}>
              <Box textAlign="left">
                <Box>
                  <Text as="b" fontSize={["xl", "3xl"]}>RAISED</Text>
                </Box>
                <Box>
                  <Text as="b" fontSize={["2xl", "4xl"]}>{`$${amount.toLocaleString()}`}</Text>
                </Box>
              </Box>
              <Box textAlign="center">
                <Box>
                  <Text as="b" fontSize={["xl", "3xl"]}>SUPPORTERS</Text>
                </Box>
                <Box>
                  <Text as="b" fontSize={["2xl", "4xl"]}>{givers}</Text>
                </Box>
              </Box>
              <Box textAlign="right">
                <Box>
                  <Text as="b" fontSize={["xl", "3xl"]}>GOAL</Text>
                </Box>
                <Box>
                  <Text as="b" fontSize={["2xl", "4xl"]}>{`$${getTarget(milestones).toLocaleString()}`}</Text>
                </Box>
              </Box>
            </Flex>
            <Center flexDir="column">
              <ProgressBar bgcolor="#7C9AD4" amount={amount} milestones={milestones} target={getTarget(milestones)} />
            </Center>
            <Flex justifyContent="center" marginX="2">
              <Text fontSize={["xl", "3xl"]}>Click/hover on the white circles for milestones info!</Text>
            </Flex>
            <Box marginTop={8}>
              <Text fontWeight="extrabold" fontSize={["3xl", "5xl"]}>NEEDS</Text>
            </Box>
            <Box lineHeight="20px">
              <Text fontSize={["xl", "3xl"]}>Reach a milestone to unlock the next one!</Text>
            </Box>
            <Box borderColor="black" borderWidth={1} marginTop={6} padding={3}>
              {milestones.map((_, i) => {
                const label = getMilestoneLabel(milestones, i);
                const levels = getMilestoneLevels(milestones, amount, i);

                var shouldDisplay = i <= getCurrentMilestoneIndex(milestones, amount) || getCurrentMilestoneIndex(milestones, amount) === -1;

                return (
                  <Box>
                    <Text as="b" fontSize={["xl", "3xl"]} color={shouldDisplay ? "black" : "grey"}>{`MILESTONE ${i+1}: ${label}`}</Text>
                    {shouldDisplay && <MilestoneProgressBar bgcolor="#7C9AD4" achieved={levels.achieved} target={levels.target} />}
                  </Box>
                );
              })}
            </Box>
          </Container>
        </div>
      }
    </Box>
  );
};

export default ProgressSection;
