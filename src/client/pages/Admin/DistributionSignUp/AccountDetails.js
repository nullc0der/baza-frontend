import React, { Component } from 'react'

const AccountDetail = ({ label, children }) => (
    <div className="account-detail">
        <div className="label">{label}</div>
        <div className="value">{children}</div>
    </div>
)

export default class AccountDetails extends Component {
    render() {
        const { data } = this.props
        const STATUS = ['PENDING', 'APPROVED', 'DECLINED', 'INCOMPLETE']
        return (
            <div className="signup-details-section account-details-section">
                <AccountDetail label="STATUS">
                    <div className="status-dropdown-group btn-group">
                        <a
                            className="text-uppercase"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false">
                            {data.status}
                            <i
                                className="fa fa-caret-down"
                                style={{ marginLeft: '5px' }}
                            />
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
                            {STATUS.map((item, i) => (
                                <div key={i} className="dropdown-item">
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </AccountDetail>

                <AccountDetail label="SIGNUP DATE">
                    {new Date(data.signup_date).toLocaleDateString()}
                </AccountDetail>
                <AccountDetail label="VERIFIED DATE">
                    {data.verified_date &&
                        new Date(data.verified_date).toLocaleDateString()}
                </AccountDetail>
                <AccountDetail label="BIRTHDATE">
                    {new Date(data.birthdate).toLocaleDateString()}
                </AccountDetail>
                <AccountDetail label="REFERRAL CODE">5kbvnh</AccountDetail>

                <AccountDetail label="WALLET ADDRESS" />
                <AccountDetail label="ON DISTRIBUTION">
                    <div className="distribution-dropdown-group btn-group">
                        <a
                            className="text-uppercase"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false">
                            {data.on_distribution.toString()}
                            <i
                                className="fa fa-caret-down"
                                style={{ marginLeft: '5px' }}
                            />
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
                            {['TRUE', 'FALSE'].map((item, i) => (
                                <div key={i} className="dropdown-item">
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </AccountDetail>
            </div>
        )
    }
}
