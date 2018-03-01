module.exports = [
  {
    name: 'Home',
    icon: 'fa fa-fw fa-home',
    href: '/admin',
    children: [
      {
        name: 'Dashboard',
        href: '/admin',
        icon: 'fa fa-fw fa-tachometer'
      },
      {
        name: 'My Accounts',
        href: '',
        icon: 'fa fa-fw fa-shield',
        children: [
          {
            name: 'Accounts',
            href: '/admin/my-accounts/accounts',
            icon: 'fa fa-fw fa-circle-o'
          },
          {
            name: 'Transfer',
            href: '/admin/my-accounts/transfer',
            icon: 'fa fa-fw fa-circle-o'
          }
        ]
      },
      {
        name: 'Profile',
        href: '/admin/dashboard/',
        icon: 'fa fa-fw fa-circle-o'
      },
      {
        name: 'Timeline',
        href: '/admin/dashboard/',
        icon: 'fa fa-fw fa-clock-o'
      },
      {
        name: 'Email',
        href: '/admin/dashboard/',
        icon: 'fa fa-fw fa-envelope-o'
      },
      {
        name: 'Messenger',
        href: '/admin/messenger/',
        icon: 'fa fa-fw fa-comment-o'
      },
      {
        name: 'My Blog',
        href: '/admin/dashboard/',
        icon: 'fa fa-fw fa-bookmark'
      },
      {
        name: 'Coin Sale',
        href: '/admin/coinsale',
        icon: 'fa fa-fw fa-bitcoin'
      },
      {
        name: 'Admin SignUp',
        href: '#!admin-signup',
        icon: 'fa fa-fw fa-user'
      },
      {
        name: 'Wallets Page',
        href: '/admin/wallets',
        icon: 'fa fa-fw fa-credit-card'
      },
      {
        name: 'Distribution SignUp',
        href: '/admin/distribution-signup',
        icon: 'fa fa-fw fa-user'
      }
    ]
  },
  {
    name: 'Community',
    icon: 'fa fa-fw fa-compass',
    href: '',
    children: [
      {
        name: 'Home',
        icon: 'fa fa-fw fa-dashboard',
        href: '/admin/community'
      },
      {
        name: 'News',
        href: '',
        icon: 'fa fa-fw fa-shield'
      },
      {
        name: 'Events',
        href: '',
        icon: 'fa fa-fw fa-calendar'
      },
      {
        name: 'Bulletin Board',
        href: '',
        icon: 'fa fa-thumb-tack'
      },
      {
        name: 'Groups',
        href: '/admin/community/groups',
        icon: 'fa fa-fw fa-cubes'
      },
      {
        name: 'Members',
        href: '',
        icon: 'fa fa-fw fa-users'
      },
      {
        name: 'Bloggers',
        href: '',
        icon: 'fa fa-fw fa-edit'
      },
      {
        name: 'Administration',
        href: '',
        icon: 'fa fa-fw fa-university'
      },
      {
        name: 'Market Place',
        href: '',
        icon: 'fa fa-fw fa-shopping-cart'
      },
      {
        name: 'eBlast',
        href: '',
        icon: 'fa fa-fw fa-envelope',
        children: [
          {
            name: 'Email Lists',
            href: '',
            icon: 'fa fa-fw fa-circle-o'
          },
          {
            name: 'Email Templates',
            href: '',
            icon: 'fa fa-fw fa-circle-o'
          },
          {
            name: 'Email Campaigns',
            href: '',
            icon: 'fa fa-fw fa-circle-o'
          }
        ]
      },
      {
        name: 'Subscriptions',
        href: '',
        icon: 'fa fa-fw fa-star'
      }
    ]
  },
  {
    name: 'Applications',
    icon: 'fa fa-fw fa-futbol-o',
    href: '',
    children: [
      {
        name: 'App Hastag Banner',
        icon: 'fa fa-fw fa-dashboard',
        href: ''
      },
      {
        name: 'Article Editor',
        icon: 'fa fa-fw fa-pencil',
        href: ''
      },
      {
        name: 'Messenger',
        icon: 'fa fa-fw fa-comments',
        href: ''
      }
    ]
  },
  {
    name: 'Groups',
    icon: 'fa fa-fw fa-cube',
    href: '',
    children: [
      {
        name: 'Home',
        href: '',
        icon: 'fa fa-fw fa-home'
      },
      {
        name: 'Dashboard',
        href: '',
        icon: 'fa fa-fw fa-dashboard'
      },
      {
        name: 'Members',
        href: '/admin/groups/members',
        icon: 'fa fa-fw fa-shield'
      },
      {
        name: 'Profile',
        href: '',
        icon: 'fa fa-fw fa-user'
      },
      {
        name: 'Timeline',
        href: '',
        icon: 'fa fa-fw fa-clock-o'
      },
      {
        name: 'News',
        href: '',
        icon: 'fa fa-fw fa-user'
      },
      {
        name: 'Events',
        href: '',
        icon: 'fa fa-fw fa-clock-o'
      },
      {
        name: 'eBlast',
        href: '',
        icon: 'fa fa-fw fa-envelope',
        children: [
          {
            name: 'Email Lists',
            href: '',
            icon: 'fa fa-fw fa-circle-o'
          },
          {
            name: 'Email Templates',
            href: '',
            icon: 'fa fa-fw fa-circle-o'
          },
          {
            name: 'Email Campaigns',
            href: '',
            icon: 'fa fa-fw fa-circle-o'
          }
        ]
      },
      {
        name: 'Subscriptions',
        href: '',
        icon: 'fa fa-fw fa-star'
      }
    ]
  },
  {
    name: 'Settings',
    icon: 'fa fa-fw fa-cog',
    href: '',
    children: [
      {
        name: 'Account Settings',
        href: '',
        icon: 'fa fa-fw fa-home'
      },
      {
        name: 'Membership',
        href: '',
        icon: 'fa fa-fw fa-dashboard'
      },
      {
        name: 'Other',
        href: '',
        icon: 'fa fa-fw fa-shield'
      }
    ]
  }
]
