module.exports = [
    {
        name: 'Home',
        icon: 'fa fa-fw fa-home',
        href: '/dashboard',
        children: [
            {
                name: 'Profile',
                href: '/profile',
                icon: 'fa fa-fw fa-user'
            },
            {
                name: 'Wallets',
                href: '/wallets',
                icon: 'fa fa-fw fa-credit-card'
            },
            {
                name: 'Members',
                href: '/members',
                icon: 'fa fa-fw fa-users'
            }
        ]
    },
    {
        name: 'Community',
        icon: 'fa fa-fw fa-compass',
        href: '/dashboard',
        children: [
            {
                name: 'Ekata Social',
                icon_type: 'image',
                icon: '/public/img/ekata.png',
                href: '',
                children: [
                    {
                        name: 'Groups',
                        href: '/community/groups',
                        icon: 'fa fa-fw fa-cubes'
                    },
                    {
                        name: 'Members',
                        href: '',
                        icon: 'fa fa-fw fa-users'
                    }
                ]
            }
        ]
    },
    {
        name: 'Applications',
        icon: 'fa fa-fw fa-futbol-o',
        href: '/dashboard',
        children: [
            {
                name: 'Hashtag Banner',
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
        name: 'Baza',
        icon_type: 'image',
        icon: '/public/img/baza_logo_gs.svg',
        href: '/dashboard',
        children: [
            {
                name: 'Posts',
                href: '/dashboard',
                icon: 'fa fa-fw fa-life-ring'
            },
            {
                name: 'Members',
                href: '',
                icon: 'fa fa-fw fa-shield',
                children: [
                    {
                        name: 'Management',
                        href: `/dashboard`,
                        icon: 'fa fa-fw fa-users'
                    }
                ]
            },
            {
                name: 'Distribution SignUps',
                href: '/distribution-signup',
                icon: 'fa fa-fw fa-list'
            },
            {
                name: 'Coin Sale',
                href: '/coinsale',
                icon: 'fa fa-fw fa-tag'
            },
            {
                name: 'Group Profile',
                href: '/dashboard',
                icon: 'fa fa-fw fa-cog'
            }
        ]
    }
]
