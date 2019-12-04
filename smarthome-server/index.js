const SerialComminucator = require("./serial-communicator");

console.log("reading data from serial port...");

const serialComminucator = new SerialComminucator({
  device: "/tty/USB0"
});

serialComminucator.init();
