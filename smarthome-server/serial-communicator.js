"use strict";

const SerialPort = require("serialport");
const ByteLength = require("@serialport/parserbytelength");
const Readline = require("@serialport/parserreadline");

class SerialCommunicator {
  constructor({ device = null, baudRate = 9600, byteParserLenght = 8 } = {}) {
    this._options = {
      device: device,
      baudRate: baudRate,
      byteParserLenght: byteParserLenght
    };
    this._sensors = [];
    this._communicator = new SerialPort(this._options.device, {
      baudRate: this._options.baudRate
    });
    this._parsers = {
      byte: this._communicator.pipe(
        new ByteLength({ length: this._options.byteParserLenght })
      ),
      line: this._communicator.pipe(new Readline({ delimeter: "/n" }))
    };
  }

  init() {
    this._parsers.line.on("data", function(data) {
      console.log(data.toString("utf8"));
    });
  }

  setCommunicatorListener(parser, eventName, func) {
    switch (parser) {
      case "communicator":
        {
          this._communicator.on(eventName, func);
        }
        break;
      case "line":
        {
          this._parsers.line.on(eventName, func);
        }
        break;
      case "byte":
        {
          this._parsers.byte.on(eventName, func);
        }
        break;
      default: {
        this._communicator.on(eventName, func);
      }
    }
  }

  removeAllCommunicatorListeners(parser, eventName) {
    switch (parser) {
      case "communicator":
        {
          this._communicator.removeAllListeners(eventName);
        }
        break;
      case "line":
        {
          this._parsers.removeAllListeners(eventName);
        }
        break;
      case "byte":
        {
          this._parsers.removeAllListeners(eventName);
        }
        break;
      default: {
        this._communicator.removeAllListeners(eventName);
      }
    }
  }
}

module.exports = SerialCommunicator;
