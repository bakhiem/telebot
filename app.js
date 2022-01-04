const express = require("express");
const axios = require('axios')
const app = express();
const _ = require('lodash')

var http = require("https");
const port = process.env.PORT || 6969;

setInterval(function() {
    http.get("https://notitelebot.herokuapp.com");
}, 300000); // every 5 minutes (300000)
app.listen(port, err => {
  if (err) console.log(err);
  console.log("Server started at port " + port);
});
let oldBalanceGo = -1
let oldBalanceMatrix = -1
setInterval(() => {
  axios
  .get('https://api.bscscan.com/api?module=account&action=balance&address=0x02B1F22084ECE5962d4322c19ee0593EF345A14c&apikey=SDBDFW86Q225QFAJDYFVPIHPC4NENKCBU2')
  .then(response => {
    const balance = Number(response.data.result/1000000000000000000)
    if(balance === oldBalanceGo) {
      return
    }
    console.log('vao day bnbgo', balance)
    oldBalanceGo = balance
    if(balance > 0.5) {
      debounce_fun(balance.toFixed(3))
    }
  })
  axios
  .get('https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=0xe9e7cea3dedca5984780bafc599bd69add087d56&address=0x5a14D961B2Cd0e69e7DE0EB0F5D4E77bad64654f&tag=latest&apikey=9WVEQZK29NFBP1HFMA88VUXSVSCWEVN86T')
  .then(response => {
    let balance = Number(response.data.result/1000000000000000000)
    if(balance === oldBalanceMatrix) {
      return
    }
    console.log('vao day bscevo', balance)
    oldBalanceMatrix = balance
    if(balance > 0.05) {
      debounce_funMatrix(balance.toFixed(3))
    }
  })
}, 1500)

  var debounce_fun = _.throttle(function (balance) {
    sendMessage(`BNB go has new balance ${balance} bnb` )
  }, 60000);
  var debounce_funMatrix = _.throttle(function (balance) {
    sendMessage(`BSCEVO has new balance ${balance} bnb` )
  }, 60000);
  const sendMessage = (text) => {
    console.log(`-------vao day 3 ${text}`)

    axios
      .post('https://api.telegram.org/bot5064516047:AAF0DgEo8E1JeTnFXWBJ9ZU6bMZt4enhI1w/sendMessage', {
        chat_id: '-1001744141101',
        text
      })
  }
