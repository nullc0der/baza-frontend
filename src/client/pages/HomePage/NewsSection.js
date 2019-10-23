import React from 'react'
import classnames from 'classnames'

class NewsSection extends React.Component {
    render() {
        const { className, id } = this.props
        const cx = classnames(className, 'news-section')

        return (
            <div className={cx} id={id}>
                <div className="container page-section">
                    <h3 className="text-center mb-3"> News </h3>
                    <div className="row">
                        <div className="col-md-8">Main News</div>
                        <div className="col-md-4">Other news</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsSection
