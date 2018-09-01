import React, { Component } from 'react'
import classnames from 'classnames'

import s from './SubHeader.scss'

import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import startCase from 'lodash/startCase'
import take from 'lodash/take'

import SearchFilter from 'components/SearchFilter'
import { actions } from 'store/Common'
import { FILTERS } from './filters'

class SubHeader extends Component {
    state = {
        showSearchAndFilters: false,
        showFilterOptions: false,
        enabledFilters: [],
        disabledFilters: []
    }

    componentDidMount = () => {
        this.setSearchAndFilters()
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.setSearchAndFilters()
        }
    }

    setSearchAndFilters = () => {
        const pathname = this.props.location.pathname.split('/').filter(x => isNaN(x)).join('/')
        if (FILTERS[pathname]) {
            this.setState({
                showSearchAndFilters: true,
                enabledFilters: FILTERS[pathname].enabledFilters,
                disabledFilters: FILTERS[pathname].disabledFilters
            }, () => {
                this.props.changeFilters(this.state.enabledFilters)
                this.props.changeSearchString('')
            })
        } else {
            this.setState({
                showSearchAndFilters: false,
                enabledFilters: [],
                disabledFilters: []
            }, () => {
                this.props.changeFilters(this.state.enabledFilters)
                this.props.changeSearchString('')
            })
        }
    }

    toggleFilterOptions = (e) => {
        this.setState(prevState => ({
            showFilterOptions: !prevState.showFilterOptions
        }))
    }

    changeSearchString = (e) => {
        e.preventDefault()
        this.props.changeSearchString(e.target.value)
    }

    filterButtonClicked = (e, name) => {
        e.preventDefault()
        const enabledFilters = this.state.enabledFilters
        const disabledFilters = this.state.disabledFilters
        const newEnabledFilters = enabledFilters.indexOf(name) !== -1
            ? enabledFilters.filter(x => x !== name)
            : enabledFilters.concat(name)
        const newDisabledFilters = disabledFilters.indexOf(name) !== -1
            ? disabledFilters.filter(x => x !== name)
            : disabledFilters.concat(name)
        this.setState({
            enabledFilters: newEnabledFilters,
            disabledFilters: newDisabledFilters
        }, () => this.props.changeFilters(newEnabledFilters))
    }

    handleDragStart = (e, name) => {
        e.dataTransfer.setData('text', name)
    }

    handleDragOver = (e) => {
        e.stopPropagation()
        e.preventDefault()
    }

    handleDrop = (e, name) => {
        for (const filter of this.state.enabledFilters) {
            $(`#filter-${filter}`).removeClass('over')
        }
        this.swapFilters(e.dataTransfer.getData('text'), name)
        e.dataTransfer.clearData()
    }

    handleDragEnter = (e, name) => {
        $(`#filter-${name}`).toggleClass('over')
    }

    handleDragLeave = (e, name) => {
        $(`#filter-${name}`).toggleClass('over')
    }

    swapFilters = (src, target) => {
        let swappedFilters = this.state.enabledFilters.slice()
        const temp = swappedFilters.indexOf(target)
        swappedFilters[swappedFilters.indexOf(src)] = target
        swappedFilters[temp] = src
        const isSame = swappedFilters.every((e, i) => {
            return e === this.state.enabledFilters[i]
        })
        if (!isSame) {
            this.setState({
                enabledFilters: swappedFilters
            }, () => this.props.changeFilters(swappedFilters))
        }
    }

    render() {
        const { className, location } = this.props

        const cx = classnames(s.container, className, 'flex-horizontal', 'a-center')

        const paths = location.pathname.split('/').filter(x => !!x)
        const mainPath = startCase(paths[paths.length - 1])

        const crumbs = paths.map((x, i) => {
            return {
                href: location.basename + take(paths, i + 1).join('/'),
                text: startCase(x)
            }
        })

        return (
            <div className={cx}>
                <div className="d-none d-sm-block">
                    <div className="title"> {mainPath} </div>
                    <div className="list-links flex-horizontal">
                        {crumbs.map((x, i) => {
                            return (
                                <Link to={x.href} className="bread-link" key={i}>
                                    {' '}
                                    {x.text} /{' '}
                                </Link>
                            )
                        })}
                    </div>
                </div>
                <div className="d-none d-sm-block flex-1"></div>
                {
                    this.state.showSearchAndFilters && (
                        <SearchFilter
                            enabledFilters={this.state.enabledFilters}
                            disabledFilters={this.state.disabledFilters}
                            showFilterOptions={this.state.showFilterOptions}
                            changeSearchString={this.changeSearchString}
                            toggleFilterOptions={this.toggleFilterOptions}
                            filterButtonClicked={this.filterButtonClicked}
                            handleDragStart={this.handleDragStart}
                            handleDragOver={this.handleDragOver}
                            handleDragEnter={this.handleDragEnter}
                            handleDragLeave={this.handleDragLeave}
                            handleDrop={this.handleDrop} />
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    location: state.router.location
})

const mapDispatchToProps = dispatch => ({
    changeSearchString: (string) => dispatch(actions.changeSubHeaderSearchString(string)),
    changeFilters: (filters) => dispatch(actions.changeSubHeaderFilters(filters))
})

export default connect(mapStateToProps, mapDispatchToProps)(SubHeader)
