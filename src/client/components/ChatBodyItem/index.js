import React, { Component } from 'react'
import classnames from 'classnames'

import c from './ChatBodyItem.scss'

import Avatar from 'components/Avatar'
import Config from 'utils/config'
import { Emoji } from 'emoji-mart'
import Linkify from 'react-linkify'

import TimeAgo from 'react-timeago'

export default class ChatBodyItem extends Component {
    handleSelect = (messageId, shouldSelect) => {
        if (this.props.roomId) {
            this.props.onSelected(this.props.roomId, messageId, shouldSelect)
        } else {
            this.props.onSelected(messageId, shouldSelect)
        }
    }

    renderAttachment = filetype => {
        const fileURL = Config.get('DOCUMENT_ROOT') + this.props.fileurl
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
                            src={fileURL}
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
                            <source src={fileURL} type={filetype} />>
                        </video>
                    </div>
                )
            default:
                return (
                    <div className="file-attachment">
                        <i className="fa fa-paperclip" />
                        <a href={fileURL} target="_blank">
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
                        default_avatar_color: user.user_avatar_color
                    }}
                    own={false}
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
                </div>
                <div className="stamp">
                    <TimeAgo date={stamp} minPeriod={10} />
                </div>
            </div>
        )
    }
}
