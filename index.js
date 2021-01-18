const express = require('express')
const app = express()
app.use(express.json()) // for parsing application/json

const datas = require('./randomclickdata.json')
const fs = require("fs");

app.get('/datas', (req,res) => {
    res.status(200).json(datas)
})

app.get('/datas/:id', (req,res) => {
    const id = req.params.id
    const data = datas.find(data => data.id === id)
    if(data){
        res.status(200).json(data)
    }
    else {
        res.status(404).end('Not found')
    }
})

app.post('/datas', (req,res) => {
    console.log(req.body)
    datas.push(req.body)
    fs.writeFileSync("./datass.json", JSON.stringify(datas))
    res.status(200).json(datas)
})

app.put('/datas/:id', (req,res) => {
    const id = req.params.id
    let data = datas.find(data => data.id === id)
    if (data){

        datas.splice(datas.indexOf(data),1)
        datas.push(data)

        fs.writeFileSync("./datas.json", JSON.stringify(datas))
        res.status(200).json(data)
    }
    else {
        res.status(404).end('Not found')
    }

})

app.delete('/datas/:id', (req,res) => {
    const id = req.params.id
    let data = datas.find(data => data.id === id)
    if (data){
        datas.splice(datas.indexOf(data),1)
        fs.writeFileSync("./datass.json", JSON.stringify(datas))
        res.status(200).json(datas)
    }
    else{
        res.status(404).end('Not found')
    }
})

app.listen(8080, () => {
    console.log("Serveur à l'écoute")
})