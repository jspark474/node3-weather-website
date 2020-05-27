const request = require('postman-request');

const forecast = (lat, long, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=7c618c80e01875ad58fae7b5f541ef23&query=" + lat + "," + long;
    request({ url, json:true}, (error, { body }) => {
        if (error){
            callback("Unable to connect to weather service", undefined);
        } else if (body.error) {
            callback("Try different location", undefined);
        } else {
            callback(undefined, "It is currently " + body.current.temperature + " degrees and it feels like " + body.current.feelslike + " degrees. The humidity is " + body.current.humidity + " %."
            );
        }
    })
}

module.exports = forecast;