import React, { Component } from 'react'
import Loader from 'components/ui/Loader'

const LoadingError = props => (
    <div>
        <h3>Cannot Load </h3>
        <p>{props.error.message}</p>
    </div>
)

export default function createAsyncComponent(getComponent, options) {
    return class LazyComponent extends Component {
        state = {
            loading: true,
            error: false,
            LoadedComponent: false
        }

        componentDidMount = () => {
            getComponent().then(mod => {
                this.setState({ loading: false, LoadedComponent: mod.default })
            }).catch(err => {
                this.setState({ loading: false, error: err })
            })
        }

        render() {
            const { error, loading, LoadedComponent } = this.state

            if (error) {
                return <LoadingError error={error} />
            }

            if (loading) {
                return <Loader />
            }

            return <LoadedComponent {...this.props} />
        }
    }
}
