import React from 'react'
import Config from 'utils/config'

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
                src={Config.get('API_ROOT') + imageUrl}
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
