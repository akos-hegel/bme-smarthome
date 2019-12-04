const SerialComminucator = require("./serial-communicator");

console.log("reading data from serial port...");

const serialComminucator = new SerialComminucator({
  device: "/dev/ttyUSB0"
});

var sensorData = {};

serialComminucator.setCommunicatorListener("line", "data", data => {
  const splittedLine = data.split("\t");
  sensorData[splittedLine[0]] = splittedLine[1];
});

setInterval(() => console.log(sensorData), 1500);
