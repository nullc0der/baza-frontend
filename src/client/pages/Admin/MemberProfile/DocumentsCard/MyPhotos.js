import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { getImageURLFromFile } from 'utils/common'

import { CardContent } from 'components/ui/CardWithTabs'

import { actions as userProfileActions } from 'store/UserProfile'

import ImageBlock from './ImageBlock'

class MyPhotos extends Component {
    state = {
        imageUploading: false,
        uploadDonePercent: 0,
        filePreview: ''
    }

    componentDidMount() {
        this.props
            .fetchUserImages()
            .then(res => { })
            .catch(res => { })
    }

    onAddNewClick = () => {
        this.refs.userPhotoUploader.click()
    }

    onFileInputChange = e => {
        if (e.target.files) {
            getImageURLFromFile(e.target.files[0]).then(filePreview => {
                this.setState({
                    filePreview,
                    imageUploading: true
                })
            })
            const image = e.target.files[0]
            const data = new FormData()
            data.append('photo', image)
            this.props
                .saveUserImage(data, this.onImageUpload)
                .then(res =>
                    this.setState({
                        imageUploading: false,
                        uploadDonePercent: 0
                    })
                )
                .catch(res => {
                    this.setState({
                        imageUploading: false,
                        uploadDonePercent: 0
                    })
                })
        }
    }

    onUserImageDeleteClick = imageID => {
        const datas = {
            photo_id: imageID
        }
        this.props.deleteUserImage(datas)
    }

    onImageUpload = value => {
        let uploadDonePercent = 0
        if (value.lengthComputable) {
            uploadDonePercent = (value.loaded / value.total) * 100
        }
        this.setState({
            uploadDonePercent
        })
    }

    renderAddNew = () => {
        return (
            <div
                className="profile-image is-add-new"
                onClick={this.onAddNewClick}>
                <input
                    type="file"
                    accept="image/*"
                    className="input-field"
                    ref="userPhotoUploader"
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
        )
    }

    render() {
        return (
            <CardContent>
                <div className="profile-images">
                    {this.props.userImages.map((x, i) => (
                        <ImageBlock
                            className="profile-image"
                            key={i}
                            imageUrl={x.photo}
                            imageId={x.id}
                            isActive={true}
                            deleteFn={this.onUserImageDeleteClick}
                        />
                    ))}
                    {this.renderAddNew()}
                </div>
            </CardContent>
        )
    }
}

const mapStateToProps = state => ({
    userImages: state.UserProfile.userImages
})

const mapDispatchToProps = dispatch => ({
    fetchUserImages() {
        return dispatch(userProfileActions.fetchUserImages())
    },
    saveUserImage(datas, uploadProgressFn) {
        return dispatch(
            userProfileActions.saveUserImage(datas, uploadProgressFn)
        )
    },
    deleteUserImage(datas) {
        return dispatch(userProfileActions.deleteUserImage(datas))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyPhotos)
