import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import ColorPicker from 'components/ui/ColorPicker'

import CircularImage from 'components/ui/CircularImage'
import ProfileGallery from './ProfileGallery'

import s from './HashTag.scss'
import EditImage from './EditImage';
import SVGTemplate from './SVGTemplate';
import { Promise } from 'q';

// function imageToDataURL(imageSrc) {
//     const img = document.createElement('img')
//     img.crossOrigin = 'Anonymous'
//     const canvas = document.createElement('canvas')

//     return new Promise((resolve, reject) => {
//         img.onload = function () {
//             canvas.height = img.naturalHeight
//             canvas.width = img.naturalWidth

//             let ctx = canvas.getContext('2d');
//             ctx.drawImage(img, img.naturalWidth, img.naturalHeight)
//             resolve(canvas.toDataURL())
//         }

//         img.onerror = function () {
//             reject(new Error('Cannot load image'))
//         }

//         img.src = imageSrc
//     })
// }

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

function getFinalImagePNG() {
    const svg = document.getElementById('final-image-svg')
    const svgStr = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    canvas.width = 128
    canvas.height = 128

    const _URL = (window.URL || window.webkitURL)
    const img = new Image()

    var svgBlob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' })
    var url = _URL.createObjectURL(svgBlob)

    return new Promise((resolve, reject) => {
        img.onload = function () {
            ctx.drawImage(img, 0, 0)
            let finalImage = canvas.toDataURL("image/png")
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

    el.click();

    setTimeout(() => {
        document.body.removeChild(el)
    }, 500)
}

class HashTagContent extends Component {
    static propTypes = {
        selectedProvider: PropTypes.string,
    }

    state = {
        previewImage: '',
        croppedImage: '',
        showCropper: false,
        textColor: '#888',
        semiCircleColor: '#fff',
        showBGColorPicker: false,
        showTextColorPicker: false
    }

    onImageUpload = (e) => {
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

    onGalleryImageSelect = (imageSrc) => {
        const safeImageUrl = '/get-safe-image?src=' + encodeURIComponent(imageSrc)
        console.log('selecting: ', safeImageUrl)
        this.setState({ previewImage: safeImageUrl, showCropper: true })
        // imageToDataURL(safeImageUrl).then((dataUrl) => {
        //     this.setState({ previewImage: dataUrl, showCropper: true })
        // }).catch(err => {
        //     alert(err.message)
        // })
    }

    onEditDone = (croppedImage) => {
        this.setState({ croppedImage }, this.onCropperClose)
    }

    onCropperClose = () => {
        document.querySelector('.input-file[type="file"]').value = ''
        this.setState({ showCropper: false, previewImage: '' })
    }

    downloadImage = () => {
        const { croppedImage } = this.state
        if (!croppedImage) {
            return;
        }

        getFinalImagePNG().then(data => {
            downloadAs('baza-avatar.png', data)
        }).catch(err => {
            alert(err.message)
        })

        // return croppedImage
    }

    getImageFromSocial = () => {
        console.log('will fetch and set image from social network')
    }

    uploadImageToSocial = () => {
        console.log('will upload image to social network')
    }

    onSemiCircleColorChange = (color) => {
        console.log('semi circle', color)
        const c = color.rgb;
        const semiCircleColor = `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a})`
        this.setState({ semiCircleColor })
    }

    onTextColorChange = (color) => {
        // console.log('text color', color)
        const c = color.rgb;
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
            showBGColorPicker
        } = this.state

        const { selectedProvider } = this.props

        return (
            <div className={cx}>
                <h3 className='content-title'>
                    Basic Income Hashtag App
                </h3>
                {showCropper && <EditImage
                    src={previewImage}
                    onEditDone={this.onEditDone}
                    onRequestClose={this.onCropperClose} />}
                <div className='preview-section'>
                    <CircularImage size={128} src={croppedImage} />
                    <div className='arrow'>
                        <i className='fa fa-arrow-right'></i>
                    </div>
                    <SVGTemplate
                        id='final-image-svg'
                        textColor={textColor}
                        semiCircleColor={semiCircleColor}
                        imageData={croppedImage} />
                    {/* <CircularImage size={128} src={croppedImage} /> */}
                </div>
                <div className='actions mt-3'>
                    <div className='btn btn-light btn-upload-local'>
                        Upload New Image
                        <i className='fa fa-cloud-upload'></i>
                        <input className='input-file' type='file' accept="image/*" name='localImage' onChange={this.onImageUpload} />
                    </div>
                    <div className='btn btn-light' onClick={this.getImageFromSocial}>
                        Use from {selectedProvider.name}
                        <i className='fa fa-facebook-f'></i>
                    </div>
                    <div
                        className='btn btn-light position-relative'
                        onClick={() => this.setState({ showBGColorPicker: true })}>
                        Change Background Color
                        <i className='fa fa-eyedropper'></i>
                        {
                            showBGColorPicker && <ColorPicker
                                color={semiCircleColor}
                                onChange={this.onSemiCircleColorChange}
                                onRequestClose={() => this.setState({ showBGColorPicker: false })} />
                        }
                    </div>
                    <div
                        className='btn btn-light position-relative'
                        onClick={() => this.setState({ showTextColorPicker: true })}>
                        Change Text Color
                        <i className='fa fa-eyedropper'></i>
                        {
                            showTextColorPicker && <ColorPicker
                                color={textColor}
                                onChange={this.onTextColorChange}
                                onRequestClose={() => this.setState({ showTextColorPicker: false })} />
                        }
                    </div>
                </div>
                <ProfileGallery
                    onImageSelect={this.onGalleryImageSelect}
                />
                <div className='final-actions actions'>
                    <div
                        className='btn btn-dark btn-large btn-download'
                        onClick={this.downloadImage}>
                        Download Image
                    </div>
                    <div
                        className={`btn btn-dark btn-large ${selectedProvider.className}`}
                        onClick={this.uploadImageToSocial}>Upload to {selectedProvider.name}</div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    selectedProvider: state.HashTag.providers[state.HashTag.selectedProvider]
})

export default connect(mapStateToProps)(HashTagContent)
