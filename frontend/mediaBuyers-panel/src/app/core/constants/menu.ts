import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Base',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/chart-pie.svg',
          label: 'Dashboard',
          route: '/dashboard',
          children: [
            { label: 'Nfts', route: '/dashboard/nfts' },
            // { label: 'Podcast', route: '/dashboard/podcast' },
          ],
        },
        // {
        //   icon: 'assets/icons/heroicons/outline/users.svg',
        //   label: 'Members',
        //   route: '/members',
        //   children: [
        //     { label: 'Add Members', route: '/members' },
        //     // { label: 'Members List', route: '/members/list' },

        //   ],
        // },

        {
          icon: 'assets/icons/heroicons/outline/megaphone.svg',
          label: 'Campaigns',
          route: '/campaigns',
          children: [
            { label: 'View Campaigns', route: '/campaigns/list' },
            // { label: 'Members List', route: '/members/list' },

          ],
        },
        // {
        //   icon: 'assets/icons/heroicons/outline/users.svg',
        //   label: 'Ad Sets',
        //   route: '/adSets',
        //   children: [
        //     { label: 'View Ad Sets', route: '/adSets' },
        //     // { label: 'Members List', route: '/members/list' },

        //   ],
        // },
        // {
        //   icon: 'assets/icons/heroicons/outline/users.svg',
        //   label: 'Ads',
        //   route: '/ads',
        //   children: [
        //     { label: 'View ads', route: '/ads' },
        //     // { label: 'Members List', route: '/members/list' },

        //   ],
        // },

        // {
        //   icon: 'assets/icons/heroicons/outline/analytics.svg',
        //   label: 'Reports',
        //   route: '/reports',
        //   children: [
        //     { label: 'Create Report', route: '/reports' },
        //     // { label: 'Members List', route: '/members/list' },

        //   ],
        // },
        // {
        //   icon: 'assets/icons/heroicons/outline/users.svg',
        //   label: 'Clients',
        //   route: '/clients',
        //   children: [
        //     { label: 'Clients', route: '/clients' },
        //     // { label: 'Members List', route: '/members/list' },

        //   ],
        // },

        //

        // {
        //   icon: 'assets/icons/heroicons/outline/lock-closed.svg',
        //   label: 'Auth',
        //   route: '/auth',
        //   children: [
        //     { label: 'Sign up', route: '/auth/sign-up' },
        //     { label: 'Sign in', route: '/auth/sign-in' },
        //     { label: 'Forgot Password', route: '/auth/forgot-password' },
        //     { label: 'New Password', route: '/auth/new-password' },
        //     { label: 'Two Steps', route: '/auth/two-steps' },
        //   ],
        // },
        // {
        //   icon: 'assets/icons/heroicons/outline/exclamation-triangle.svg',
        //   label: 'Errors',
        //   route: '/errors',
        //   children: [
        //     { label: '404', route: '/errors/404' },
        //     { label: '500', route: '/errors/500' },
        //   ],
        // },
        // {
        //   icon: 'assets/icons/heroicons/outline/cube.svg',
        //   label: 'Components',
        //   route: '/components',
        //   children: [
        //     { label: 'Table', route: '/components/table' },


        // ],

        // },
      ],
    },
    // {
    //   group: 'Collaboration',
    //   separator: true,
    //   items: [
    //     {
    //       icon: 'assets/icons/heroicons/outline/download.svg',
    //       label: 'Download',
    //       route: '/download',
    //     },
    //     {
    //       icon: 'assets/icons/heroicons/outline/gift.svg',
    //       label: 'Gift Card',
    //       route: '/gift',
    //     },
    //     {
    //       icon: 'assets/icons/heroicons/outline/users.svg',
    //       label: 'Users',
    //       route: '/users',
    //     },
    //   ],
    // },

    {
      group: '',
      separator: false,
      items: [
        // {
        //   icon: 'assets/icons/heroicons/outline/cog.svg',
        //   label: 'Settings',
        //   route: '/settings',
        // },
        // {
        //   icon: 'assets/icons/heroicons/outline/bell.svg',
        //   label: 'Notifications',
        //   route: '/gift',
        // },
        // {
        //   icon: 'assets/icons/heroicons/outline/folder.svg',
        //   label: 'Folders',
        //   route: '/folders',
        //   children: [
        //     { label: 'Current Files', route: '/folders/current-files' },
        //     { label: 'Downloads', route: '/folders/download' },
        //     { label: 'Trash', route: '/folders/trash' },
        //   ],
        // },

        {
          icon: 'assets/icons/heroicons/outline/logout.svg',
          label: 'Logout',
          route: '/auth/team/sign-in', // Replace with your actual logout route

        },
      ],
    },
  ];
}
