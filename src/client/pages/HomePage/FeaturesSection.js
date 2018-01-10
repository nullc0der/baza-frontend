import React from 'react'
import classnames from 'classnames'



const FeatureSelection = (props)=> {
    const cx = classnames(props.className, 'features-section')

    return (
        <div className={cx}>
            <div className='container page-section'>
                <h3 className='text-center mb-2'> Baza Features </h3>
                <div className='row'>
                    <div className='col-md-4 feature-item mt-3'>
                        <div className='feature-icon'>
                            <i className='fa fa-cubes'/>
                        </div>
                        <div className='text-center'>
                            Easy entry level GPU mining of Baza to support the  network
                        </div>
                    </div>
                    <div className='col-md-4 feature-item mt-3'>
                        <div className='feature-icon'>
                            <i className='fa fa-laptop'/>
                        </div>
                        <div className='text-center'>
                            Download and store your Baza Coins on your choice of OS based computer
                        </div>
                    </div>
                    <div className='col-md-4 feature-item mt-3'>
                        <div className='feature-icon'>
                            <i className='fa fa-star-half-o'/>
                        </div>
                        <div className='text-center'>
                            Join the Baza Foundation to become a continue member and follow our progress
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeatureSelection