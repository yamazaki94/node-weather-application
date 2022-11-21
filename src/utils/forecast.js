const request = require('request');

const PRIVATE_KEY_WEATHERSTACK = '96ed359d7686522c2e90d99733ee4992'

const getWeather = (latitude, longitude, callback) => {
    const url =`http://api.weatherstack.com/current?access_key=${PRIVATE_KEY_WEATHERSTACK}&query=${latitude},${longitude}`;
    request({url , json: true}, (error,  { body }) => { 
        if(error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback(body.error.info, undefined)
        } else {
            const msg = `${body.current.weather_descriptions[0]} weather. It is currently ${body.current.temperature} deg out. But it feels like ${body.current.feelslike} deg out.`
            callback(undefined, msg)
        }
    })

}

module.exports = getWeather;