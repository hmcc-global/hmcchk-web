import { expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { ChakraProvider } from 'components';
import theme from 'theme';
import AdminAnnouncementCard from './AdminAnnouncementCard';

const fixture = {
  id: '42',
  title: 'Youth Camp 2026',
  description: 'A weekend away with workshops and worship.',
  imageAdUrl: 'https://example.com/img.png',
  isInWeb: true,
  isInPpt: false,
  isPublished: true,
  featured: true,
  eventStartDate: '2026-10-01',
  eventStartTime: '18:00',
  eventEndTime: '20:00',
  displayStartDateTime: '2026-09-01T00:00:00',
  displayEndDateTime: '2026-10-01T00:00:00',
  submittedBy: 'Alice',
  lastUpdatedBy: 'Bob',
  location: 'Church Hall',
};

const mountCard = (overrides = {}) => {
  const handlers = {
    onEdit: vi.fn(),
    onDuplicate: vi.fn(),
    onPublish: vi.fn(),
    onDelete: vi.fn(),
  };
  render(
    <ChakraProvider theme={theme}>
      <AdminAnnouncementCard
        item={fixture}
        busy={false}
        canCreate
        canPublish
        createDisabledReason={null}
        publishDisabledReason={null}
        {...handlers}
        {...overrides}
      />
    </ChakraProvider>
  );
  return handlers;
};

test('renders the public card plus the admin rail', () => {
  mountCard();
  expect(screen.getByText('Youth Camp 2026')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Unpublish' })).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: 'More actions for Youth Camp 2026' })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: 'View details' })
  ).toBeInTheDocument();
  expect(screen.getByText(/Visible:/)).toBeInTheDocument();
  expect(screen.getByText('Submitter:')).toBeInTheDocument();
  expect(screen.getByText('Alice')).toBeInTheDocument();
  expect(screen.getByText('Last updated by:')).toBeInTheDocument();
  expect(screen.getByText('Bob')).toBeInTheDocument();
});

test('forwards the item id through the action handlers', () => {
  const handlers = mountCard();
  fireEvent.click(screen.getByRole('button', { name: 'Edit' }));
  expect(handlers.onEdit).toHaveBeenCalledWith('42');
});
