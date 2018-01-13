import React, {Component} from 'react'
import classnames from 'classnames'

import uniqueId from 'lodash/uniqueId'

import s from './Carousel.scss'

export default class Carousel extends Component {
    
    constructor(props){
        super();
        this._id = uniqueId('ui-carousel-')
    }

    state = {
        activeIndex: 0
    }

    componentDidMount = ()=> {
        $('#' + this._id).carousel();
    }

    componentWillUnmount = ()=> {
        $("#" + this._id).carousel('dispose');
    }

    renderChildrenAsSlides = (child, index)=> {
        console.log('Got child', child, index)
        const className = `${child.props.className} ${index === this.state.activeIndex ? "active" : ""}`
        const cloned =  React.cloneElement(child, { className })
        console.log('Cloned', cloned)
        return cloned
    }

    render(){
        const {
            className,
            children
        } = this.props


        const id = this.props.id || this._id
        const cx = classnames(s.container, 'carousel slide', className)

        
        const _Indicators = (
            <ol className='carousel-indicators'>
                {
                    React.Children.map(children, (child, index)=> 
                        <li 
                            data-target={`#${id}`} 
                            data-slide-to={`${index}`}
                            className={ child.props.className.includes('active') ? 'active' : '' }/>
                    )
                }
            </ol>
        )

        return (
            <div className={cx} id={id}>
                {_Indicators}
                <div className='carousel-inner'>
                    {/* React.Children.map(children, this.renderChildrenAsSlides) */}
                    {children}
                </div>
                <div 
                    className='carousel-control-prev'
                    href={`#${id}`}
                    role="button"
                    data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </div>
                <div 
                    className='carousel-control-next'
                    href={`#${id}`}
                    role="button"
                    data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </div>
            </div>
        )
    }
}