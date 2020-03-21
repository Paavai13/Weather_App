const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url ='https://api.darksky.net/forecast/a0488c165a376cb58eb75d3c2dd2d056/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=us'
    request({url, json:true}, (error,{body}) => {
        if(error){
            callback("unable to connect locational services",undefined)
        } else if(body.error){
            callback("unable to find weather location", undefined)
        } else {
            const temp = body.currently.temperature
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')

        }
    })
}

module.exports = forecast
