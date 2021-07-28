const express = require('express') ;
const data = require('./data')

const app = express();

app.get('/api/products',(req,res)=>{
    res.send(data.products)
})
app.get('/',(req,res)=>{
    res.send('server is ready')
})
const port = process.env.PORT || 8000;
app.listen(port,()=>{
    console.log(`serve at http://localhost:${port}`)
})