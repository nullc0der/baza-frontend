import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions as userProfileActions } from 'store/UserProfile'
import CircularImage from 'components/ui/CircularImage'
import Config from 'utils/config'

import s from './HashTag.scss'
class ProfileGallery extends Component {
    static propTypes = {
        userImages: PropTypes.array
    }

    componentDidMount = () => {
        this.props.fetchUserImages()
    }

    renderOneImage = (image, index) => {
        const src = Config.get('DOCUMENT_ROOT') + image.photo
        return <CircularImage
            className='upload-gallery-item'
            onClick={e => this.props.onImageSelect(src)}
            key={image.id}
            size={64}
            src={src} />
    }

    render() {
        const { userImages } = this.props

        return (
            <div className={s.profileGallery}>
                <div className='gallery-title'>Upload from gallery</div>
                <div className='gallery-list'>
                    {userImages.map(this.renderOneImage)}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    userImages: state.UserProfile.userImages
})

const mapDispatchToProps = dispatch => ({
    fetchUserImages() {
        return dispatch(userProfileActions.fetchUserImages())
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileGallery)
