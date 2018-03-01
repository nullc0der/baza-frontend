import React, { Component } from 'react'

const PHOTOS_LIST = [1, 2, 3, 4, 5, 6, 7, 8, 9]

class ProfilePhotos extends Component {
  render() {
    return (
      <div className="signup-details-section profile-photos-section">
        <div className="section-title">
          Photos
          <a href="#" className="badge badge-link badge-light">
            <i className="fa fa-plus" /> Add Photos
          </a>
        </div>
        <div className="photos-list mt-2">
          {PHOTOS_LIST.map(x => {
            return (
              <div className="profile-photo-item" key={x}>
                <img
                  className="profile-photo-item-img img-fluid"
                  alt=""
                  src={`https://api.adorable.io/avatars/285/abott${x}@adorable.png`}
                />
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default ProfilePhotos
