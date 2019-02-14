export const isAdmin = permissions => {
    return permissions.indexOf(103) !== -1 || permissions.indexOf(104) !== -1
}

export const isMember = permissions => {
    return permissions.indexOf(102) !== -1
}

export const isStaff = permissions => {
    return permissions.indexOf(106) !== -1
}
