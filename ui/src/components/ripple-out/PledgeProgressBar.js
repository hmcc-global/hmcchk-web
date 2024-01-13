import { Box, Text } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

const PledgeProgressBar = (props) => {
  const { bgcolor, target, achieved } = props;
  var completed = (achieved / target) * 100;
  completed = Math.min(completed, 100);

  const containerStyles = {
    width: '100%',
    backgroundColor: '#BEC7DA',
    borderRadius: 50,
    position: 'relative',
    overflow: 'hidden',
  };

  const dotStyle = {
    borderRadius: '50%',
    display: 'flex',
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

  const dotContainerStyle = {
    position: 'absolute',
    textAlign: 'right',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  };

  const getLabel = (completed) => {
    if (completed === 100) {
      return `ALL PLEDGES FULFILLED`;
    } else {
      return `${completed.toFixed(0)}%`;
    }
  };

  return (
    <Box style={containerStyles} height={['30px', '40px']} marginY={[3, 2]}>
      <div style={fillerStyles}>
        <div style={dotContainerStyle}>
          <Text as="b" marginRight={3} fontSize={['large', '2xl']}>
            {getLabel(completed)}
          </Text>
          {completed === 100 && (
            <Box
              style={dotStyle}
              height={['30px', '40px']}
              width={['30px', '40px']}
            >
              <CheckIcon />
            </Box>
          )}
        </div>
      </div>
    </Box>
  );
};

export default PledgeProgressBar;
