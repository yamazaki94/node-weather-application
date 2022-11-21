const request = require('request');

const PRIVATE_KEY_MAPBOX = 'pk.eyJ1Ijoic2hhbmxha3NoaXRoYTk0IiwiYSI6ImNsNGxrOTdsNDAzZ3QzZG5zODJtdDNhYmYifQ.mTYveDwHiLiN3PtAcVglLQ'


const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + `.json?access_token=${PRIVATE_KEY_MAPBOX}`

    request({url , json: true}, (error, { body }) => { 
        if(error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.message) {
            callback(body.message, undefined);
        } else if(body.features.length === 0) {
            callback('No result found for geo location found for the provided query.', undefined);
        } else {
            callback(undefined, {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            });
        }
        //const latitude = response.body.features[0].center[1]
        //const longitude = response.body.features[0].center[0]
    })
}

module.exports = geocode;