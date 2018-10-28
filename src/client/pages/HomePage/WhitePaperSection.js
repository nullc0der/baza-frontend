import React from 'react'
import classnames from 'classnames'

export default class WhitePaperSection extends React.Component {
    state = {
        loaded: false
    }

    componentDidMount = () => {
        setTimeout(this.swapImage, 1000)
    }

    swapImage = () => {
        const swapWith = '/public/img/simran.gif'
        if (this.state.loaded) {
            return
        }

        var img = document.createElement('img')
        img.onload = () => {
            this.setState({ loaded: swapWith })
        }
        img.src = swapWith
    }

    renderImage = () => {
        const src = this.state.loaded || '/public/img/simran.jpg'
        return <img alt="" className="img-fluid" src={src} />
    }

    render() {
        const { id, className } = this.props
        const cx = classnames(className, 'white-paper-section')

        return (
            <div className={cx} id={id}>
                <div className="container page-section">
                    <div className="row align-items-center">
                        <div className="col-md-5">
                            <h4 className="section-title-underlined">
                                White Paper
                            </h4>
                            <div className="image-container d-sm-none pt-2 pb-4">
                                {this.renderImage()}
                            </div>
                            <p className="mb-3">
                                Our white paper outlines Baza Foundation, and
                                covers an array of important topics. Including,
                                how we improve our present day charity systems
                                with the use of a powerful tool that is Secure
                                Ledge Technology. Give it a read!
                            </p>
                            <div className="download-whitepaper-btn">
                                <a href="" className="btn btn-dark">
                                    Download White Paper
                                </a>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="image-container d-none d-sm-block">
                                {this.renderImage()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
