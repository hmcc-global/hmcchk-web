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
  overlay: 'rgba(20, 23, 28, 0.28)',
};

export const adminFocusRing = {
  '&:focus': {
    outline: 'none',
    boxShadow: 'none',
  },
  '&:focus-visible': {
    outline: `2px solid ${adminShellColors.blue}`,
    outlineOffset: '2px',
  },
};

export const suppressAdminMouseFocus = (event) => {
  event.preventDefault();
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
        job: 'Manage announcements on the website and in the presiding PPT',
      },
      {
        id: 'forms',
        name: 'Forms',
        path: '/admin/forms',
        icon: FiFileText,
        job: 'Create forms for people to sign up and get involved',
      },
      {
        id: 'live-sermon',
        name: 'Live sermon',
        path: '/admin/liveSermon',
        icon: FiMonitor,
        job: 'Manage the livestream page for the current service',
      },
      {
        id: 'popup',
        name: 'Pop up',
        path: '/admin/popup',
        icon: FiBell,
        job: 'Show a reminder or message when people open the website',
      },
      {
        id: 'sermon-notes',
        name: 'Sermon notes',
        path: '/admin/sermonNotes',
        icon: LuFilePen,
        job: 'Write notes people can follow during a service',
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
      },
      {
        id: 'leadership',
        name: 'Leadership teams',
        path: '/admin/leadership-team',
        icon: FiShield,
      },
      {
        id: 'users',
        name: 'Users',
        path: '/admin/users',
        icon: FiUsers,
      },
    ],
  },
  {
    label: 'Campaigns',
    items: [
      {
        id: 'fundraise',
        name: 'Fundraise',
        path: '/admin/fundraise',
        icon: FiDollarSign,
      },
      {
        id: 'testimony',
        name: 'Testimony',
        path: '/admin/testimony',
        icon: FiFeather,
      },
    ],
  },
];

export const isAdminNavItemActive = (pathname, path) => {
  if (typeof pathname !== 'string' || typeof path !== 'string') return false;
  if (path === '/admin/home') {
    return (
      pathname === '/admin' ||
      pathname === '/admin/' ||
      pathname === '/admin/home' ||
      pathname === '/admin/home/'
    );
  }
  return pathname === path || pathname.startsWith(`${path}/`);
};
