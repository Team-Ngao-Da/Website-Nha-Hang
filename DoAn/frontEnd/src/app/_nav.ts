interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
  },
  {
    name: 'Account',
    url: '/account',
    icon: 'icon-list',
    children: [
      {
        name: 'User',
        url: '/account/user',
        icon: 'icon-user'
      },
      {
        name: 'Employee',
        url: '/account/employee',
        icon: 'icon-user'
      }

    ]
  },
  {
    name: 'Bill',
    url: '/bill',
    icon: 'icon-user'
  },
  {
    name: 'Bill Details',
    url: '/bill-details',
    icon: 'icon-user'
  },
  {
    name: 'Table detail',
    url: '/table-detail',
    icon: 'icon-user'
  },
  {
  name: 'Menu',
  url: '/menu',
  icon: 'icon-list',
  children: [
    {
      name: 'MenuItem',
      url: '/menu/menu-item',
      icon: 'icon-user'
    },
    {
      name: 'Menu Type',
      url: '/menu/menu-type',
      icon: 'icon-user'
    },

  ],
  },
  {
  name: 'Material',
  url: '/material',
  icon: 'icon-list',
  children: [
    {
      name: 'Material Item',
      url: '/material/material-item',
      icon: 'icon-user'
    },
    {
      name: 'materialType',
      url: '/material/material-type',
      icon: 'icon-user'
    },

  ],
  }
];
