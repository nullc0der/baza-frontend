import React, { Component } from 'react'
import classnames from 'classnames'

import withStyles from 'isomorphic-style-loader/lib/withStyles'
import c from './ChatBodyItem.styl'

import Avatar from 'components/Avatar'

import { Emoji } from 'emoji-mart'
import Linkify from 'react-linkify'

import TimeAgo from 'react-timeago'

class ChatBodyItem extends Component {
    handleSelect = (messageId, shouldSelect) => {
        if (this.props.roomId) {
            this.props.onSelected(this.props.roomId, messageId, shouldSelect)
        } else {
            this.props.onSelected(messageId, shouldSelect)
        }
    }

    renderAttachment = filetype => {
        switch (filetype.split('/')[0]) {
            case 'image':
                return (
                    <div
                        className={
                            this.props.miniChat
                                ? 'img-attachment small'
                                : 'img-attachment'
                        }>
                        <img
                            src={this.props.fileurl}
                            title={this.props.filename}
                            alt={this.props.filename}
                        />
                    </div>
                )
            case 'video':
                return (
                    <div
                        className={
                            this.props.miniChat
                                ? 'video-attachment small'
                                : 'video-attachment'
                        }>
                        <video controls preload="metadata">
                            <source src={this.props.fileurl} type={filetype} />>
                        </video>
                    </div>
                )
            default:
                return (
                    <div className="file-attachment">
                        <i className="fa fa-paperclip" />
                        <a href={this.props.fileurl} target="_blank">
                            {this.props.filename}
                        </a>
                    </div>
                )
        }
    }

    render() {
        const {
            className,
            user = {},
            message = '',
            selected = false,
            stamp = new Date(),
            left = false,
            filetype
        } = this.props

        const cx = classnames(c.container, className, 'chat-body-item', {
            'in-left': left
        })

        return (
            <div className={cx}>
                {selected && (
                    <i className="material-icons selectmessage">check_circle</i>
                )}
                <Avatar
                    size={24}
                    otherProfile={{
                        username: user.username,
                        profile_photo: user.user_image_url,
                        default_avatar_color: user.default_avatar_color
                    }}
                    own={false}
                    className="ui-avatar"
                />
                <div
                    className="msg"
                    onClick={() =>
                        this.handleSelect(this.props.message_id, !left)
                    }>
                    {filetype ? this.renderAttachment(filetype) : ''}
                    <Linkify properties={{ target: '_blank' }}>
                        {message.split(' ').map((x, i) => {
                            return x.startsWith(':') ? (
                                <Emoji
                                    key={i}
                                    emoji={x}
                                    size={21}
                                    tooltip={true}
                                    sheetSize={16}
                                />
                            ) : (
                                x + ' '
                            )
                        })}
                    </Linkify>
                    <div className="stamp">
                        <TimeAgo date={stamp} minPeriod={10} />
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(c)(ChatBodyItem)
