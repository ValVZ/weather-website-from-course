const request = require('request')

const forecast = (lattitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=5a66819b8f1cc28e85e73b50a5808127&query=${longitude},${lattitude}`

    request({url, json: true}, (error, {body}) => {
        if(error) {
             callback('Unable to connect to weather services', undefined)
        } else if (body.error) {
             callback('Unable to find location', undefined)
        } else {
             callback(undefined, `${ body.current.weather_descriptions[0] }. It is currently ${body.current.temperature} degrees out. Feels like ${body.current.feelslike} degrees out` )
        }   
    })

}

module.exports = forecast