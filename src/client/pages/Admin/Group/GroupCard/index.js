import React, { Component } from 'react'
import classnames from 'classnames'
import isEmpty from 'lodash/isEmpty'
import { Scrollbars } from 'react-custom-scrollbars'

import Config from 'utils/config'
import s from './GroupCard.scss'

class GroupCard extends Component {
    render() {
        const {
            className,
            name,
            category,
            headerURL,
            logoURL,
            members,
            subscribers,
            description,
            subscribeSection,
            footer,
            onClickCard = () => {}
        } = this.props

        const cx = classnames(
            s.container,
            className,
            'ui-group-card',
            'group-type-' + category.toLowerCase()
        )

        return (
            <div className={cx} onClick={onClickCard}>
                <div className="card-header flex-horizontal">
                    <div
                        className="group-header-image"
                        style={{
                            backgroundImage: `url(${
                                !isEmpty(headerURL)
                                    ? Config.get('API_ROOT') +
                                      headerURL.full_size
                                    : '/public/img/group/group-header-default.png'
                            })`
                        }}
                    />
                    <div className="group-info">
                        <div className="name"> {name} </div>
                        <div className="category">
                            {' '}
                            {category.split(' ').join('\n')}{' '}
                        </div>
                    </div>
                    {subscribeSection && subscribeSection}
                    <div
                        className="card-circle-image"
                        style={{
                            backgroundImage: `url(${
                                !isEmpty(logoURL)
                                    ? Config.get('API_ROOT') +
                                      logoURL.thumbnail_92
                                    : ''
                            })`
                        }}>
                        {isEmpty(logoURL) && (
                            <div className="logo">
                                <span className="text">{name[0]}</span>
                            </div>
                        )}
                    </div>
                </div>
                <div className="card-body">
                    <Scrollbars autoHide autoHeight autoHeightMax={80}>
                        <p> {description} </p>
                    </Scrollbars>
                    <div className="bottom-stats flex-horizontal">
                        <div className="bottom-stat flex-1">
                            <div className="stat-value"> {members} </div>
                            <div className="stat-label"> Members </div>
                        </div>
                        <div className="bottom-stat flex-1">
                            <div className="stat-value"> {subscribers} </div>
                            <div className="stat-label"> Subscribers </div>
                        </div>
                        {/* <div className='bottom-stat flex-1'>
								<div className='stat-value'> {active} </div>
								<div className='stat-label'> Active </div>
							</div> */}
                    </div>
                </div>
                <div className="card-footer">{footer}</div>
            </div>
        )
    }
}

export default GroupCard
