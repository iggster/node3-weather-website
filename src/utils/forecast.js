const request = require('request')


const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/89f7faecbac04c65d9bce508f2473f31/'
                 + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si&lang=es'
    //You can deconstruct the "response" paramter to just use the body of the response.
    //request({url, json: true}, (error, response) => {}
    request({url:url, json: true}, (error, {body}) => {
        
        if(error) {
            callback('Cannot connect to the weather server.', undefined)
        } else if(body.error) {
            callback('Please check your weather search criteria.', undefined)
        } else {
            callback(undefined, 
                'The current temperature is '+ body.currently.temperature +'.\n'+
                'The high for today is ' + body.daily.data[0].temperatureMax + '.\n' +
                'The chance of rain is ' + body.currently.precipProbability + '.'
            )

        }

    })
}


module.exports = forecast