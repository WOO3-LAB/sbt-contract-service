const express = require('express')
const bodyParser = require("body-parser");
const deploy=require('./apis/deploy')
const mint=require('./apis/mint')
const update=require('./apis/update')
const burn=require('./apis/burn')
const verify=require('./apis/verify')
const {log}=require('./utils')

const app = express()
const port = 8000

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));

app.use('/deploy', deploy)
app.use('/mint', mint)
app.use('/update', update)
app.use('/burn', burn)
app.use('/verify', verify)

app.listen(port, () => {
  log(`App listening on port ${port}`)
})

