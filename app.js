const express = require("express");
const path = require("path");
const axios = require('axios')
const app = express();
const _ = require('lodash')

const port = process.env.PORT || 6969;

app.listen(port, err => {
  if (err) console.log(err);
  console.log("Server started at port " + port);
});
setInterval(() => {
  axios
  .get('https://api.bscscan.com/api?module=account&action=balance&address=0x02B1F22084ECE5962d4322c19ee0593EF345A14c&apikey=SDBDFW86Q225QFAJDYFVPIHPC4NENKCBU2')
  .then(response => {
    const balance = Number(response.data.result/1000000000000000000)
    if(balance !== 0) {
      console.log('vao day')
      debounce_fun(balance.toFixed(3))
    }
  })
}, 1500)

  var debounce_fun = _.throttle(function (balance) {
    console.log(`vao day 2 ${balance}`)
    sendMessage(`New deposit ${balance} bnb` )
  }, 60000);
  const sendMessage = (text) => {
    console.log(`vao day 3 ${text}`)

    axios
      .post('https://api.telegram.org/bot5064516047:AAF0DgEo8E1JeTnFXWBJ9ZU6bMZt4enhI1w/sendMessage', {
        chat_id: '-1001744141101',
        text
      })
  }
