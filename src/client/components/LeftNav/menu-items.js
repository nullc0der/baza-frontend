module.exports = [
    {
        name: 'Home',
        icon: 'fa fa-fw fa-home',
        href: '/admin/',
        children: [
            {
                name: 'Profile',
                href: '/admin/member-profile',
                icon: 'fa fa-fw fa-user'
            },
            {
                name: 'Wallets',
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
                name: 'Baza',
                icon_type: 'image',
                icon: '/public/img/baza_logo_gs.svg',
                href: '',
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
                name: 'Ekata Social',
                icon_type: 'image',
                icon: '/public/img/ekata.png',
                href: '',
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
            }
        ]
    },
    {
        name: 'Applications',
        icon: 'fa fa-fw fa-futbol-o',
        href: '/admin/',
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
        href: '/admin/',
        children: [
            {
                name: 'Posts',
                href: '/admin/',
                icon: 'fa fa-fw fa-life-ring'
            },
            {
                name: 'Members',
                href: '',
                icon: 'fa fa-fw fa-shield',
                children: [
                    {
                        name: 'Management',
                        href: `/admin/`,
                        icon: 'fa fa-fw fa-users'
                    }
                ]
            },
            {
                name: 'Distribution SignUps',
                href: '/admin/distribution-signup',
                icon: 'fa fa-fw fa-list'
            },
            {
                name: 'Coin Sale',
                href: '/admin/coinsale',
                icon: 'fa fa-fw fa-tag'
            },
            {
                name: 'Group Profile',
                href: '/admin/',
                icon: 'fa fa-fw fa-cog'
            }
        ]
    }
]
