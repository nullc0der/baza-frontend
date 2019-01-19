import React, { Component } from 'react'
import Cropper from 'cropperjs'

import Dialog from 'components/ui/Dialog'

import s from './HashTag.scss'

function getRoundedCanvas(sourceCanvas) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var width = sourceCanvas.width;
    var height = sourceCanvas.height;
    canvas.width = width;
    canvas.height = height;
    context.imageSmoothingEnabled = true;
    context.drawImage(sourceCanvas, 0, 0, width, height);
    context.globalCompositeOperation = 'destination-in';
    context.beginPath();
    context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
    context.fill();
    return canvas;
}

export default class EditImage extends Component {
    state = {
        editedImage: '',
    }

    isRemoteImage = () => {
        return this.props.src.substr(4) === 'http'
    }

    componentDidMount = () => {
        this.cropper = new Cropper(this.img, {
            initialAspectRatio: 1,
            aspectRatio: 1,
            ready: () => {
                this.beginCrop()
            }
        })
    }

    componentWillUnmount = () => {
        this.cropper.destroy();
    }

    beginCrop = () => {
        console.log('can crop now')
    }

    onEditDone = () => {
        const croppedCanvas = this.cropper.getCroppedCanvas()
        const roundedCanvas = getRoundedCanvas(croppedCanvas)
        const image = roundedCanvas.toDataURL('image/png')

        this.props.onEditDone(image)
    }

    render() {
        const { src } = this.props

        const _footer = (
            <React.Fragment>
                <div
                    className='btn btn-light btn-cancel'
                    onClick={this.props.onRequestClose}>Cancel</div>
                <div
                    onClick={this.onEditDone}
                    className='btn btn-dark btn-done'>Done</div>
            </React.Fragment>
        )

        return (
            <Dialog
                isOpen
                title='Edit Image'
                className={s.editImage}
                onRequestClose={this.props.onRequestClose}
                footer={_footer}>
                <div className='edit-image-inner'>
                    <img
                        alt=''
                        ref={node => this.img = node}
                        className='image-to-edit'
                        src={src} />
                </div>
            </Dialog>
        )
    }
}
