import React, { Component } from 'react'
import { CardContent } from 'components/ui/CardWithTabs'

export default class ProfileImages extends Component {
  onAddNewClick = () => {
    console.log('add upload image logic here')
  }

  render() {
    return (
      <CardContent>
        <div className="profile-images">
          <div className="profile-image is-big">
            <img
              className="img-fluid"
              alt=""
              src="https://api.adorable.io/avatars/512/nanu@adorable.io.png"
            />
          </div>
          <div className="profile-image is-add-new" />
          <div className="profile-image">
            <img
              className="img-fluid"
              alt=""
              src="https://api.adorable.io/avatars/512/nanu1@adorable.io.png"
            />
          </div>
          <div className="profile-image">
            <img
              className="img-fluid"
              alt=""
              src="https://api.adorable.io/avatars/512/nanu2@adorable.io.png"
            />
          </div>
          <div className="profile-image">
            <img
              className="img-fluid"
              alt=""
              src="https://api.adorable.io/avatars/512/nanu3@adorable.io.png"
            />
          </div>
          <div className="profile-image">
            <img
              className="img-fluid"
              alt=""
              src="https://api.adorable.io/avatars/512/nanu4@adorable.io.png"
            />
          </div>
          <div className="profile-image">
            <img
              className="img-fluid"
              alt=""
              src="https://api.adorable.io/avatars/512/nanu5@adorable.io.png"
            />
          </div>
          <div className="profile-image">
            <img
              className="img-fluid"
              alt=""
              src="https://api.adorable.io/avatars/512/nanu6@adorable.io.png"
            />
          </div>
          <div className="profile-image">
            <img
              className="img-fluid"
              alt=""
              src="https://api.adorable.io/avatars/512/nanu7@adorable.io.png"
            />
          </div>
          <div className="profile-image">
            <img
              className="img-fluid"
              alt=""
              src="https://api.adorable.io/avatars/512/nan8@adorable.io.png"
            />
          </div>
          <div className="profile-image">
            <img
              className="img-fluid"
              alt=""
              src="https://api.adorable.io/avatars/512/nanu9@adorable.io.png"
            />
          </div>
          <div className="profile-image">
            <img
              className="img-fluid"
              alt=""
              src="https://api.adorable.io/avatars/512/nanu10@adorable.io.png"
            />
          </div>
          <div className="profile-image">
            <img
              className="img-fluid"
              alt=""
              src="https://api.adorable.io/avatars/512/nanu11@adorable.io.png"
            />
          </div>
          <div className="profile-image">
            <img
              className="img-fluid"
              alt=""
              src="https://api.adorable.io/avatars/512/nanu12@adorable.io.png"
            />
          </div>
          <div className="profile-image">
            <img
              className="img-fluid"
              alt=""
              src="https://api.adorable.io/avatars/512/nanu13@adorable.io.png"
            />
          </div>
          <div className="profile-image">
            <img
              className="img-fluid"
              alt=""
              src="https://api.adorable.io/avatars/512/nanu14@adorable.io.png"
            />
          </div>
        </div>
      </CardContent>
    )
  }
}
