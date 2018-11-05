import React, { Component } from 'react'
import { CardContent } from 'components/ui/CardWithTabs'

const JOIN_STATUS_INFO = {
    open: 'Anyone can join without approval',
    closed: 'Staff invitation only',
    request: 'Request to join group for approval',
    invite: 'Any member can send invite'
}

export default class HeaderImages extends Component {
    render() {
        return (
            <CardContent>
                <div className="settings-section">
                    <div className="join-status-dropdown">
                        <p>Select how a member can join</p>
                        <div className="joinstatus-dropdown-group btn-group">
                            <button
                                className="dropdown-toggle btn btn-block btn-dark"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false">
                                {this.props.selectedGroupJoinType.name}
                            </button>
                            <div className="dropdown-menu">
                                {this.props.groupJoinTypes.map((item, i) => (
                                    <div
                                        key={i}
                                        className="dropdown-item"
                                        onClick={() =>
                                            this.props.onClickGroupJoinType(
                                                item
                                            )
                                        }>
                                        {item.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="join-status-info">
                            {
                                JOIN_STATUS_INFO[
                                    this.props.selectedGroupJoinType.id
                                ]
                            }
                        </div>
                    </div>
                    <div className="settings-toggles">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                onClick={() =>
                                    this.props.toggleInputs('autoApprovePost')
                                }
                                checked={this.props.autoApprovePost}
                            />
                            <label>Auto approve post</label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                onClick={() =>
                                    this.props.toggleInputs(
                                        'autoApproveComment'
                                    )
                                }
                                checked={this.props.autoApproveComment}
                            />
                            <label>Auto approve comment</label>
                        </div>
                    </div>
                    <div className="delete-section">
                        {this.props.flaggedForDelete ? (
                            <div className="well">
                                <p className="text-danger">
                                    This group will be deleted on{' '}
                                    {new Date(
                                        this.props.flaggedForDeleteOn
                                    ).toLocaleString()}
                                    , if it is not intentional edit group data
                                    within this period
                                </p>
                            </div>
                        ) : (
                            <button
                                className="btn btn-warning btn-lg delete-button"
                                onClick={this.props.deleteGroup}>
                                Delete this group
                            </button>
                        )}
                    </div>
                </div>
            </CardContent>
        )
    }
}
