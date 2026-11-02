import { Box, Flex, Heading, Icon, Link, Text } from 'components';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { DateTime } from 'luxon';
import { customAxios as axios } from 'utils/customAxios';
import {
  ADMIN_FONT,
  adminNavGroups,
  adminShellColors,
} from './navigation/adminNav';

const isShowingNow = (item, now) => {
  if (!item || typeof item !== 'object') return false;
  if (item.displayEndDateTime) {
    const end = DateTime.fromISO(String(item.displayEndDateTime));
    return end.isValid && end > now;
  }
  if (item.eventEndDate) {
    const end = DateTime.fromISO(String(item.eventEndDate));
    return end.isValid && end > now;
  }
  if (item.eventStartDate && !item.eventEndDate) {
    const start = DateTime.fromISO(String(item.eventStartDate));
    return start.isValid && start < now;
  }
  return true;
};

const focusRing = {
  '&:focus-visible': {
    outline: `2px solid ${adminShellColors.blue}`,
    outlineOffset: '2px',
  },
};

const ToolTile = (props) => {
  const { icon } = props;
  return (
    <Flex
      align="center"
      justify="center"
      flex="none"
      w="40px"
      h="40px"
      borderRadius="8px"
      bg={adminShellColors.blueSoft}
      color={adminShellColors.blue}
    >
      {icon && <Icon as={icon} boxSize="20px" aria-hidden />}
    </Flex>
  );
};

const homeGroups = adminNavGroups
  .map((group) => ({
    ...group,
    items: (Array.isArray(group.items) ? group.items : []).filter(
      (item) => item.id !== 'home' && item.job
    ),
  }))
  .filter((group) => group.items.length > 0);

const AdminHome = () => {
  const [announcementCount, setAnnouncementCount] = useState(null);

  useEffect(() => {
    let isCurrent = true;

    const loadAnnouncementCount = async () => {
      try {
        const { data, status } = await axios.get('/api/announcement/admin-get');
        if (!isCurrent || status !== 200 || !Array.isArray(data)) return;
        const showingNow = data.filter((item) =>
          isShowingNow(item, DateTime.now())
        );
        if (!showingNow.length) return;
        const liveCount = showingNow.filter(
          (item) => item?.isInWeb === true && item?.isPublished === true
        ).length;
        setAnnouncementCount({
          live: liveCount,
          notLive: showingNow.length - liveCount,
        });
      } catch (err) {
        console.log(err);
      }
    };

    loadAnnouncementCount();
    return () => {
      isCurrent = false;
    };
  }, []);

  return (
    <Box fontFamily={ADMIN_FONT} color={adminShellColors.ink}>
      <Heading
        as="h1"
        fontFamily={ADMIN_FONT}
        fontSize={{ base: '22px', xl: '26px' }}
        fontWeight="600"
        letterSpacing="-0.03em"
        lineHeight="1.2"
      >
        Home
      </Heading>
      <Text
        mt="6px"
        maxW="62ch"
        fontFamily={ADMIN_FONT}
        fontSize="14px"
        fontWeight="500"
        color={adminShellColors.muted}
      >
        The tools for updating what the church shows online.
      </Text>
      <Box
        mt="28px"
        sx={{ containerType: 'inline-size', containerName: 'home' }}
      >
        <Box
          display="flex"
          flexDirection="column"
          gap="28px"
          sx={{
            '@container home (min-width: 840px)': {
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
              columnGap: '16px',
              rowGap: '28px',
              alignItems: 'start',
            },
          }}
        >
          {homeGroups.map((group) => (
            <Box key={group.label}>
              <Text
                as="h2"
                mb="10px"
                fontFamily={ADMIN_FONT}
                fontSize="13px"
                fontWeight="700"
              >
                {group.label}
              </Text>
              <Box
                display="flex"
                flexDirection="column"
                gap="10px"
                maxW="720px"
              >
                {group.items.map((item) => (
                  <Link
                    key={item.path}
                    as={RouterLink}
                    to={item.path}
                    display="flex"
                    alignItems="flex-start"
                    gap="14px"
                    w="100%"
                    p="14px"
                    borderRadius="12px"
                    bg={adminShellColors.paper}
                    textDecoration="none"
                    _hover={{
                      textDecoration: 'none',
                      bg: adminShellColors.cardHover,
                    }}
                    sx={focusRing}
                  >
                    <ToolTile icon={item.icon} />
                    <Box minW="0">
                      <Text
                        as="span"
                        display="block"
                        fontFamily={ADMIN_FONT}
                        fontSize="16px"
                        fontWeight="600"
                        letterSpacing="-0.02em"
                        lineHeight="1.4"
                        color={adminShellColors.ink}
                      >
                        {item.name}
                      </Text>
                      <Text
                        mt="2px"
                        fontFamily={ADMIN_FONT}
                        fontSize="14px"
                        fontWeight="500"
                        color={adminShellColors.muted}
                      >
                        {item.job}
                      </Text>
                      {item.id === 'announcements' && announcementCount && (
                        <Text
                          mt="2px"
                          fontFamily={ADMIN_FONT}
                          fontSize="14px"
                          fontWeight="600"
                          color={adminShellColors.blueLight}
                        >
                          {announcementCount.live} live on the website ·{' '}
                          {announcementCount.notLive} not live
                        </Text>
                      )}
                    </Box>
                  </Link>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminHome;
