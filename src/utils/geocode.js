const request = require('request')

const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaWd5IiwiYSI6ImNrNG9yMTQ4ajA0dmYzZm10Y3FwenlyMmIifQ.UitiQ25PVi-9fohsVvWDRA&limit=1'
    //Deconstruct the "response" object as below... 
    request({url, json: true}, (error, {body}) => {
            
            if(error) {
                    callback('Cannot connect to MapBox server.', undefined) 
            } else if(body.features.length === 0) {
                    callback('No features match your criteria.', undefined)
            }  else {
                    callback(undefined, {
                            latitude:  body.features[0].center[1],
                            longitude: body.features[0].center[0],
                            place_name: body.features[0].place_name
                    })
            }     
    })
}

module.exports = geocode