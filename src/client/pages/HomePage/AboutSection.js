import React from 'react'
import classnames from 'classnames'

class AboutSection extends React.Component {
    render() {
        const { className, id } = this.props
        const cx = classnames(className, 'about-section bg-light')

        return (
            <div className={cx} id={id}>
                <div className="container page-section">
                    <h3 className="text-center mb-3">About</h3>
                    <p>
                        Baza Foundation is a digital platform built with the
                        objective of re-imagining a nonprofit organization by
                        adapting the principles of basic income, smart
                        contracts, and secure ledger technology. Because
                        everyone needs a basic foundation.
                    </p>
                    <h4 className="text-center mb-3 mt-3">
                        What does the word Baza mean ?
                    </h4>
                    <p>
                        Baza is Esperanto for the word basic, hence basic
                        foundation. Esperanto is a spoken constructed
                        international auxiliary language created to foster peace
                        and international understanding. The word 'Esperanto'
                        translates to 'one who hopes’.
                    </p>
                </div>
            </div>
        )
    }
}

export default AboutSection
