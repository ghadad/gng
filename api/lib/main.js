const upath = require("upath");

const _ = require("lodash");
const moment = require("moment");
const json5 = require("json5");
const Joi = require("joi");
const os = require("os");
const pino = require("pino");
const pinoLogger = pino({
  prettyPrint: {
    colorize: false,
    translateTime: "SYS:yyyy-mm-dd HH:MM:ss.l",
    ignore: "pid,hostname",
  },
});

let __base = upath.resolve(__dirname, "../..");
let __app = {
  $_: _,
  lodash: _,
  base: __base,
  path: upath,
  bin: upath.resolve(__base, "bin"),
  lib: upath.resolve(__base, "api/lib"),
  config: require(upath.resolve(__base, "config")),
  moment: moment,
  json: json5,
  local: {},
  shortid: require("shortid"),
};
__app.utils = require(upath.resolve(__app.lib, "utils"));
__app.ts = __app.utils.ts;

__app.logger = pinoLogger;
const CouchDb = require(upath.resolve(__dirname, "dal/couchdb"));

async function bootstrap(args) {
  __app.args = args;
  __app.logger.info("server  start with:", args);

  __app.couchDb = new CouchDb();
  __app.couchDb.connect(process.env.COUCH_URL);
  __app.sysDb = new CouchDb();
  __app.sysDb.connect(process.env.COUCH_URL);

  global.__app = __app;
  return __app;
}

module.exports.init = async (args) => {
  __app.args = args;
  return await bootstrap(args).catch((e) => {
    __app.logger.error(
      "main.bootstrap ended with fatal failure see error description :"
    );
    console.error(e);
    process.exit(-1);
  });
};

__app.exit = function () {
  process.exit(exitStatus);
};
