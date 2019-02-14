const ROW_SELECTOR = '.milestone-row'
const COL_SELECTOR = '.milestone-item .milestone-inner'

export const find = (selector = '', scope = null) => {
    if (!selector) {
        throw new Error('`selector` is invalid: ' + selector)
    }

    const scopeEl = scope ? scope : this.container

    return Array.from(scopeEl.querySelectorAll(selector))
}

export const findRows = (container) => find(ROW_SELECTOR, container)
export const findCols = (row) => find(COL_SELECTOR, row)

export const isRowDistorted = (row) => {
    const cols = findCols(row)
    const firstHeight = cols[0].getBoundingClientRect().height
    return cols.some(col => col.getBoundingClientRect().height !== firstHeight)
}

export const getMaxColHeight = (row) => {
    let maxHeight = 100
    findCols(row).forEach(item => {
        var h = item.getBoundingClientRect().height
        if (h > maxHeight) {
            maxHeight = h
        }
    })
    return maxHeight
}

export const withMaxColHeights = (row) => {
    return {
        row,
        maxHeight: getMaxColHeight(row)
    }
}

export const normalizeColHeights = ({ row, maxHeight }) => {
    findCols(row).forEach(col => {
        col.style.height = `${maxHeight}px`
    })
}
