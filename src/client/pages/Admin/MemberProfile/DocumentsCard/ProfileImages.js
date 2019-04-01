import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { getImageURLFromFile } from 'utils/common'

import ImageEditor from 'components/ImageEditor'
import { CardContent } from 'components/ui/CardWithTabs'

import { actions as userProfileActions } from 'store/UserProfile'

import ImageBlock from './ImageBlock'

class ProfileImages extends Component {
    state = {
        imageUploading: false,
        uploadDonePercent: 0,
        filePreview: '',
        preCropImage: false,
        showCropper: false
    }

    componentDidMount() {
        this.props
            .fetchProfileImages()
            .then(res => {})
            .catch(res => {})
    }

    onAddNewClick = () => {
        this.profilePhotoUploader.click()
    }

    onFileInputChange = e => {
        if (!e.target.files) {
            return
        }

        getImageURLFromFile(e.target.files[0])
            .then(preCropImage => {
                this.setState({ preCropImage, showCropper: true })
            })
            .catch(err => {
                alert(err.message)
            })
    }

    onEditDone = croppedImage => {
        this.setState({ filePreview: croppedImage, imageUploading: true })
        this.closeCropper()
        // const data = new FormData()
        // data.append('photo', croppedImage)
        this.props
            .saveProfileImage(
                { photo: croppedImage },
                this.onProfileImageUpload
            )
            .then(res =>
                this.setState({
                    imageUploading: false,
                    uploadDonePercent: 0,
                    filePreview: ''
                })
            )
            .catch(res => {
                this.setState({
                    imageUploading: false,
                    uploadDonePercent: 0,
                    filePreview: ''
                })
            })
    }

    onProfileImageSetActiveClick = imageID => {
        const datas = {
            profile_photo_id: imageID,
            set_active: true
        }
        this.props.updateProfileImage(datas)
    }

    onProfileImageDeleteClick = imageID => {
        const datas = {
            profile_photo_id: imageID
        }
        this.props.deleteProfileImage(datas)
    }

    onProfileImageUpload = value => {
        let uploadDonePercent = 0
        if (value.lengthComputable) {
            uploadDonePercent = (value.loaded / value.total) * 100
        }
        this.setState({
            uploadDonePercent: uploadDonePercent > 10 ? uploadDonePercent : 10
        })
    }

    closeCropper = () => {
        this.profilePhotoUploader.value = ''
        this.setState({ showCropper: false, preCropImage: false })
    }

    render() {
        const { showCropper, preCropImage } = this.state
        const activeProfilePhoto = this.props.profileImages
            ? this.props.profileImages.filter(x => x.is_active)
            : []
        const otherProfilePhotos = this.props.profileImages
            ? this.props.profileImages.filter(x => !x.is_active)
            : []
        return (
            <CardContent>
                {showCropper && (
                    <ImageEditor
                        src={preCropImage}
                        onRequestClose={this.closeCropper}
                        onEditDone={this.onEditDone}
                    />
                )}
                <div className="profile-images">
                    {activeProfilePhoto.length > 0 && (
                        <ImageBlock
                            className="profile-image is-big"
                            imageUrl={activeProfilePhoto[0].userphoto.photo}
                            imageId={activeProfilePhoto[0].id}
                            isActive={true}
                            deleteFn={this.onProfileImageDeleteClick}
                        />
                    )}
                    <div
                        className="profile-image is-add-new"
                        onClick={this.onAddNewClick}>
                        <input
                            type="file"
                            accept="image/*"
                            className="input-field"
                            ref={node => (this.profilePhotoUploader = node)}
                            onChange={this.onFileInputChange}
                        />
                        {this.state.imageUploading ? (
                            <Fragment>
                                <img
                                    className="progress-bar-bg"
                                    src={this.state.filePreview}
                                    alt="uploading"
                                />
                                <div className="progress-bar">
                                    <div
                                        className="progress"
                                        style={{
                                            width:
                                                this.state.uploadDonePercent +
                                                '%'
                                        }}
                                    />
                                </div>
                            </Fragment>
                        ) : (
                            <i className="fa fa-plus" />
                        )}
                    </div>
                    {otherProfilePhotos.map((x, i) => (
                        <ImageBlock
                            className="profile-image"
                            key={i}
                            imageUrl={x.userphoto.photo}
                            imageId={x.id}
                            deleteFn={this.onProfileImageDeleteClick}
                            setActiveFn={this.onProfileImageSetActiveClick}
                        />
                    ))}
                </div>
            </CardContent>
        )
    }
}

const mapStateToProps = state => ({
    profileImages: state.UserProfile.profileImages
})

const mapDispatchToProps = dispatch => ({
    fetchProfileImages() {
        return dispatch(userProfileActions.fetchProfileImages())
    },
    saveProfileImage(datas, uploadProgressFn) {
        return dispatch(
            userProfileActions.saveProfileImage(datas, uploadProgressFn)
        )
    },
    deleteProfileImage(datas) {
        return dispatch(userProfileActions.deleteProfileImage(datas))
    },
    updateProfileImage(datas) {
        return dispatch(userProfileActions.updateProfileImage(datas))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileImages)
