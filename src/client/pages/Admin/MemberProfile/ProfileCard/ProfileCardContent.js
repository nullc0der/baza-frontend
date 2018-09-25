import React, { Fragment } from 'react'
import get from 'lodash/get'

import Autocomplete from 'react-google-autocomplete'

import { CardContent } from 'components/ui/CardWithTabs'
import EditableInputField from 'components/ui/EditableInputField'

const ProfileDetail = props => (
    <div className={`profile-detail ${props.className}`}>
        <div className="label">{props.label}</div>
        <div className="value">{props.value}</div>
    </div>
)

const GenderDropdown = props => {
    return (
        <Fragment>
            <div className="gender-dropdown-group btn-group">
                <button
                    type="button"
                    className="btn btn-block btn-light btn-sm dropdown-toggle text-capitalize"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false">
                    {props.gender ? props.gender : 'male'}
                </button>
                <div className="dropdown-menu dropdown-menu-right">
                    {['male', 'female', 'other'].map((item, i) => (
                        <div
                            key={i}
                            className="dropdown-item text-capitalize"
                            onClick={() => props.onGenderSelect(item)}>
                            {item}
                        </div>
                    ))}
                </div>
            </div>
            {props.errorState && (
                <div className="text-danger">{props.errorState}</div>
            )}
        </Fragment>
    )
}

const ProfileCardContent = props => {
    const {
        profile,
        isEditing,
        onFieldChange,
        onGenderSelect,
        onPlaceSelect,
        errors
    } = props
    return (
        <CardContent>
            <div className="row mt-2">
                <div className="col-6">
                    <ProfileDetail
                        label="Name"
                        value={
                            <EditableInputField
                                id="name"
                                value={profile.name}
                                isEditing={isEditing}
                                onChange={onFieldChange}
                                hasError={
                                    get(errors.user, 'first_name', '') ||
                                    get(errors.user, 'last_name', '')
                                }
                            />
                        }
                    />
                </div>
                <div className="col-6">
                    <ProfileDetail
                        label="Username"
                        value={
                            <EditableInputField
                                id="username"
                                value={profile.username}
                                isEditing={isEditing}
                                onChange={onFieldChange}
                                hasError={get(errors.user, 'username', '')}
                            />
                        }
                        className="text-right"
                    />
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-6">
                    <ProfileDetail
                        className="text-capitalize"
                        label="Gender"
                        value={
                            isEditing ? (
                                <GenderDropdown
                                    gender={profile.gender}
                                    onGenderSelect={onGenderSelect}
                                    errorState={get(errors, 'gender', '')}
                                />
                            ) : (
                                profile.gender
                            )
                        }
                    />
                </div>
                <div className="col-6">
                    <ProfileDetail
                        label="Community"
                        value="Ekata Social"
                        className="text-right"
                    />
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-md-12">
                    <ProfileDetail
                        label="About Me"
                        value={
                            <EditableInputField
                                id="aboutMe"
                                value={profile.aboutMe}
                                isEditing={isEditing}
                                onChange={onFieldChange}
                                hasError={get(errors, 'about_me', '')}
                            />
                        }
                    />
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-6">
                    <ProfileDetail
                        label="Website"
                        value={
                            <EditableInputField
                                id="website"
                                value={profile.website}
                                isEditing={isEditing}
                                onChange={onFieldChange}
                                hasError={get(errors, 'website', '')}
                            />
                        }
                    />
                </div>
                <div className="col-6">
                    <ProfileDetail
                        label="Location"
                        value={
                            isEditing ? (
                                <Fragment>
                                    <Autocomplete
                                        style={{
                                            width: '100%',
                                            border:
                                                '1px rgba(0, 0, 0, 0.12) solid',
                                            backgroundColor: '#fff'
                                        }}
                                        onPlaceSelected={place => {
                                            onPlaceSelect(
                                                place.formatted_address
                                            )
                                        }}
                                        defaultValue={profile.location}
                                    />
                                    <div className="text-danger">
                                        {get(errors, 'location', '')}
                                    </div>
                                </Fragment>
                            ) : (
                                profile.location
                            )
                        }
                        className="text-right"
                    />
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-md-12">
                    <img
                        className="img-fluid profile-location-map"
                        alt="Location"
                        src={`https://maps.googleapis.com/maps/api/staticmap?center=${
                            profile.location
                        }&zoom=11&scale=1&size=600x150&maptype=roadmap&format=png&visual_refresh=true&key=AIzaSyDqsDgAvVSeYBL2Q7p8x-kAB0lLuwlNW7c`}
                    />
                </div>
            </div>
        </CardContent>
    )
}

export default ProfileCardContent
