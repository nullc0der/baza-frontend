// In watch mode, these are bundled in dll
// In production mode, these are bundled as 'vendors' commons chunk
require('react')
require('react-dom')

require('redux')
require('react-redux')

if (process.env.NODE_ENV === 'development'){
    require('react-router-dom')
}