import React from 'react'
import classnames from 'classnames'
import s from './CardWithTabs.scss'

export const Card = props => {
  const cx = classnames(s.container, 'ui-card', props.className)
  return <div className={cx}>{props.children}</div>
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

export const CardBody = props => {
  const cx = classnames('ui-card-body')
  return <div className={cx}>{props.children}</div>
}

export const CardContent = props => {
  const cx = classnames('ui-card-content')
  return <div className={cx}>{props.children}</div>
}
