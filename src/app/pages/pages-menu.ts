import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'grid-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Manage Users',
    icon: 'people-outline',
    link: '/pages/users',
  },
  {
    title: 'Manage Products',
    icon: 'people-outline',
    link: '/pages/products',
  },
  {
    title: 'Generate Reports',
    icon: 'people-outline',
    link: '/pages/generateReports',
  },
  {
    title: 'Compliance',
    icon: 'people-outline',
    link: '/pages/compliance',
  },
  {
    title: 'Policy',
    icon: 'file-text-outline',
    link: '/pages/policy',
  },
  {
    title: 'Due Diligence',
    icon: 'calendar-outline',
    link: '/pages/dueDiligence',
  },
  {
    title: 'Due Care',
    icon: 'person-done-outline',
    link: '/pages/dueCare',
  },
  {
    title: 'Alarms',
    icon: 'bell-outline',
    link: '/pages/alarms',
  }
];
