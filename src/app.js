const express = require('express');
const path = require('path');
const hbs = require('hbs');

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();
const port = process.env.PORT || 3000;

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views locations
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather',
        name : 'Lakshitha Kaluarachchi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About Us',
        name : 'Lakshitha Kaluarachchi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title : 'Support',
        message : 'We are here to help you 24/7.',
        name : 'Lakshitha Kaluarachchi'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title : 'Help',
        message : 'Help article not Found!',
        name : 'Lakshitha Kaluarachchi'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error : 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude,  longitude, location } = {}) => {

        if(error) {
            return res.send({
                error : error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    error : error
                })
            }
            console.log(location)
            console.log(forecastData)
            res.send({
                forecast : forecastData,
                location : location,
                address : req.query.address
            })
        })

    })


})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error : 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title : '404',
        message : 'Page not Found!',
        name : 'Lakshitha Kaluarachchi'
    })
})


app.listen(port, () => {
    console.log(`Example app listening on port ` + port)
  })