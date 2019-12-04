const SerialComminucator = require("./serial-communicator");

const serialComminucator = new SerialComminucator({
  device: ""
});
serialComminucator.init();
