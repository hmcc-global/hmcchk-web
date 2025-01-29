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
        variant="outline"
        width={['100%', '25%']}
        style={{
          whiteSpace: 'normal',
          wordWrap: 'break-word',
        }}
        align="center"
        as="a"
        href="https://bit.ly/hmcc-prayer"
        target="_blank"
        borderColor="#4A6EEB"
        border="1px solid var(--Blue-Primary, #4A6EEB)"
        borderRadius="15px"
        bgColor="transparent"
        fontSize="0.8rem"
        letterSpacing="0.185rem"
        fontWeight="700"
        height="2.813rem"
      >
        NEED PRAYER?
      </Button>
      <Button
        width={['100%', '25%']}
        as="a"
        href="/sermons"
        target="_blank"
        id="past-sermons"
        borderColor="#4A6EEB"
        border="1px solid var(--Blue-Primary, #4A6EEB)"
        borderRadius="15px"
        bgColor="transparent"
        fontSize="0.8rem"
        letterSpacing="0.185rem"
        fontWeight="700"
        height="2.813rem"
      >
        PAST SERMONS
      </Button>
      <Button
        width={['100%', '25%']}
        as="a"
        href="/events"
        target="_blank"
        isTruncated
        id="online-events"
        borderColor="#4A6EEB"
        border="1px solid var(--Blue-Primary, #4A6EEB)"
        borderRadius="15px"
        bgColor="transparent"
        fontSize="0.8rem"
        letterSpacing="0.185rem"
        fontWeight="700"
        height="2.813rem"
      >
        UPCOMING EVENTS
      </Button>
      <Button
        width={['100%', '25%']}
        as="a"
        href="/give"
        target="_blank"
        id="online-give"
        borderColor="#4A6EEB"
        border="1px solid var(--Blue-Primary, #4A6EEB)"
        borderRadius="15px"
        bgColor="transparent"
        fontSize="0.8rem"
        letterSpacing="0.185rem"
        fontWeight="700"
        height="2.813rem"
      >
        GIVING
      </Button>
    </Stack>
  );
};

export default OnlinePageButtons;
