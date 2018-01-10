/*global LOG_ERROR, __DEV__ */
import _ from 'lodash'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import {StaticRouter} from 'react-router'
import purify from 'purify-css'
import fs from 'fs'

import Root from '../../client/containers/Root'
import {configureStore} from '../../client/store/index'

const debug = require('debug')('baza:pre-renderer')

const allCss = fs.readFileSync(__dirname + '/server.bundle.css', 'utf-8')

const SERVER_CSS_CACHE = {};

const getCriticalCSS = (html)=> new Promise((resolve, reject)=> {
    //eslint-disable-next-line
    purify(
        html,
        allCss,
        {minify: !__DEV__},
        function(purifiedCss){
            purifiedCss ? resolve(purifiedCss) : reject(purifiedCss)
        }
    )
})

const getCacheableCriticalCss = (html, req)=> {
    debug('Cache Length: ', Object.keys(SERVER_CSS_CACHE).length)
    const key = require('url').parse(req.url).pathname;

    if (process.env.DIST_MODE === "1")
        return Promise.resolve('')

    if (_.has(SERVER_CSS_CACHE, key)){
        return Promise.resolve(SERVER_CSS_CACHE[key])
    }

    return getCriticalCSS(html).then(css => {
        SERVER_CSS_CACHE[key] = css
        return Promise.resolve(css)
    })
}

const prepareStore = ()=> {
    const store = configureStore({});
    debug('Store Prepared.')
    return Promise.resolve(store)
}


const fetchData = (store)=> {
    const dataPromises = [];

    // Process and find route data here
    return (
        Promise
        .all(dataPromises)
        .then(()=> {
            debug('Fetched data.')
            return Promise.resolve(store)
        })
    )

}

const RenderReact = (req, store)=> {
    const context = {};

    const html = ReactDOMServer.renderToString(
        <StaticRouter
            location={req.url}
            context={context}>
            <Root store={store}/>
        </StaticRouter>
    )

    debug('React Rendered')

    if (process.env.DIST_MODE === "1" || process.env.NODE_ENV === "development")
        return Promise.resolve({html, context, css: ''})

    return getCacheableCriticalCss(html,req).then(css => {
        debug('Purified CSS.')
        return Promise.resolve({html, context, css})
    })

}


const PreRenderer = (req, res, next)=> {

    const pageData = {
        title: 'Something Muse'
    }

    debug('Attempting to render: ' + req.originalUrl)

    prepareStore()
        .then(store => fetchData(store) )
        .then(store => RenderReact(req, store) )
        .then(renderPassData => {
            // Handle re-direct
            if (renderPassData.context.url){
                res.writeHead(301, {Location: renderPassData.context.url })
                res.end()
                return true
            } else {
                res.render('index', {
                    pageData: pageData,
                    html:    renderPassData.html,
                    context: renderPassData.context,
                    css: renderPassData.css
                })
                return true
            }

        }).catch(err => {
            LOG_ERROR(err)
            console.log(err)
            err.status = err.status || 500
            next(err)
        })
}

export default PreRenderer
