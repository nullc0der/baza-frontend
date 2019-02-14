import React from 'react'
import classnames from 'classnames'
import s from './CardWithTabs.scss'

export const Card = props => {
    const cx = classnames(s.container, 'ui-card', props.className)
    return (
        <div className={cx} id={props.id || ''}>
            {props.children}
        </div>
    )
}

export const CardHeader = props => {
    const cx = classnames('ui-card-header', props.className)
    return (
        <div className={cx}>
            <div className="header-title">{props.title}</div>
            {!!props.subtitle && (
                <div className="header-subtitle">{props.subtitle}</div>
            )}
            <div className="header-bg" />
            {props.children}
        </div>
    )
}

export const CardBody = React.forwardRef((props, ref) => {
    const cx = classnames('ui-card-body', props.className)
    return (
        <div className={cx} ref={ref}>
            {props.children}
        </div>
    )
})

export const CardContent = props => {
    const cx = classnames('ui-card-content', props.className)
    return <div className={cx}>{props.children}</div>
}

// export class CardContent extends Component {
//   render() {
//     const { className, children } = this.props
//     const cx = classnames('ui-card-content', className)
//     return <div className={cx} ref={node => { this.container = node }}>{children}</div>
//   }
// }

export const CardSearchBar = props => {
    const cx = classnames('ui-card-search-bar', props.className)
    return (
        <div className={cx}>
            <input
                type="text"
                placeholder={props.placeholder}
                value={props.value}
                className="ui-card-search-bar-input"
                onChange={props.onChange}
            />
            <div className="search-icon" onClick={props.onSearchClick}>
                <i className="fa fa-search" />
            </div>
        </div>
    )
}
