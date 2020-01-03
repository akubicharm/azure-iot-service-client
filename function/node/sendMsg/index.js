// Get Shared access policy for service and 
// set SAS Token for AzureIoTHubConnectionString environment variables.


var Client = require('azure-iothub').Client;
var Message = require('azure-iot-common').Message;
var connectionString = process.env.AzureIoTHubConnectionString;

var client = Client.fromConnectionString(connectionString);

module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  if ((req.query.message && req.query.device) || (req.body && req.body.message && req.body.device)) {

    client.open(function (err) {
      if (err) {
        console.error('Could not connect: ' + err.message);
      } else {
        console.log('Client connected');
        // Create a message and send it to the IoT Hub every second
        var tstamp = new Date().getTime();
        var data = JSON.stringify({ message: req.query.message, timestamp: tstamp });
        var message = new Message(data);
        console.log('Sending message: ' + message.getData());
        client.send(req.query.device, message, printResultFor('send'));
        client.close();
      }
  });

      context.res = {
          // status: 200, /* Defaults to 200 */
          body: "OK"
      };
  }
  else {
      context.res = {
          status: 400,
          body: "Please pass a name on the query string or in the request body"
      };
  }
};

function printResultFor(op) {
  return function printResult(err, r) {
    if (err) {
      console.log(op + ' error: ' + err.toString());
    } else {
      console.log(op + ' status: ' + r.constructor.name);
    }
  };
};