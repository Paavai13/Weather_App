const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const path = require('path')
const express = require('express')
const hbs =require('hbs')

const app = express()
const publicDirectoryPath = path.join(__dirname , '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'paavai'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'about',
        name:'paavai'
    })
})

app.get('/help',(req,res) => {
    res.render('help', {
        title:'help',
        message: 'contact www.help.com',
        name:'paavai'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error : 'Address query required'
        })
    }

    geocode(req.query.address, (error, {latitude,longitude,location}={}) => {
        if (error) {
            return res.send({
                error: "error"
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
})

app.get('/products',(req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'Request requires a search query'
        })
    }
    console.log(req.query)
    res.send({
        products : []
    })
})

app.get('/help/*',(req,res) => {
    res.render('page404',{
        title: 'help',
        name: 'paavai',
        message: 'help article is found'
    })
})

app.get('*',(req,res) => {
    res.render('page404',{
        title: '404',
        name: 'paavai',
        message: 'page not found'
    })
})

app.listen(3000,()=>{
    console.log("set up server at port 3000")
})

