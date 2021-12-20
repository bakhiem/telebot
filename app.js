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
    console.log('vao day bnbgo', balance)
    if(balance === oldBalanceGo) {
      return
    }
    oldBalanceGo = balance
    if(balance != 0) {
      debounce_fun(balance.toFixed(3))
    }
  })
  axios
  .get('https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=0xe9e7cea3dedca5984780bafc599bd69add087d56&address=0x11c7ce317ea4d5d768defaff6f5183f94b3f252b&tag=latest&apikey=9WVEQZK29NFBP1HFMA88VUXSVSCWEVN86T')
  .then(response => {
    let balance = Number(response.data.result/1000000000000000000)
    balance = balance.toFixed(0)
    console.log('vao day matrix', balance)
    if(balance === oldBalanceMatrix) {
      return
    }
    oldBalanceMatrix = balance
    if(balance != 0) {
      debounce_funMatrix(balance)
    }
  })
}, 1500)

  var debounce_fun = _.throttle(function (balance) {
    sendMessage(`BNB go has new balance ${balance} bnb` )
  }, 60000);
  var debounce_funMatrix = _.throttle(function (balance) {
    sendMessage(`BUSDMATRIX has new balance ${balance} busd` )
  }, 60000);
  const sendMessage = (text) => {
    console.log(`-------vao day 3 ${text}`)

    axios
      .post('https://api.telegram.org/bot5064516047:AAF0DgEo8E1JeTnFXWBJ9ZU6bMZt4enhI1w/sendMessage', {
        chat_id: '-1001744141101',
        text
      })
  }
