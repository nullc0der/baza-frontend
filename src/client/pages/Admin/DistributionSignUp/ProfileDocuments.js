import React, { Component } from 'react'

const DOCUMENTS_LIST = [
  {
    name: 'Agreement.pdf',
    href: '#'
  },
  {
    name: 'Support.pdf',
    href: '#'
  }
]

export default class ProfileDocuments extends Component {
  render() {
    return (
      <div className="signup-details-section profile-documents-section">
        <div className="section-title">
          Documents
          <a href="#" className="badge badge-link badge-light">
            <i className="fa fa-plus" /> Add Documents
          </a>
        </div>
        <div className="documents-list mt-2">
          {DOCUMENTS_LIST.map((doc, index) => (
            <a key={index} href={doc.href} className="profile-document-item">
              <div className="document-image">
                <i className="fa fa-file" />
              </div>
              <div className="document-name">{doc.name}</div>
            </a>
          ))}
        </div>
      </div>
    )
  }
}
