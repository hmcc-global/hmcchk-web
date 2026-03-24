import { Button, Stack } from '@chakra-ui/react';

const OnlinePageButtons = () => {
  return (
    <Stack
      direction={['column', 'row']}
      display={{ base: 'none', sm: 'flex' }}
      textColor="#0C0C20"
      fontFamily="Manrope"
      my="5"
    >
      <Button
        width={['100%', '25%']}
        style={{
          whiteSpace: 'normal',
          wordWrap: 'break-word',
        }}
        align="center"
        borderColor="#4A6EEB"
        border="1px solid var(--Blue-Primary, #4A6EEB)"
        borderRadius="15px"
        variant="ghost"
        fontSize="0.8rem"
        letterSpacing="0.185rem"
        fontWeight="700"
        height="2.813rem"
        _hover={{ bgColor: '#DFE7FF' }}
        asChild><a href="https://bit.ly/hmcc-prayer" target="_blank">NEED PRAYER?
              </a></Button>
      <Button
        width={['100%', '25%']}
        id="online-give"
        borderColor="#4A6EEB"
        border="1px solid var(--Blue-Primary, #4A6EEB)"
        borderRadius="15px"
        variant="ghost"
        fontSize="0.8rem"
        letterSpacing="0.185rem"
        fontWeight="700"
        height="2.813rem"
        _hover={{ bgColor: '#DFE7FF' }}
        asChild><a href="/give" target="_blank">GIVING
              </a></Button>
      <Button
        width={['100%', '25%']}
        lineClamp={1}
        wordBreak="break-all"
        id="online-events"
        borderColor="#4A6EEB"
        border="1px solid var(--Blue-Primary, #4A6EEB)"
        borderRadius="15px"
        variant="ghost"
        fontSize="0.8rem"
        letterSpacing="0.185rem"
        fontWeight="700"
        height="2.813rem"
        _hover={{ bgColor: '#DFE7FF' }}
        asChild><a href="/events" target="_blank">UPCOMING EVENTS
              </a></Button>
      <Button
        width={['100%', '25%']}
        id="past-sermons"
        borderColor="#4A6EEB"
        border="1px solid var(--Blue-Primary, #4A6EEB)"
        borderRadius="15px"
        variant="ghost"
        fontSize="0.8rem"
        letterSpacing="0.185rem"
        fontWeight="700"
        height="2.813rem"
        _hover={{ bgColor: '#DFE7FF' }}
        asChild><a href="/sermons" target="_blank">PAST SERMONS
              </a></Button>
    </Stack>
  );
};

export default OnlinePageButtons;
