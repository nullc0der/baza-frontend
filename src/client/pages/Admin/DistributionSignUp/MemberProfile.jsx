import React, { Component } from 'react'
import { Card, CardHeader, CardBody } from 'components/ui/CardWithTabs'
import Avatar from 'components/Avatar'

class MemberProfileCard extends Component {
    render() {
        const { userProfile } = this.props
        return (
            <Card className="member-profile-card" id="memberProfileCard">
                <CardHeader title="Member Profile" />
                <CardBody>
                    <div className="row align-items-center">
                        <div className="col-md-1">
                            <Avatar
                                className="avatar-image"
                                size={90}
                                otherProfile={{
                                    username: userProfile.username,
                                    profile_photo: userProfile.user_image_url,
                                    default_avatar_color:
                                        userProfile.user_avatar_color
                                }}
                                own={false}
                            />
                        </div>
                        <div className="col-md-7">
                            <div className="row">
                                <div className="col-md-12 text-box">
                                    <div className="title">Username</div>
                                    <div className="content">
                                        {userProfile.username}
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-6 text-box">
                                    <div className="title">Birth Date</div>
                                    <div className="content">
                                        {new Date(
                                            userProfile.birthdate
                                        ).toLocaleDateString()}
                                    </div>
                                </div>
                                <div className="col-md-6 text-box">
                                    <div className="title">Joined</div>
                                    <div className="content">
                                        {new Date(
                                            userProfile.date_joined
                                        ).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-md-8 text-box">
                            <div className="title">Emails</div>
                            {userProfile.emails.map((email, i) => (
                                <div
                                    className={`${
                                        i !== 0
                                            ? 'content-with-badge mt-1'
                                            : 'content-with-badge'
                                    }`}
                                    key={i}>
                                    <div className="content">
                                        {email.email_id}
                                    </div>
                                    {!!email.primary && (
                                        <span className="badge badge-info">
                                            Primary
                                        </span>
                                    )}
                                    <span
                                        className={`${
                                            email.verified
                                                ? 'badge badge-success'
                                                : 'badge badge-danger'
                                        }`}>
                                        {email.verified
                                            ? 'Verified'
                                            : 'Not Verified'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-md-8 text-box">
                            <div className="title">Phones</div>
                            {userProfile.phones.map((phone, i) => (
                                <div
                                    className={`${
                                        i !== 0
                                            ? 'content-with-badge mt-1'
                                            : 'content-with-badge'
                                    }`}
                                    key={i}>
                                    <div className="content">
                                        {phone.phone_number}
                                    </div>
                                    {!!phone.primary && (
                                        <span className="badge badge-info">
                                            Primary
                                        </span>
                                    )}
                                    <span
                                        className={`${
                                            phone.verified
                                                ? 'badge badge-success'
                                                : 'badge badge-danger'
                                        }`}>
                                        {phone.verified
                                            ? 'Verified'
                                            : 'Not Verified'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardBody>
            </Card>
        )
    }
}

export default MemberProfileCard
