import React from 'react'

const DocumentBlock = props => {
    const { className, documentUrl, documentId, deleteFn } = props
    const documentUrlSplitted = documentUrl.split('/')
    return (
        <a
            href={
                process.env.NODE_ENV === 'development'
                    ? 'http://localhost:8000' + documentUrl
                    : documentUrl
            }
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
