const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

// Define paths for Espress config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine amd views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Val Z'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About me',
        name: '^ me'
    })

})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help!',
        helpText: 'Here - have some help: +',
        name: "Val Z"
    })
})

app.get('/weather', (req, res) => {
    let command = req.query.adress

    if (!command) {
        return res.send({
            error: 'You must provide an adress'
        })
    }
    geocode(command, (error, {longitude, lattitude, location} = {}) => {
            if (error) {
                return res.send({error})
                }            
        // location: 'Philadelphia',
        // forecast: 'It is snowing',
        // adress: req.query.adress
        forecast(lattitude, longitude, (error, forecastData) => {
        if (error) {
            return res.send({error})
            }
                res.send({
                    forecast: forecastData,
                    location,
                    adress: command
                })
    
    
         })
    
               
    })
})

app.get('/products',(req, res) => {
    if (!req.query.search) {
        return res.send({
           error: 'You must provide search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('notFound',{
        title: 'Error',
        errorMessage: ' Help article not found',
        name: 'Val Z'
    })
})

app.get('*', (req,res)=> {
    res.render('notFound', {
        title: 'Error 404',
        errorMessage: ' Page not found',
        name: 'Val Z'
    })
})

app.listen(port, () => {
    console.log(`Server is up on ${port}.`);
})