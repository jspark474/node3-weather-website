const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views'); //specify the path for the hbs files
const partialsPath = path.join(__dirname, '../templates/partials'); //specify the partial hbs files path

//Setup handlebars engine and views location
app.set('view engine', 'hbs'); //to set up the handlebars
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));//app.use: a way to customize the server

app.get('', (req, res) => { //setting the localhost:3000 page
    res.render('index', { //render index.hbs (extension or path is unncessary for hbs files)
        title: 'Weather',
        name: 'Andrew Mead'
    }); //to render out the handlebar file, just put the name of the file
});
app.get('/about', (req, res) => {//localhost:3000/about
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    });
})
app.get('/help', (req, res) => {//localhost:3000/help
    res.render('help', {
        message: "This is the message.",
        title: 'Help',
        name: 'Andrew Mead'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send(error);
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send(error);
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address});
        });
    });
    
})


app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    //res.send you only be used once in app.get!
    console.log(req.query);
    res.send({
        products: []
    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        Emessage: 'Help article not found.',
        title: '404 Help',
        name: 'Andrew Mead'
    })
});

app.get('*', (req, res) => { //'*' = wildcard character
    res.render('404', {
        Emessage: 'Page not found.',
        title: '404',
        name: 'Andrew Mead'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
}); //starts up the server. Go to localhost:3000 to check
