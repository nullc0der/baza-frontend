import React, { Component, Fragment } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import includes from 'lodash/includes'
import get from 'lodash/get'

import { actions as groupActions } from 'store/Group'

import Dialog from 'components/ui/Dialog'
import TextField from 'components/ui/TextField'

import GroupCard from './GroupCard'
import s from './Group.scss'

const GroupTypesDropdown = props => {
    return (
        <Fragment>
            <div
                className={`grouptypes-dropdown-group btn-group ${
                    props.errorState ? 'mb-3' : 'mb-2'
                }`}>
                <a
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false">
                    {props.selectedGroupType
                        ? props.selectedGroupType.name
                        : 'Art'}
                </a>
                <div className="dropdown-menu">
                    {props.groupTypes.map((item, i) => (
                        <div
                            key={i}
                            className="dropdown-item"
                            onClick={() =>
                                props.onGroupTypeSelect('groupDropdown', item)
                            }>
                            {item.name}
                        </div>
                    ))}
                </div>
            </div>
            {props.errorState && (
                <div className="ui-textfield-error">{props.errorState}</div>
            )}
        </Fragment>
    )
}

class Group extends Component {
    state = {
        createGroupDialogIsOpen: false,
        inputValues: {
            name: '',
            description: '',
            otherGroupType: '',
            groupDropdown: ''
        },
        errorValues: {
            name: null,
            description: null,
            otherGroupType: null,
            groupDropdown: null
        }
    }

    componentDidMount() {
        this.props.fetchGroups()
    }

    toggleCreateGroupDialog = () => {
        this.setState({
            createGroupDialogIsOpen: !this.state.createGroupDialogIsOpen
        })
    }

    onInputChange = (id, value) => {
        this.setState(prevState => ({
            inputValues: {
                ...prevState.inputValues,
                [id]: value
            },
            errorValues: {
                ...prevState.errorValues,
                [id]: null
            }
        }))
    }

    resetInputAndErrorValues = () => {
        this.setState({
            inputValues: {
                name: '',
                description: '',
                otherGroupType: '',
                groupDropdown: ''
            },
            errorValues: {
                name: null,
                description: null,
                otherGroupType: null,
                groupDropdown: null
            }
        })
    }

    onCreateGroupClick = () => {
        this.props
            .createGroup({
                name: this.state.inputValues.name,
                short_about: this.state.inputValues.description,
                group_type: this.state.inputValues.groupDropdown.id,
                group_type_other:
                    this.state.inputValues.groupDropdown.id === 9
                        ? this.state.inputValues.otherGroupType
                        : ''
            })
            .then(res => {
                this.resetInputAndErrorValues()
                this.toggleCreateGroupDialog()
            })
            .catch(err => {
                this.setState({
                    errorValues: {
                        name: get(err, 'name', null),
                        description: get(err, 'description', null),
                        groupDropdown: get(err, 'group_type', null),
                        otherGroupType: get(err, 'group_type_other', null)
                    }
                })
            })
    }

    render() {
        const { className, groups, userProfile } = this.props

        const groupTypes = [
            { id: 1, name: 'Art' },
            { id: 2, name: 'Activist' },
            { id: 3, name: 'Political' },
            { id: 4, name: 'News' },
            { id: 5, name: 'Business' },
            { id: 6, name: 'Government' },
            { id: 7, name: 'Blog' },
            { id: 8, name: 'Nonprofit Organaization' },
            { id: 9, name: 'Other' }
        ]

        const cx = classnames(s.container, className)
        return (
            <div className={cx}>
                <div
                    className="ui-group-card create-new"
                    onClick={this.toggleCreateGroupDialog}>
                    <i className="fa fa-plus" />
                </div>
                {groups.map((x, i) => {
                    return (
                        <GroupCard
                            key={i}
                            id={x.id}
                            name={x.name}
                            category={x.group_type}
                            isSubscribed={includes(
                                x.subscribers,
                                userProfile.username ||
                                    userProfile.user.username
                            )}
                            isMember={includes(
                                x.members,
                                userProfile.username ||
                                    userProfile.user.username
                            )}
                            joinRequestSent={false}
                            headerURL={x.header_image_url}
                            logoURL={x.logo_url}
                            members={x.members.length}
                            subscribers={x.subscribers.length}
                            shortDescription={x.short_about}
                            joinStatus={x.join_status}
                            permissionSet={x.user_permission_set}
                            onSubscribeButtonClick={() => {}}
                            onJoinButtonClick={() => {}}
                        />
                    )
                })}
                <Dialog
                    className={s.container}
                    isOpen={this.state.createGroupDialogIsOpen}
                    title="Create A Group"
                    onRequestClose={this.toggleCreateGroupDialog}>
                    <TextField
                        id="name"
                        label="Name"
                        className={
                            this.state.errorValues.name ? 'mb-3' : 'mb-2'
                        }
                        value={this.state.inputValues.name}
                        onChange={this.onInputChange}
                        errorState={this.state.errorValues.name}
                    />
                    <TextField
                        id="description"
                        label="Description"
                        className={
                            this.state.errorValues.description ? 'mb-3' : 'mb-2'
                        }
                        value={this.state.inputValues.description}
                        onChange={this.onInputChange}
                        errorState={this.state.errorValues.description}
                    />
                    <GroupTypesDropdown
                        groupTypes={groupTypes}
                        selectedGroupType={this.state.inputValues.groupDropdown}
                        errorState={this.state.errorValues.groupDropdown}
                        onGroupTypeSelect={this.onInputChange}
                    />
                    {this.state.inputValues.groupDropdown.id === 9 && (
                        <TextField
                            id="otherGroupType"
                            label="Please Specify"
                            className={
                                this.state.errorValues.otherGroupType
                                    ? 'mb-3'
                                    : 'mb-2'
                            }
                            value={this.state.inputValues.otherGroupType}
                            onChange={this.onInputChange}
                            errorState={this.state.errorValues.otherGroupType}
                        />
                    )}
                    <button
                        className="btn btn-block btn-dark"
                        onClick={this.onCreateGroupClick}>
                        CREATE
                    </button>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    groups: state.Group.groups,
    userProfile: state.UserProfile.profile
})

const mapDispatchToProps = dispatch => ({
    fetchGroups: () => dispatch(groupActions.fetchGroups()),
    createGroup: data => dispatch(groupActions.createGroup(data))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Group)
