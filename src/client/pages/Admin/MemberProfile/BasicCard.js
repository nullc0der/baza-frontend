import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardBody } from 'components/ui/CardWithTabs';

import s from './MemberProfile.scss'

const BasicCard = props => {
    const { title, children } = props
    return (
        <Card>
            <CardBody>
                <div className={s.basicCardTitle}>{title}</div>
                <div className={s.basicCardContent}>{children}</div>
            </CardBody>
        </Card>
    )
}

BasicCard.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node
}

export default BasicCard
