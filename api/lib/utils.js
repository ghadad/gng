const ts = function (format = null) {
  switch (format) {
    case "pretty-short":
      return __app.moment().format("YYYY-MM-DD HH:mm");
      break;
    case "pretty":
      return __app.moment().format("YYYY-MM-DD HH:mm:ss.SSS");
      break;
    case "timestamp":
      return __app.moment().format("YYYYMMDDHHmmss");
      break;
    case "seconds":
      return Math.floor(Date.now() / 1000);
      break;
    default:
      return Date.now();
  }
};

module.exports.ts = ts;
