import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import CircularImage from 'components/ui/CircularImage'
import ProfileGallery from './ProfileGallery'

import s from './HashTag.scss'
import EditImage from './EditImage';

class HashTagContent extends Component {
    static propTypes = {
        selectedProvider: PropTypes.string,
    }

    state = {
        previewImage: '',
        croppedImage: '',
        showCropper: false
    }

    onImageUpload = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()

        this.setState({ previewImage: '' })
        reader.onloadend = () => {
            this.setState({ previewImage: reader.result, showCropper: true })
        }

        if (file) {
            reader.readAsDataURL(file)
        } else {
            throw new Error('Cannot read image file')
        }
    }

    onEditDone = (croppedImage) => {
        this.setState({ croppedImage }, this.onCropperClose)
    }

    onCropperClose = () => {
        document.querySelector('.input-file[type="file"]').value = ''
        this.setState({ showCropper: false, previewImage: '' })
    }

    render() {
        const cx = classnames(s.contentView)
        const { previewImage, showCropper, croppedImage } = this.state
        return (
            <div className={cx}>
                <h3 className='content-title'>
                    Basic Income Hashtag App
                </h3>
                {showCropper && <EditImage
                    src={previewImage}
                    onEditDone={this.onEditDone}
                    onRequestClose={this.onCropperClose} />}
                <div className='preview-section'>
                    <CircularImage size={128} src={croppedImage} />
                    <div className='arrow'>
                        <i className='fa fa-arrow-right'></i>
                    </div>
                    <CircularImage size={128} src={croppedImage} />
                </div>
                <div className='actions mt-3'>
                    <div className='btn btn-light btn-upload-local'>
                        Upload New Image
                        <i className='fa fa-cloud-upload'></i>
                        <input className='input-file' type='file' accept="image/*" name='localImage' onChange={this.onImageUpload} />
                    </div>
                    <div className='btn btn-light'>
                        Use from Facebook
                        <i className='fa fa-facebook-f'></i>
                    </div>
                    <div className='btn btn-light'>
                        Change Background Color
                        <i className='fa fa-eyedropper'></i>
                    </div>
                    <div className='btn btn-light'>
                        Change Text Color
                        <i className='fa fa-eyedropper'></i>
                    </div>
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

export default HashTagContent
