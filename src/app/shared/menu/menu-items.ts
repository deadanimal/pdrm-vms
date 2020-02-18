export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    isCollapsed?: boolean;
    isCollapsing?: any;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    type?: string;
    collapse?: string;
    children?: ChildrenItems2[];
    isCollapsed?: boolean;
}
export interface ChildrenItems2 {
    path?: string;
    title?: string;
    type?: string;
}
//Menu Items
export const ROUTES: RouteInfo[] = [
  {
    path: '/admin/dashboard',
    title: 'Dashboard',
    type: 'link',
    icontype: 'fas fa-desktop text-warning'
  },
  {
    path: '/admin/analytics',
    title: 'Analytics',
    type: 'link',
    icontype: 'far fa-chart-bar text-blue'
  },
  {
    path: '/admin/vessel',
    title: 'Vessel',
    type: 'link',
    icontype: 'fas fa-ship text-green'
  },
  {
    path: '/admin/maintenance',
    title: 'Maintenance',
    type: 'link',
    icontype: 'fas fa-toolbox text-yellow'
  },
  {
    path: '/admin/management',
    title: 'Management',
    type: 'link',
    icontype: 'fas fa-cogs text-purple'
  },
  {
    path: '/admin/bda',
    title: 'BDA',
    type: 'link',
    icontype: 'fas fa-chart-pie text-red'
  }
];

/*
{
  path: '',
  title: '',
  type: 'link',
  icontype: ''
}
*/