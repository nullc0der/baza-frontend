import React, { Component } from 'react'
import classnames from 'classnames'

import { Player, BigPlayButton } from 'video-react'

import s from './VideoPlayer.scss'

class VideoPlayer extends Component {
    render() {
        const { className, src, poster = '', onPlay = () => {} } = this.props
        const cx = classnames(s.container, className)

        return (
            <div className={cx}>
                <Player playsInline src={src} poster={poster} onPlay={onPlay}>
                    <BigPlayButton position="center" />
                </Player>
            </div>
        )
    }
}

export default VideoPlayer
