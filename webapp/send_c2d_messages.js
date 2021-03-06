'use strict';

var Client = require('azure-iothub').Client;
var Message = require('azure-iot-common').Message;

var connectionString = process.env.AzureIoTHubConnectionString;
var client = Client.fromConnectionString(connectionString);

exports.sendMsg = function(dev, msg) {
  client.open(function (err) {
    if (err) {
      console.error('Could not connect: ' + err.message);
    } else {
      console.log('Client connected');
      // Create a message and send it to the IoT Hub every second
      var tstamp = new Date().getTime();
      var data = JSON.stringify({ message: msg, timestamp: tstamp });
      var message = new Message(data);
      console.log('Sending message: ' + message.getData());
      client.send(dev, message, printResultFor('send'));
    }
  });
}

// Helper function to print results in the console
function printResultFor(op) {
  return function printResult(err, res) {
    if (err) {
      console.log(op + ' error: ' + err.toString());
    } else {
      console.log(op + ' status: ' + res.constructor.name);
    }
  };
}
