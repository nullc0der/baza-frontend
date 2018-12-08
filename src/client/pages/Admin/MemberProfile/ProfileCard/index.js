import React, { Component } from 'react'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'

import { Card, CardHeader, CardBody } from 'components/ui/CardWithTabs'
import Avatar from 'components/Avatar'

import { actions as userProfileActions } from 'store/UserProfile'

import ProfileCardContent from './ProfileCardContent'

class ProfileCard extends Component {
    state = {
        inputValues: {
            name: '',
            username: '',
            gender: '',
            aboutMe: '',
            website: '',
            location: ''
        },
        isEditing: false
    }

    componentDidMount() {
        if (isEmpty(this.props.profile)) {
            this.props
                .fetchProfile()
                .then(res => {
                    this.setInputValues(this.props.profile)
                })
                .catch(res => {})
        } else {
            this.setInputValues(this.props.profile)
        }
    }

    setInputValues(profile) {
        this.setState({
            inputValues: {
                name: `${profile.user.first_name} ${profile.user.last_name}`,
                username: profile.username || profile.user.username,
                gender: profile.gender,
                aboutMe: profile.about_me || '',
                website: profile.website || '',
                location: profile.location || ''
            }
        })
    }

    onFieldChange = (id, value) => {
        this.setState(prevState => ({
            inputValues: {
                ...prevState.inputValues,
                [id]: value
            }
        }))
    }

    onGenderSelect = item => {
        this.setState(prevState => ({
            inputValues: {
                ...prevState.inputValues,
                gender: item
            }
        }))
    }

    onPlaceSelect = item => {
        this.setState(prevState => ({
            inputValues: {
                ...prevState.inputValues,
                location: item
            }
        }))
    }

    toggleEditMode = e => {
        this.setState({
            isEditing: !this.state.isEditing
        })
    }

    onClickSave = e => {
        const splited_name = this.state.inputValues.name.split()
        const datas = {
            user: {
                first_name: splited_name[0],
                last_name:
                    splited_name.length > 1
                        ? splited_name[splited_name.length - 1]
                        : ''
            },
            username: this.state.inputValues.username,
            gender: this.state.inputValues.gender,
            about_me: this.state.inputValues.aboutMe,
            location: this.state.inputValues.location,
            website: this.state.inputValues.website
        }
        this.props
            .saveProfile(datas)
            .then(res => this.toggleEditMode())
            .catch(() => {})
    }

    render() {
        return (
            <Card className="profile-card" id="profile">
                <CardHeader title="PROFILE">
                    <div className="profile-image-circle">
                        <Avatar size={85} />
                    </div>
                </CardHeader>
                <CardBody>
                    <ProfileCardContent
                        profile={this.state.inputValues}
                        isEditing={this.state.isEditing}
                        onFieldChange={this.onFieldChange}
                        onGenderSelect={this.onGenderSelect}
                        onPlaceSelect={this.onPlaceSelect}
                        errors={this.props.errors}
                    />
                    <div className="flex-1" />
                    <button
                        className="btn btn-primary btn-profile-edit btn-block"
                        onClick={
                            !this.state.isEditing
                                ? this.toggleEditMode
                                : this.onClickSave
                        }>
                        {!this.state.isEditing ? 'EDIT' : 'SAVE'}
                    </button>
                </CardBody>
            </Card>
        )
    }
}

const mapStateToProps = state => ({
    profile: state.UserProfile.profile,
    errors: state.UserProfile.hasError
})

const mapDispatchToProps = dispatch => ({
    fetchProfile() {
        return dispatch(userProfileActions.fetchProfile())
    },
    saveProfile(datas) {
        return dispatch(userProfileActions.saveProfile(datas))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileCard)
