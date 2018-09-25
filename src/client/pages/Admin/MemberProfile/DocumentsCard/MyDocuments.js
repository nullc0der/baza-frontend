import React, { Component } from 'react'
import { connect } from 'react-redux'

import { CardContent } from 'components/ui/CardWithTabs'

import { actions as userProfileActions } from 'store/UserProfile'

import DocumentBlock from './DocumentBlock'

class MyDocuments extends Component {
    state = {
        documentUploading: false
    }

    componentDidMount() {
        this.props
            .fetchUserDocuments()
            .then(res => {})
            .catch(res => {})
    }

    onAddNewClick = () => {
        this.refs.userDocumentUploader.click()
    }

    onFileInputChange = e => {
        if (e.target.files) {
            this.setState({
                documentUploading: true
            })
            const document = e.target.files[0]
            const data = new FormData()
            data.append('document', document)
            this.props
                .saveUserDocument(data)
                .then(res =>
                    this.setState({
                        documentUploading: false
                    })
                )
                .catch(res => {
                    this.setState({
                        documentUploading: false
                    })
                })
        }
    }

    onUserDocumentDeleteClick = (e, documentID) => {
        e.stopPropagation()
        e.preventDefault()
        const datas = {
            document_id: documentID
        }
        this.props.deleteUserDocument(datas)
    }

    render() {
        return (
            <CardContent>
                <div className="profile-images">
                    <div
                        className="profile-image is-add-new"
                        onClick={this.onAddNewClick}>
                        <input
                            type="file"
                            accept="*/*"
                            className="input-field"
                            ref="userDocumentUploader"
                            onChange={this.onFileInputChange}
                        />
                        {this.state.documentUploading ? (
                            <i className="fa fa-spin fa-refresh" />
                        ) : (
                            <i className="fa fa-plus" />
                        )}
                    </div>
                    {this.props.userDocuments.map((x, i) => (
                        <DocumentBlock
                            className="profile-image is-file"
                            key={i}
                            documentUrl={x.document}
                            documentId={x.id}
                            deleteFn={this.onUserDocumentDeleteClick}
                        />
                    ))}
                </div>
            </CardContent>
        )
    }
}

const mapStateToProps = state => ({
    userDocuments: state.UserProfile.userDocuments
})

const mapDispatchToProps = dispatch => ({
    fetchUserDocuments() {
        return dispatch(userProfileActions.fetchUserDocuments())
    },
    saveUserDocument(datas) {
        return dispatch(userProfileActions.saveUserDocument(datas))
    },
    deleteUserDocument(datas) {
        return dispatch(userProfileActions.deleteUserDocument(datas))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyDocuments)
