import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Box, Text } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

const ProgressBar = (props) => {
  const {
    bgcolor,
    height,
    fontSize,
    completeLabel,
    showCheck,
    amount,
    milestones,
    target,
  } = props;
  let completed = (amount / target) * 100;
  completed = Math.min(completed, 100);

  const containerStyles = {
    width: '100%',
    backgroundColor: '#BEC7DA',
    borderRadius: 50,
    margin: 10,
    position: 'relative',
    overflow: 'hidden',
  };

  const dotStyle = {
    backgroundColor: 'white',
    borderRadius: '50%',
    display: 'inline-block',
    boxShadow: '0 5px 2px -2px gray',
  };

  const checkStyle = {
    borderRadius: '50%',
    display: showCheck ? 'flex' : 'none',
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  };

  const percentageStyle = {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: '0px',
  };

  const fillerStyles = {
    position: 'absolute',
    height: '100%',
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: 'inherit',
    textAlign: 'right',
    transition: 'width 1s ease-in-out',
  };

  const getLabel = (completed) => {
    if (completed === 100) {
      return (
        <>
          <Text
            as="b"
            mr={milestones ? [5, 10] : 2}
            fontSize={fontSize ? fontSize : ['lg', '3xl']}
          >
            {completeLabel ?? '100%'}
          </Text>
          <Box
            style={checkStyle}
            height={height ? height : [25, 50]}
            width={height ? height : [25, 50]}
          >
            <CheckIcon />
          </Box>
        </>
      );
    } else {
      return (
        <Text as="b" mr={2} fontSize={fontSize ? fontSize : ['lg', '3xl']}>
          {completed.toFixed(0)}%
        </Text>
      );
    }
  };

  const reversedMilestones = milestones
    ? [...milestones].slice(0, -1).reverse()
    : [];

  return (
    <Box style={containerStyles} height={height ? height : [50, 100]}>
      <div style={fillerStyles}>
        <Box style={percentageStyle} mr={[1, 3]}>
          {getLabel(completed)}
        </Box>
      </div>
      {reversedMilestones.map((milestone) => {
        const percentage = (milestone.milestoneAmount / target) * 100;

        const dotContainerStyle = {
          position: 'absolute',
          textAlign: 'right',
          width: `${percentage}%`,
          height: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        };
        return (
          <div style={dotContainerStyle}>
            {/* milestone dots */}
            <Tippy
              content={
                <Box textAlign="center" borderRadius={30}>
                  <Box>
                    {`$${Number(milestone.milestoneAmount).toLocaleString()}`}
                  </Box>
                  <Box>{milestone.milestoneName}</Box>
                </Box>
              }
              placement="bottom"
            >
              <Box
                style={dotStyle}
                height={['20px', '30px']}
                width={['20px', '30px']}
              />
            </Tippy>
          </div>
        );
      })}
    </Box>
  );
};

export default ProgressBar;
