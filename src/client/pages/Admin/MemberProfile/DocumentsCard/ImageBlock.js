import React from 'react'

const ImageBlock = props => {
    const { className, image, isActive, deleteFn, setActiveFn } = props
    return (
        <div className={className}>
            <img
                className="img-fluid"
                alt=""
                src={
                    process.env.NODE_ENV === 'development'
                        ? 'http://localhost:8000' + image.userphoto.photo
                        : image.userphoto.photo
                }
            />
            <div className="overlay">
                {!isActive && (
                    <i
                        className="fa fa-check"
                        title="Make profile image"
                        onClick={() => setActiveFn(image.id)}
                    />
                )}
                <i
                    className="fa fa-trash-o"
                    title="Delete"
                    onClick={() => deleteFn(image.id)}
                />
            </div>
        </div>
    )
}

export default ImageBlock
