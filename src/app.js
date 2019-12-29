//The express library exposes a single function.
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
//Directory for static content as used by Express.
const publicDirectoryPath = path.join(__dirname, '../public')

//The following code changes the default directory where Express searches for views from
//"views" to "templates".
const viewsPath = path.join(__dirname, './templates/views')
const partialsPath = path.join(__dirname, './templates/partials')

//Setup handlebars templating engine for Express.
app.set('view engine', 'hbs')
//Set Express directory for views from default "views" to "templates" 
app.set('views', viewsPath)
//Set Express directory for static content in "public".
app.use(express.static(publicDirectoryPath))

hbs.registerPartials(partialsPath)



app.get('', (req, res) => {
        //Render here is used to send a Handlebar template.
        res.render('index', {
                title: 'Weather App',
                name: 'Igy'
        }) 
})

app.get('/help', (req, res) => {
        res.render('help', {
                title: 'Help',
                message: 'Some handy help.',
                name: 'Igy'
        })

})

app.get('/about', (req, res) => {
        res.render('about', {
                title: 'About',
                name: 'Igy'
        })
})

app.get('/weather', (req, resp) => {

        if(!req.query.address) {
               return resp.send({
                       error: 'An address must be provided!'          
                })
        }

        //Deconstruct the data object for lat, lon, placeName.
        geocode(req.query.address, (error, {latitude, longitude, place_name} = {}) => {
             
                if(error) {
                        return resp.send({
                                error
                        })
                   }
                
                   forecast(latitude, longitude, (error, forecastData) => {
                        if(error) {
                               return resp.send({
                                       error
                               }) 
                  
                        }
                       
                        resp.send({
                                place_name,
                                forecast: forecastData,
                                address: req.query.address                                
                                
                        })
                   })
        
        
        })

})

app.get('/products', (req, resp) => {
        console.log(req.query.search)

        //Note: using return in the if statement causes the function to stop execution 
        //if an error occurs and will not try to send the response twice which is an error.
        if(!req.query.search) {
               return resp.send({
                         error: 'You must provide a search term.'})     
        } 
       
        resp.send({ 
                products: []
        })
        
})


app.get('/help/*', (req, resp) => {
   resp.render('404', {
           title: 'Help not found.',
           name: 'Iggy',
           errorMessage: 'Help article not found.'
   })
})

//This helps setup a 404 page because this function only gets called
//if all of the above fail.
app.get('*', (req, resp) => {
      resp.render('404', {
             title: 'Error 404 page.',
             name: 'Iggy',
             errorMessage: 'Page not found.' 
      })

})


//Before the "get" can be used you must start the server as below.
//The listen method call can only be used once in the app. 
app.listen(3000, () => {
        console.log('Server is up on port 3000')
})

