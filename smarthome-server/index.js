const SerialComminucator = require("./serial-communicator");

console.log("reading data from serial port...");

const serialComminucator = new SerialComminucator({
  device: "/dev/ttyUSB0"
});

serialComminucator.setCommunicatorListener("line", "data", data => {
  console.log(data.toString("utf8"));
});
