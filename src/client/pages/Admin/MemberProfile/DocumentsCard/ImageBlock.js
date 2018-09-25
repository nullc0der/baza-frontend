import React from 'react'

const ImageBlock = props => {
    const {
        className,
        imageUrl,
        isActive = false,
        imageId,
        deleteFn,
        setActiveFn
    } = props
    return (
        <div className={className}>
            <img
                className="img-fluid"
                alt=""
                src={
                    process.env.NODE_ENV === 'development'
                        ? 'http://localhost:8000' + imageUrl
                        : imageUrl
                }
            />
            <div className="overlay">
                {!isActive && (
                    <i
                        className="fa fa-check"
                        title="Make profile image"
                        onClick={() => setActiveFn(imageId)}
                    />
                )}
                <i
                    className="fa fa-trash-o"
                    title="Delete"
                    onClick={() => deleteFn(imageId)}
                />
            </div>
        </div>
    )
}

export default ImageBlock
