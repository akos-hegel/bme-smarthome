const http = require("http");
const SerialComminucator = require("./serial-communicator");
const _ = require("lodash");
const cors = require("koa-cors");

console.log("reading data from serial port...");

const serialComminucator = new SerialComminucator({
  device: "/dev/cu.usbserial-0001"
});

var sensorData = {};

serialComminucator.setCommunicatorListener("line", "data", data => {
  const splittedLine = data.split("\t");
  sensorData[splittedLine[0]] = splittedLine[1];
});

const Koa = require("koa");
const Router = require("koa-router");
const logger = require("koa-logger");

var app = new Koa();
var router = new Router();

app.use(cors());

app.use(logger());

router.get("/sensors", (ctx, next) => {
  ctx.body = _.omit(sensorData, _.isUndefined, _.isNull);
});

app.use(router.routes()).use(router.allowedMethods());

const server = http.createServer(app.callback());
server.listen(3000, () => {
  console.log("server started on port 3000");
});
