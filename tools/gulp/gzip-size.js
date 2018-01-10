const fs = require('fs-extra')
const Promise = require('bluebird')     //eslint-disable-line
const { run } = require('./_utils')     //eslint-disable-line

//eslint-disable-next-line
const LIST = [
    'build/**/*.{js,css}'
]

function readBundle(){
    fs.readdirSync('build/')
        .then(console.log.bind(console))
}

function getGzipSizes(){

}


function prettyPrintSizes(){

}

module.exports = function gzipReportTask(cb){
    readBundle()
        .then(getGzipSizes)
        .then(prettyPrintSizes)
}
