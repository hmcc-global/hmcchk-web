import { useState, useEffect, useCallback } from 'react';
import { customAxios as axios } from 'utils/customAxios';
import {
  Container,
  Heading,
  Box,
  Text,
  Button,
  Stack,
  HStack,
  Badge,
  Divider,
  List,
  ListItem,
  Flex,
  Spacer,
  Spinner,
  useToast,
} from 'components';
import SiteLinkTargetEditorModal from './SiteLinkTargetEditorModal';
import { classifyTargets, nowIsoHk } from 'utils/siteLinks';

const AdminSiteLinksContainer = () => {
  const toast = useToast();
  const [siteLinks, setSiteLinks] = useState([]);
  const [forms, setForms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(null);
  const [activeTarget, setActiveTarget] = useState(null);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [linksRes, formsRes] = await Promise.all([
        axios.get('/api/site-links/admin-get'),
        axios.get('/api/forms/admin-get-form'),
      ]);
      setSiteLinks(linksRes.data || []);
      setForms((formsRes.data || []).filter((form) => !form.isDeleted));
    } catch (err) {
      console.log(err);
      toast({
        description:
          'There was an issue loading site links. Please contact t3ch support.',
        status: 'error',
        duration: 8000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const formName = (formId) => {
    const form = forms.find((item) => item.id === formId);
    return form ? form.formName : formId;
  };

  const describeDestination = (target) => {
    if (target.destinationType === 'url') return target.destinationUrl;
    return `Form: ${formName(target.formId)}`;
  };

  const describeSchedule = (target) => {
    const from = target.activeFrom || 'always';
    const until = target.activeUntil || 'open-ended';
    return `${from} → ${until}`;
  };

  const onAddTarget = (link) => {
    setActiveLink(link);
    setActiveTarget(null);
    setIsEditorOpen(true);
  };

  const onEditTarget = (link, target) => {
    setActiveLink(link);
    setActiveTarget(target);
    setIsEditorOpen(true);
  };

  const onSaved = async () => {
    setIsEditorOpen(false);
    await loadData();
  };

  const onDisableTarget = async (target) => {
    if (!window.confirm('Disable this target?')) return;
    try {
      await axios.put('/api/site-links/update-target', {
        id: target.id,
        isDeleted: true,
      });
      toast({
        description: 'Target disabled',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      await loadData();
    } catch (err) {
      console.log(err);
      toast({
        description: 'Could not disable the target',
        status: 'error',
        duration: 8000,
        isClosable: true,
      });
    }
  };

  const onToggleLink = async (link) => {
    try {
      await axios.put('/api/site-links/update', {
        id: link.id,
        isEnabled: !link.isEnabled,
      });
      await loadData();
    } catch (err) {
      console.log(err);
      toast({
        description: 'Could not update the site link',
        status: 'error',
        duration: 8000,
        isClosable: true,
      });
    }
  };

  const onCopyPath = async (slug) => {
    const url = `${window.location.origin}/go/${slug}`;
    try {
      await navigator.clipboard.writeText(url);
      toast({
        description: `Copied ${url}`,
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
      toast({
        description: `Could not copy automatically. The link is ${url}`,
        status: 'warning',
        duration: 6000,
        isClosable: true,
      });
    }
  };

  const renderTarget = (link, target, tone) => (
    <ListItem key={target.id}>
      <Flex
        direction={['column', 'row']}
        p={3}
        borderWidth="1px"
        borderRadius="md"
        align={['stretch', 'center']}
      >
        <Box>
          <HStack spacing={2} mb={1}>
            <Badge colorScheme={tone}>
              {target.destinationType === 'url' ? 'URL' : 'Form'}
            </Badge>
            <Text fontWeight="700" wordBreak="break-all">
              {describeDestination(target)}
            </Text>
          </HStack>
          <Text fontSize="sm" color="gray.600">
            Schedule: {describeSchedule(target)}
          </Text>
          <Text fontSize="sm" color="gray.500">
            Last updated by {target.updatedBy || '—'}
            {target.updatedAt
              ? ` on ${new Date(target.updatedAt).toLocaleString()}`
              : ''}
          </Text>
        </Box>
        <Spacer />
        <HStack pt={[2, 0]} spacing={2}>
          <Button
            size="sm"
            colorScheme="blue"
            onClick={() => onEditTarget(link, target)}
          >
            Edit
          </Button>
          <Button
            size="sm"
            colorScheme="red"
            onClick={() => onDisableTarget(target)}
          >
            Disable
          </Button>
        </HStack>
      </Flex>
    </ListItem>
  );

  const renderLink = (link) => {
    const { current, upcoming, past } = classifyTargets(
      link.targets,
      nowIsoHk()
    );
    return (
      <Box key={link.id} p={4} borderWidth="1px" borderRadius="lg" mb={5}>
        <Flex direction={['column', 'row']} align={['stretch', 'center']}>
          <Box>
            <HStack spacing={2}>
              <Heading size="md">{link.label}</Heading>
              <Badge colorScheme={link.isEnabled ? 'green' : 'gray'}>
                {link.isEnabled ? 'Enabled' : 'Disabled'}
              </Badge>
            </HStack>
            <Text fontFamily="monospace" color="gray.700">
              /go/{link.slug}
            </Text>
          </Box>
          <Spacer />
          <HStack pt={[2, 0]} spacing={2}>
            <Button size="sm" onClick={() => onCopyPath(link.slug)}>
              Copy link
            </Button>
            <Button
              size="sm"
              as="a"
              href={`/go/${link.slug}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Test
            </Button>
            <Button size="sm" onClick={() => onToggleLink(link)}>
              {link.isEnabled ? 'Disable' : 'Enable'}
            </Button>
            <Button
              size="sm"
              colorScheme="blue"
              onClick={() => onAddTarget(link)}
            >
              Add target
            </Button>
          </HStack>
        </Flex>

        <Divider my={3} />

        <Text fontWeight="700">Current</Text>
        <List spacing={2} mt={1} mb={3}>
          {current.length > 0 ? (
            current.map((target) => renderTarget(link, target, 'green'))
          ) : (
            <Text fontSize="sm" color="gray.500">
              No active target — /go/{link.slug} shows the unavailable page.
            </Text>
          )}
        </List>

        {upcoming.length > 0 && (
          <>
            <Text fontWeight="700">Upcoming</Text>
            <List spacing={2} mt={1} mb={3}>
              {upcoming.map((target) => renderTarget(link, target, 'purple'))}
            </List>
          </>
        )}

        {past.length > 0 && (
          <>
            <Text fontWeight="700">Past</Text>
            <List spacing={2} mt={1}>
              {past.map((target) => renderTarget(link, target, 'gray'))}
            </List>
          </>
        )}
      </Box>
    );
  };

  return (
    <Container maxW="container.xl">
      <Heading as="h1" size="xl" pb={2}>
        Site Links
      </Heading>
      <Text color="gray.600" mb={5}>
        Manage permanent redirect paths (e.g. /go/life-group) and schedule which
        destination each one points to — no code deploy needed.
      </Text>

      {isLoading ? (
        <Stack align="center" py={10}>
          <Spinner />
        </Stack>
      ) : siteLinks.length === 0 ? (
        <Text color="gray.500">No site links yet.</Text>
      ) : (
        siteLinks.map((link) => renderLink(link))
      )}

      <SiteLinkTargetEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        siteLink={activeLink}
        target={activeTarget}
        forms={forms}
        onSaved={onSaved}
      />
    </Container>
  );
};

export default AdminSiteLinksContainer;
