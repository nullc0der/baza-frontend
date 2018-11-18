import createAsyncComponent from 'utils/create-async-component'

export default createAsyncComponent(
    () => import(/* webpackChunkName: 'AdminContainer' */ './index')
)
