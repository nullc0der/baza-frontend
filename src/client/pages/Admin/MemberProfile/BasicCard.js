import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Card, CardBody } from 'components/ui/CardWithTabs';

import s from './MemberProfile.scss'

const BasicCard = props => {
    const { className, title, children } = props
    const cx = classnames(s.basicCard, className)

    const contentClassName = classnames(s.basicCardContent, 'basic-card-content')

    return (
        <Card className={cx}>
            <CardBody>
                <div className={s.basicCardTitle}>{title}</div>
                <div className={contentClassName}>{children}</div>
            </CardBody>
        </Card>
    )
}

BasicCard.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node
}

export default BasicCard
