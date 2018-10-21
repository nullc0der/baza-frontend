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
                            <p className="mb-3">
                                When donation reach the goal an automatic
                                purchase of the baza and crypto on the market
                                will be purchased then distributed to the
                                qualifying Baza account holders in the form of
                                basic income
                            </p>
                            <a href="" className="btn btn-dark">
                                Download White Paper
                            </a>
                        </div>
                        <div className="col-md-7">
                            <div className="image-container">
                                {this.renderImage()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
