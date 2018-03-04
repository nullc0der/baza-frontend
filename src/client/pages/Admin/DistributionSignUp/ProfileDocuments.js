import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions as distributionActions } from 'store/DistributionSignUp'

class ProfileDocuments extends Component {
  onRequestDocumentDelete = doc => {
    console.log('deleting doc: ', doc)
    this.props.deleteDocument(doc.id)
  }
  render() {
    const documents = this.props.list || []
    return (
      <div className="signup-details-section profile-documents-section">
        <div className="section-title">
          Documents
          {this.props.editMode && (
            <a href="#" className="badge badge-link badge-light">
              <i className="fa fa-plus" /> Add Documents
            </a>
          )}
        </div>
        <div className="documents-list mt-2">
          {documents.map((doc, index) => (
            <a key={index} href={doc.url} className="profile-document-item">
              <div className="document-image">
                <i className="fa fa-file" />
              </div>
              <div className="document-name">{doc.name}</div>
              {this.props.editMode && (
                <div
                  className="document-item-delete"
                  onClick={e => this.onRequestDocumentDelete(doc)}>
                  REMOVE
                </div>
              )}
            </a>
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  list: state.DistributionSignUp.data.documents
})

const mapDispatchToProps = dispatch => ({
  deleteDocument(documentId) {
    return dispatch(distributionActions.deleteDocument(documentId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDocuments)
