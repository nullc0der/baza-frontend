import React, { Component } from 'react'
import { connect } from 'react-redux'

import { CardContent } from 'components/ui/CardWithTabs'

import { actions as userProfileActions } from 'store/UserProfile'

import ImageBlock from './ImageBlock'

class MyPhotos extends Component {
    state = {
        imageUploading: false
    }

    componentDidMount() {
        this.props
            .fetchUserImages()
            .then(res => {})
            .catch(res => {})
    }

    onAddNewClick = () => {
        this.refs.userPhotoUploader.click()
    }

    onFileInputChange = e => {
        if (e.target.files) {
            this.setState({
                imageUploading: true
            })
            const image = e.target.files[0]
            const data = new FormData()
            data.append('photo', image)
            this.props
                .saveUserImage(data)
                .then(res =>
                    this.setState({
                        imageUploading: false
                    })
                )
                .catch(res => {
                    this.setState({
                        imageUploading: false
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

    render() {
        return (
            <CardContent>
                <div className="profile-images">
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
                            <i className="fa fa-spin fa-refresh" />
                        ) : (
                            <i className="fa fa-plus" />
                        )}
                    </div>
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
    saveUserImage(datas) {
        return dispatch(userProfileActions.saveUserImage(datas))
    },
    deleteUserImage(datas) {
        return dispatch(userProfileActions.deleteUserImage(datas))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyPhotos)
