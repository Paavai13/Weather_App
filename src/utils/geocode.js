const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicGFhdmFpc2VuMTMiLCJhIjoiY2s3cjVrNHJrMDNncTNuc2ZieG13c25ocyJ9.EZl7xJQ7HvPggxlTZk_uqw&limit=1'
    request({url, json: true}, (error, {body} ) => {
        if(error){
            callback("unable to connect location services",undefined)
        }else if(body.features.length === 0){
            callback("No search results found",undefined)
        }else{
            const longitude = body.features[0].center[0]
            const latitude = body.features[0].center[1]
            const location = body.features[0].place_name
            const data = {
                longitude,
                latitude,
                location
            }
            callback(undefined,data)
        }
    })
}

module.exports = geocode