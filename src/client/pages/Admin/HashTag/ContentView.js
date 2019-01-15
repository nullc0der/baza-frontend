import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classnames from 'classnames'
import CircularImage from 'components/ui/CircularImage'
import ProfileGallery from './ProfileGallery'

import s from './HashTag.scss'

class HashTagContent extends Component {
    static propTypes = {
        selectedProvider: PropTypes.string
    }

    componentDidMount = () => {
        this.props.fetchUserImages()
    }

    render() {
        const cx = classnames(s.contentView)

        const images = this.props.userImages || []

        return (
            <div className={cx}>
                <h3 className='content-title'>
                    Basic Income Hashtag App
                </h3>
                <div className='preview-section'>
                    <CircularImage size={128} />
                    <div className='arrow'>
                        <i className='fa fa-arrow-right'></i>
                    </div>
                    <CircularImage size={128} />
                </div>
                <div className='actions mt-3'>
                    <div className='btn btn-light'>Upload New Image</div>
                    <div className='btn btn-light'>
                        Use from Facebook
                        <i className='fa fa-facebook-f'></i>
                    </div>
                    <div className='btn btn-light'>Change Background Color</div>
                    <div className='btn btn-light'>Change Text Color</div>
                </div>
                <ProfileGallery />
                <div className='final-actions actions'>
                    <div className='btn btn-dark btn-large'>Download Image</div>
                    <div className='btn btn-dark btn-large btn-fb'>Upload to Facebook</div>
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
)(HashTagContent)

