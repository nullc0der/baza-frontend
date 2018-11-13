export const FILTERS = {
    'distribution-signup': {
        enabledFilters: ['approved', 'pending', 'declined', 'incomplete'],
        disabledFilters: []
    },
    members: {
        enabledFilters: ['online', 'offline'],
        disabledFilters: []
    },
    'community/groups': {
        enabledFilters: ['all', 'subscribed', 'joined'],
        disabledFilters: []
    },
    'community/groups/members': {
        enabledFilters: [
            'owners',
            'admins',
            'moderators',
            'staffs',
            'members',
            'subscribers'
        ],
        disabledFilters: ['online', 'banned', 'blocked', 'Baza Members']
    }
}
