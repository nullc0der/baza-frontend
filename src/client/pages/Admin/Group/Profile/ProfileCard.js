import React, { Component, Fragment } from 'react'
import classnames from 'classnames'
import get from 'lodash/get'

import Dialog from 'components/ui/Dialog'
import TextField from 'components/ui/TextField'
import DropZoneWrapper from 'components/ui/DropZoneWrapper'
import GroupCard from 'pages/Admin/Group/GroupCard'

import s from './Profile.scss'

const GroupTypesDropdown = props => {
    return (
        <Fragment>
            <div className="grouptypes-dropdown-group btn-group">
                <a
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false">
                    {props.selectedGroupType
                        ? props.selectedGroupType.name
                        : 'Select group type'}
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
            <div className="text-danger grouptypes-dropdown-error mb-2">
                {props.errorState}
            </div>
        </Fragment>
    )
}

export default class ProfileCard extends Component {
    state = {
        groupProfileEditModalIsOpen: false,
        inputValues: {
            name: '',
            description: '',
            ldescription: '',
            otherGroupType: '',
            groupDropdown: '',
            logo: null,
            header: null
        },
        errorValues: {
            name: null,
            description: null,
            ldescription: null,
            otherGroupType: null,
            groupDropdown: null,
            logo: null,
            header: null,
            nonField: []
        }
    }

    groupTypes = [
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

    componentDidMount = () => {
        this.setInputValues()
    }

    componentDidUpdate = prevProps => {
        if (prevProps.group !== this.props.group) {
            this.setInputValues()
        }
    }

    setInputValues = () => {
        const { group } = this.props
        if (group) {
            const groupDropdown = this.groupTypes.filter(
                x => x.name.toLowerCase() === group.group_type.toLowerCase()
            )
            this.setState({
                inputValues: {
                    name: group.name,
                    description: group.about,
                    otherGroupType: group.group_type_other || '',
                    groupDropdown: groupDropdown.length
                        ? groupDropdown[0]
                        : this.groupTypes[8],
                    logo: null,
                    header: null
                }
            })
        }
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

    onDropLogo = acceptedFiles => {
        this.setState(prevState => ({
            inputValues: {
                ...prevState.inputValues,
                logo: acceptedFiles
            }
        }))
    }

    onLogoTrashClick = (e, filename) => {
        e.stopPropagation()
        this.setState(prevState => ({
            inputValues: {
                ...prevState.inputValues,
                logo: prevState.inputValues.logo.filter(
                    f => f.name !== filename
                )
            }
        }))
    }

    onDropHeader = acceptedFiles => {
        this.setState(prevState => ({
            inputValues: {
                ...prevState.inputValues,
                header: acceptedFiles
            }
        }))
    }

    onHeaderTrashClick = (e, filename) => {
        e.stopPropagation()
        this.setState(prevState => ({
            inputValues: {
                ...prevState.inputValues,
                header: prevState.inputValues.header.filter(
                    f => f.name !== filename
                )
            }
        }))
    }

    toggleEditModal = () => {
        this.setState({
            groupProfileEditModalIsOpen: !this.state.groupProfileEditModalIsOpen
        })
    }

    resetErrorValues = () => {
        this.setState({
            errorValues: {
                name: null,
                description: null,
                ldescription: null,
                otherGroupType: null,
                groupDropdown: null,
                logo: null,
                header: null,
                nonField: []
            }
        })
    }

    renderFooter = () => {
        return (
            <div className="card-action" onClick={this.toggleEditModal}>
                Edit
            </div>
        )
    }

    onClickSubmit = () => {
        const data = new FormData()
        data.append('name', this.state.inputValues.name)
        data.append('about', this.state.inputValues.description)
        data.append('group_type_value', this.state.inputValues.groupDropdown.id)
        data.append(
            'group_type_other',
            this.state.inputValues.groupDropdown.id === 9
                ? this.state.inputValues.otherGroupType
                : ''
        )
        if (this.state.inputValues.logo) {
            data.append('logo', this.state.inputValues.logo[0])
        }
        if (this.state.inputValues.header) {
            data.append('header_image', this.state.inputValues.header[0])
        }
        this.props
            .editGroup(this.props.group.id, data)
            .then(res => {
                this.resetErrorValues()
                this.toggleEditModal()
            })
            .catch(err => {
                this.setState({
                    errorValues: {
                        name: get(err, 'name', null),
                        description: get(err, 'about', null),
                        otherGroupType: get(err, 'group_type_other', null),
                        groupDropdown: get(err, 'group_type_value', null),
                        logo: get(err, 'logo', null),
                        header: get(err, 'header_image', null),
                        nonField: get(err, 'non_field_errors', [])
                    }
                })
            })
    }

    render() {
        const { group, className } = this.props
        const cx = classnames(s.profileCard, className)
        return (
            <div className={cx}>
                <GroupCard
                    id={group.id}
                    name={group.name}
                    category={group.group_type}
                    headerURL={group.header_image_url}
                    logoURL={group.logo_url}
                    description={group.about}
                    members={group.members.length}
                    subscribers={group.subscribers.length}
                    footer={this.renderFooter()}
                />
                <Dialog
                    className={s.profileCard}
                    isOpen={this.state.groupProfileEditModalIsOpen}
                    title={`Edit Group ${group.name}`}
                    onRequestClose={this.toggleEditModal}>
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
                        groupTypes={this.groupTypes}
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
                    <DropZoneWrapper
                        className={
                            this.state.errorValues.logo ? 'mb-3' : 'mb-2'
                        }
                        label="Drop group logo here"
                        files={this.state.inputValues.logo}
                        onDrop={this.onDropLogo}
                        onTrashClick={this.onLogoTrashClick}
                        hasError={this.state.errorValues.logo}
                        multiple={false}
                    />
                    <DropZoneWrapper
                        className={
                            this.state.errorValues.header ? 'mb-3' : 'mb-2'
                        }
                        label="Drop group header here"
                        files={this.state.inputValues.header}
                        onDrop={this.onDropHeader}
                        onTrashClick={this.onHeaderTrashClick}
                        hasError={this.state.errorValues.header}
                        multiple={false}
                    />
                    {!!this.state.errorValues.nonField.length && (
                        <div className="well">
                            {this.state.errorValues.nonField.map((x, i) => (
                                <p key={i} className="text-danger">
                                    {x}
                                </p>
                            ))}
                        </div>
                    )}
                    <button
                        className="btn btn-block btn-dark"
                        onClick={this.onClickSubmit}>
                        SUBMIT
                    </button>
                </Dialog>
            </div>
        )
    }
}
