import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { actions as distributionActions } from 'store/DistributionSignUp'

class ProfilePhotos extends Component {
    onRequestPhotoDelete = photo => {
        console.log('deleting photo: ', photo)
        this.props.deletePhoto(photo.id)
    }
    render() {
        const photo = this.props.data.photo || ''
        return (
            <div className="signup-details-section profile-photos-section">
                <div className="section-title">
                    Photos
                    {this.props.editMode && (
                        <a href="#" className="badge badge-link badge-light">
                            <i className="fa fa-plus" /> Add Photos
                        </a>
                    )}
                </div>
                <div className="photos-list mt-2">
                    <div className="profile-photo-item">
                        <img
                            className="profile-photo-item-img img-fluid"
                            alt=""
                            src={photo}
                        />
                    </div>
                    {/* {photos.map(photo => {
                        return (
                            <div className="profile-photo-item" key={photo.id}>
                                <img
                                    className="profile-photo-item-img img-fluid"
                                    alt=""
                                    src={photo.url}
                                />
                                {this.props.editMode && (
                                    <div
                                        className="photo-item-delete"
                                        onClick={e =>
                                            this.onRequestPhotoDelete(photo)
                                        }>
                                        REMOVE
                                    </div>
                                )}
                            </div>
                        )
                    })} */}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    //list: state.DistributionSignUp.data.photos
})

const mapDispatchToProps = dispatch => ({
    // deletePhoto(photoId) {
    //     return dispatch(distributionActions.deletePhoto(photoId))
    // }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfilePhotos)
