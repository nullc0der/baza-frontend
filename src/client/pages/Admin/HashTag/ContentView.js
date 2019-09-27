import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import ColorPicker from 'components/ui/ColorPicker'

import CircularImage from 'components/ui/CircularImage'
import ImageEditor from 'components/ImageEditor'
import ProfileGallery from './ProfileGallery'
import NotConnectedDialog from './NotConnectedDialog'

import s from './HashTag.scss'
import SVGTemplate from './SVGTemplate'
import { actions as hashtagActions } from 'store/HashTag'
import { dataURLtoBlob, imageToDataURL } from 'utils/common'

// function downloadDataURI(dataURI) {
//     var buffer = new ArrayBuffer(dataURI.length)
//     var view = new Uint8Array(buffer)

//     for (let i = 0; i < dataURI.length; i++) {
//         view[i] = dataURI.charCodeAt(i) & 0xff;
//     }
//     var mimeType = 'image/png'
//     var blob;
//     try {
//         blob = new Blob([buffer], { type: mimeType });
//     } catch (e) {
//         var bb = new (window.WebKitBlobBuilder || window.MozBlobBuilder)();
//         bb.append(buffer);
//         blob = bb.getBlob(mimeType);
//     }

//     var url = (window.webkitURL || window.URL).createObjectURL(blob)
//     return url
// }

function getScalingFactors(context, image, provider) {
    var x
    var y
    if (provider.name === 'Facebook') {
        x = 600
        y = 600
    } else if (provider.name === 'Twitter') {
        x = 400
        y = 400
    } else {
        throw new Error(
            `Unknown provider. Cannot get scaling: ` + provider.name
        )
    }

    var scaleX = x / image.naturalWidth
    var scaleY = y / image.naturalHeight

    return { scaleX, scaleY }
}

function getFinalImagePNG(provider) {
    const svg = document.getElementById('final-image-svg')
    const svgStr = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    canvas.width = 128
    canvas.height = 128

    const _URL = window.URL || window.webkitURL
    const img = new Image()

    var svgBlob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' })

    return new Promise((resolve, reject) => {
        var url = _URL.createObjectURL(svgBlob)
        img.onload = function() {
            // ctx.drawImage(img, 0, 0)
            let { scaleX, scaleY } = getScalingFactors(ctx, img, provider)
            canvas.width = canvas.width * scaleX
            canvas.height = canvas.height * scaleY
            ctx.scale(scaleX, scaleY) // Scale canvas
            ctx.drawImage(img, 0, 0) // Draw the scaled image
            let finalImage = canvas.toDataURL('image/png')
            _URL.revokeObjectURL(url)
            resolve(finalImage)
        }

        img.src = url
    })
}

function downloadAs(filename, data) {
    const el = document.createElement('a')
    el.setAttribute('href', data)
    el.setAttribute('download', filename)

    el.style.display = 'none'
    document.body.appendChild(el)

    el.click()

    setTimeout(() => {
        document.body.removeChild(el)
    }, 500)
}

class HashTagContent extends Component {
    state = {
        previewImage: '',
        croppedImage: '',
        showCropper: false,
        textColor: '#888',
        semiCircleColor: '#fff',
        showBGColorPicker: false,
        showTextColorPicker: false
    }

    onImageUpload = e => {
        const file = e.target.files[0]
        const reader = new FileReader()

        this.setState({ previewImage: '' })
        reader.onloadend = () => {
            this.setState({ previewImage: reader.result, showCropper: true })
        }

        if (file) {
            reader.readAsDataURL(file)
        } else {
            throw new Error('Cannot read image file')
        }
    }

    onGalleryImageSelect = imageSrc => {
        const safeImageUrl =
            '/get-safe-image?src=' + encodeURIComponent(imageSrc)
        console.log('selecting: ', safeImageUrl)
        this.setState({ previewImage: safeImageUrl, showCropper: true })
        // imageToDataURL(safeImageUrl).then((dataUrl) => {
        //     this.setState({ previewImage: dataUrl, showCropper: true })
        // }).catch(err => {
        //     alert(err.message)
        // })
    }

    onEditDone = croppedImage => {
        this.setState({ croppedImage }, this.onCropperClose)
    }

    onCropperClose = () => {
        document.querySelector('.input-file[type="file"]').value = ''
        this.setState({ showCropper: false, previewImage: '' })
    }

    downloadImage = () => {
        const selectedProvider = this.props.providers[
            this.props.selectedProvider
        ]
        const { croppedImage } = this.state
        if (!croppedImage) {
            return
        }

        getFinalImagePNG(selectedProvider)
            .then(data => {
                downloadAs('baza-avatar.png', data)
            })
            .catch(err => {
                alert(err.message)
            })

        // return croppedImage
    }

    getImageFromSocial = () => {
        console.log('will fetch and set image from social network')
        const selectedProvider = this.props.providers[
            this.props.selectedProvider
        ]
        const provider = selectedProvider.name.toLowerCase()
        this.setState({ isDownloading: true })

        this.props
            .downloadPhotoFromSocial(provider)
            .then(response => response.data.photo_url)
            .then(imageToDataURL)
            .then(this.handleImageLoadSuccess)
            .catch(this.handleImageLoadError)
    }

    handleImageLoadSuccess = imageUrl => {
        this.setState({
            isDownloading: false,
            previewImage: imageUrl,
            showCropper: true
        })
    }
    handleImageLoadError = err => {
        this.setState({ isDownloading: false })
    }

    uploadImageToSocial = () => {
        console.log('will upload image to social network')

        const selectedProvider = this.props.providers[
            this.props.selectedProvider
        ]
        const { croppedImage } = this.state
        if (!croppedImage) {
            return
        }
        // const imageBlob = dataURLtoBlob(finalImage)
        const shortName = selectedProvider.name.toLowerCase()
        this.setState({ isUploading: true })
        getFinalImagePNG(selectedProvider)
            .then(dataUrl =>
                this.props.uploadPhotoToSocial(
                    shortName,
                    dataURLtoBlob(dataUrl)
                )
            )
            .then(response => {
                this.setState({ isUploading: false })
                shortName === 'facebook'
                    ? this.openFBShare(response.data.url)
                    : this.openSuccessDialog(selectedProvider.provider)
            })
            .catch(err => {
                this.setState({ isUploading: false })
                alert(err.message)
            })
    }

    openFBShare = href => {
        window.FB.ui(
            {
                method: 'share',
                href
            },
            () => this.openSuccessDialog('facebook')
        )
    }

    openSuccessDialog = provider => {
        const message =
            provider === 'facebook'
                ? 'Successfully shared image on your wall'
                : 'Successfully set image as profile picture'
        alert(message)
    }

    onSemiCircleColorChange = color => {
        console.log('semi circle', color)
        const c = color.rgb
        const semiCircleColor = `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a})`
        this.setState({ semiCircleColor })
    }

    onTextColorChange = color => {
        // console.log('text color', color)
        const c = color.rgb
        const textColor = `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a})`
        this.setState({ textColor })
    }

    render() {
        const cx = classnames(s.contentView)
        const {
            previewImage,
            showCropper,
            croppedImage,
            textColor,
            semiCircleColor,
            showTextColorPicker,
            showBGColorPicker,
            isDownloading,
            isUploading
        } = this.state

        const { providers } = this.props
        const selectedProvider = providers[this.props.selectedProvider]

        return (
            <div className={cx}>
                <h3 className="content-title">Basic Income Hashtag App</h3>
                {!selectedProvider.connected && (
                    <NotConnectedDialog provider={selectedProvider} />
                )}
                {showCropper && (
                    <ImageEditor
                        cropRounded
                        src={previewImage}
                        onEditDone={this.onEditDone}
                        onRequestClose={this.onCropperClose}
                    />
                )}
                <div className="preview-section">
                    <CircularImage size={128} src={croppedImage} />
                    <div className="arrow">
                        <i className="fa fa-arrow-right" />
                    </div>
                    <SVGTemplate
                        id="final-image-svg"
                        textColor={textColor}
                        semiCircleColor={semiCircleColor}
                        imageData={croppedImage}
                    />
                    {/* <CircularImage size={128} src={croppedImage} /> */}
                </div>
                <div className="actions mt-3">
                    <div className="btn btn-light btn-upload-local">
                        Upload New Image
                        <i className="fa fa-cloud-upload" />
                        <input
                            className="input-file"
                            type="file"
                            accept="image/*"
                            name="localImage"
                            onChange={this.onImageUpload}
                        />
                    </div>
                    <div
                        className="btn btn-light"
                        onClick={this.getImageFromSocial}>
                        Use from {selectedProvider.name}
                        {isDownloading ? (
                            <i className={`fa fa-spinner fa-pulse fa-fw`} />
                        ) : (
                            <i className={`fa fa-${selectedProvider.icon}`} />
                        )}
                    </div>
                    <div
                        className="btn btn-light position-relative"
                        onClick={() =>
                            this.setState({ showBGColorPicker: true })
                        }>
                        Change Background Color
                        <i className="fa fa-eyedropper" />
                        {showBGColorPicker && (
                            <ColorPicker
                                color={semiCircleColor}
                                onChange={this.onSemiCircleColorChange}
                                onRequestClose={() =>
                                    this.setState({ showBGColorPicker: false })
                                }
                            />
                        )}
                    </div>
                    <div
                        className="btn btn-light position-relative"
                        onClick={() =>
                            this.setState({ showTextColorPicker: true })
                        }>
                        Change Text Color
                        <i className="fa fa-eyedropper" />
                        {showTextColorPicker && (
                            <ColorPicker
                                color={textColor}
                                onChange={this.onTextColorChange}
                                onRequestClose={() =>
                                    this.setState({
                                        showTextColorPicker: false
                                    })
                                }
                            />
                        )}
                    </div>
                </div>
                <ProfileGallery onImageSelect={this.onGalleryImageSelect} />
                <div className="final-actions actions">
                    <div
                        className="btn btn-dark btn-large btn-download"
                        onClick={this.downloadImage}>
                        Download Image
                    </div>
                    <div
                        className={`btn btn-dark btn-large ${selectedProvider.className}`}
                        onClick={this.uploadImageToSocial}>
                        Upload to {selectedProvider.name}
                        {isUploading && (
                            <i className={`fa fa-spinner fa-pulse fa-fw`} />
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    selectedProvider: state.HashTag.selectedProvider,
    providers: state.HashTag.providers
})

const mapDispatchToProps = dispatch => ({
    uploadPhotoToSocial(provider, photo) {
        return dispatch(hashtagActions.uploadImage(provider, photo))
    },
    downloadPhotoFromSocial(provider) {
        return dispatch(hashtagActions.downloadImage(provider))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HashTagContent)
