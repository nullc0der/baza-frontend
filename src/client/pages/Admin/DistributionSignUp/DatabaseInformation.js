import React, { Component } from 'react'

export default class DatabaseInformation extends Component {
    static defaultProps = {
        primary: false,
        valid: false,
        geoIPValid: false
    }
    render() {
        const { title, primary, valid, geoIPValid, address } = this.props
        return (
            <div className="signup-details-section database-info-section">
                <div className="section-title">
                    <div className="title-text">{title}</div>
                    {primary && (
                        <div className="badge badge-pill badge-info text-white">
                            Primary
                        </div>
                    )}
                    {valid && (
                        <div className="badge badge-pill badge-success text-white">
                            Validated
                        </div>
                    )}
                    {geoIPValid && (
                        <div className="badge badge-pill badge-light">
                            <i className="fa fa-check-circle text-success" />
                            GeoIP is within range
                        </div>
                    )}
                </div>
                <div className="row">
                    <div className="col-md-6 mt-2">
                        <div className="profile-detail">
                            <div className="label">HOUSE NO.</div>
                            <div className="value">{address.house_number}</div>
                        </div>
                        <div className="profile-detail">
                            <div className="label">STREET</div>
                            <div className="value">{address.street_name}</div>
                        </div>
                        <div className="profile-detail">
                            <div className="label">CITY</div>
                            <div className="value">{address.city}</div>
                        </div>
                        <div className="profile-detail">
                            <div className="label">COUNTRY</div>
                            <div className="value">{address.country}</div>
                        </div>
                    </div>
                    <div className="col-md-6 mt-2">
                        <div className="profile-detail">
                            <div className="label">STATE</div>
                            <div className="value">{address.state}</div>
                        </div>
                        <div className="profile-detail">
                            <div className="label">ZIP CODE</div>
                            <div className="value">{address.zip_code}</div>
                        </div>
                        <div className="profile-detail">
                            <div className="label">LATITUDE</div>
                            <div className="value">{address.latitude}</div>
                        </div>
                        <div className="profile-detail">
                            <div className="label">LONGITUDE</div>
                            <div className="value">{address.longitude}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
