import React, { Component } from 'react'
import Cropper from 'cropperjs'

import Dialog from 'components/ui/Dialog'

import s from './HashTag.scss'

export default class EditImage extends Component {
    state = {
        editedImage: ''
    }

    componentDidMount = () => {
        this.cropper = new Cropper(this.img, {
            initialAspectRatio: 1,
            ready: () => {
                this.beginCrop()
            }
        })

        window.xx = this
    }

    componentWillUnmount = () => {
        this.cropper.destroy();
    }

    beginCrop = () => {
        console.log('can crop now')
    }

    onEditDone = () => {
        const cropped = this.cropper.getCroppedCanvas()
        const image = cropped.toDataURL('image/jpeg')

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
