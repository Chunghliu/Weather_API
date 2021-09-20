if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const axios = require('axios')
const { url } = require('inspector')
const app = express()

app.set("view engine", "ejs")

app.use(express.json())

app.get('/', (req, res) => {
    const url = `https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=tc`
    axios({
        url: url,
        ResponseType: 'json',
    })
    .then(data => {
        /* result = JSON.stringify(data) */
        res.render("index", {weather: data.data, icon: data.data.icon})
        if(data){
            console.log("api call successfully")
        }else{
            console.log("api call failure")
        }
    })
    .catch((err) => {console.log(err) })
})

app.listen(3000, () => {
    console.log('Server Started')
})