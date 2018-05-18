module.exports = [
    {
        name: 'Home',
        icon: 'fa fa-fw fa-home',
        href: '/admin',
        children: [
            {
                name: 'Profile',
                href: '/admin/member-profile',
                icon: 'fa fa-fw fa-user'
            },
            {
                name: 'Wallets Page',
                href: '/admin/wallets',
                icon: 'fa fa-fw fa-credit-card'
            }
        ]
    },
    {
        name: 'Community',
        icon: 'fa fa-fw fa-compass',
        href: '/admin/',
        children: [
            {
                name: 'Groups',
                href: '/admin/community/groups',
                icon: 'fa fa-fw fa-cubes'
            },
            {
                name: 'Members',
                href: '',
                icon: 'fa fa-fw fa-users'
            }
        ]
    },
    {
        name: 'Applications',
        icon: 'fa fa-fw fa-futbol-o',
        href: '/admin/',
        children: [
            {
                name: 'App Hastag Banner',
                icon: 'fa fa-fw fa-dashboard',
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
        href: '/admin/',
        children: [
            {
                name: 'Members',
                href: '/admin/groups/members',
                icon: 'fa fa-fw fa-shield'
            },
            {
                name: 'Distribution SignUp',
                href: '/admin/distribution-signup',
                icon: 'fa fa-fw fa-list'
            },
            {
                name: 'Coin Sale',
                href: '/admin/coinsale',
                icon: 'fa fa-fw fa-tag'
            }
        ]
    }
]
