import React from 'react'
import Config from 'utils/config'

const DocumentBlock = props => {
    const { className, documentUrl, documentId, deleteFn } = props
    const documentUrlSplitted = documentUrl.split('/')
    const href = Config.get('DOCUMENT_ROOT') + documentUrl
    return (
        <a
            href={href}
            target="_blank"
            style={{ textDecoration: 'none', color: '#273951' }}>
            <div className={className}>
                <i className="fa fa-file" />
                <p>{documentUrlSplitted[documentUrlSplitted.length - 1]}</p>
                <div className="overlay">
                    <i
                        className="fa fa-trash-o"
                        title="Delete"
                        onClick={e => deleteFn(e, documentId)}
                    />
                </div>
            </div>
        </a>
    )
}

export default DocumentBlock
