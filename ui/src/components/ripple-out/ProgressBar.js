import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Box, Text } from '@chakra-ui/react';

const ProgressBar = (props) => {
  const { bgcolor, amount, milestones, target } = props;
  var completed = (amount / target) * 100;
  completed = Math.min(completed, 100);

  const containerStyles = {
    width: '100%',
    backgroundColor: "#BEC7DA",
    borderRadius: 50,
    margin: 10,
    position: "relative",
    overflow: "hidden",
  };

  const dotStyle = {
    backgroundColor: "white",
    borderRadius: "50%",
    display: "inline-block",
    boxShadow: "0 5px 2px -2px gray",
  };

  const fillerStyles = {
    position: "absolute",
    height: '100%',
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: 'inherit',
    textAlign: 'right',
    transition: 'width 1s ease-in-out',
  };

  const reversedMilestones = [...milestones].slice(0, -1).reverse();

  return (
    <Box style={containerStyles} height={[50, 100]}>
      <div style={fillerStyles} />
      {reversedMilestones.map((milestone) => {
          const percentage = (milestone.milestoneAmount / target) * 100;

          const dotContainerStyle = {
            position: "absolute",
            textAlign: 'right',
            width: `${percentage}%`,
            height: '100%',
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          };
        return (
          <div style={dotContainerStyle}>
            <Tippy content={
              <Box textAlign="center" borderRadius={30}>
                <Box>
                  {`$${Number(milestone.milestoneAmount).toLocaleString()}`}
                </Box>
                <Box>
                  {milestone.milestoneName}
                </Box>
              </Box>
            }
            placement="bottom"
            >
              <Box style={dotStyle} height={["20px", "30px"]} width={["20px", "30px"]} />
            </Tippy>
          </div>
        )
      })}
    </Box>
  );
};

export default ProgressBar;
