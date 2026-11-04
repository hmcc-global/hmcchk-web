import {
  FiAlertCircle,
  FiBell,
  FiDollarSign,
  FiFeather,
  FiFileText,
  FiHome,
  FiMonitor,
  FiShield,
  FiUsers,
  FiVolume2,
} from 'react-icons/fi';
import { LuFilePen } from 'react-icons/lu';

export const ADMIN_FONT = 'Manrope, sans-serif';

export const adminShellColors = {
  ink: '#14171c',
  muted: '#3e4a5c',
  line: '#e3e6ec',
  wash: '#f4f6f8',
  page: '#f5f9ff',
  blue: '#17356b',
  blueLight: '#24508f',
  blueSoft: '#e7eef8',
  cardHover: '#d4e3f6',
  paper: '#ffffff',
  shadow: '0 8px 24px rgba(20, 23, 28, 0.08)',
};

export const adminNavGroups = [
  {
    label: 'Start',
    items: [
      {
        id: 'home',
        name: 'Home',
        path: '/admin/home',
        icon: FiHome,
      },
    ],
  },
  {
    label: 'On the website',
    items: [
      {
        id: 'announcements',
        name: 'Announcements',
        path: '/admin/announcements',
        icon: FiVolume2,
        job: 'Put an announcement on the website or in the Sunday slides.',
      },
      {
        id: 'popup',
        name: 'Pop up',
        path: '/admin/popup',
        icon: FiBell,
        job: 'Show a short message over the website.',
      },
      {
        id: 'live-sermon',
        name: 'Live sermon',
        path: '/admin/liveSermon',
        icon: FiMonitor,
        job: 'Point people to the service that is on now.',
      },
      {
        id: 'sermon-notes',
        name: 'Sermon notes',
        path: '/admin/sermonNotes',
        icon: LuFilePen,
        job: 'Update the notes for a Sunday message.',
      },
      {
        id: 'forms',
        name: 'Forms',
        path: '/admin/forms',
        icon: FiFileText,
        job: 'See who signed up.',
      },
    ],
  },
  {
    label: 'People',
    items: [
      {
        id: 'follow-up',
        name: 'Follow up',
        path: '/admin/followUp',
        icon: FiAlertCircle,
        job: 'See who needs a reply.',
      },
      {
        id: 'users',
        name: 'Users',
        path: '/admin/users',
        icon: FiUsers,
        job: 'Look up a person and their role.',
      },
      {
        id: 'leadership',
        name: 'Leadership teams',
        path: '/admin/leadership-team',
        icon: FiShield,
        job: 'Update who is on a team.',
      },
    ],
  },
  {
    label: 'Giving and stories',
    items: [
      {
        id: 'fundraise',
        name: 'Fundraise',
        path: '/admin/fundraise',
        icon: FiDollarSign,
        job: 'Share a giving goal.',
      },
      {
        id: 'testimony',
        name: 'Testimony',
        path: '/admin/testimony',
        icon: FiFeather,
        job: 'Add a story from the church.',
      },
    ],
  },
];

export const isAdminNavItemActive = (pathname, path) => {
  if (typeof pathname !== 'string' || typeof path !== 'string') return false;
  if (path === '/admin/home') {
    return pathname === '/admin' || pathname === '/admin/home';
  }
  return pathname === path || pathname.startsWith(`${path}/`);
};
