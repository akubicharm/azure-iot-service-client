const express = require('express')
const bodyParser = require('body-parser');
const app = express()

svc = require('./send_c2d_messages.js')


// init parser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.post('/', (req, res) => {
  if (req.body && req.body.device && req.body.message) {
    console.log(req.body.device + " " + req.body.message);
    svc.sendMsg(req.body.device, req.body.message);
    res.send("message send");
  }
  else {
    res.status(400);
    res.send("NG");
  }
});

app.listen(8080, () => console.log('Example app listening on port 8080!'))
