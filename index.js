const express = require('express')
const app = express()
var fs = require('fs')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var mongoose = require('mongoose')
var cors = require('cors')
const Txn = require('./txnSchema')
const uri = "mongodb+srv://dbUser:dbPassword@transaction-9gekk.mongodb.net/test?retryWrites=true&w=majority"
//
mongoose.connect(uri, { useNewUrlParser: true })
          .then(() => console.log("Connection successful"))
          .catch(err => console.log("Error connection: ", err))
//
app.get('/txn', cors(), (req,res) => {
  // console.log('Received GET request: ')
  Txn.find()
      .exec()
      .then(docs => {
        // console.log(docs)
        return res.send(docs)
      })
      .catch(err => err)
})
//
app.put('/txn', cors(), jsonParser, (req,res) => {
  // console.log('Received PUT request: ')
  // console.log(req.body.body)
  let txn = new Txn(req.body.body)
  txn.save()
      // .then(res => console.log(res))
      // .catch(err => console.log(err))
  res.send("Transaction PUT Request Completed")
})
//
app.listen(8081, () => {
  console.log('Transaction Server listening on port 8081!')
})
//
app.use(function (req, res, next) {
  //Website allowed to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

  //Request methods allowed
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  //Request headers allowed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  //Set to TRUE if you expect the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  //Pass to next layer of middleware
  next();
})