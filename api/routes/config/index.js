const configController = require("./config-controller");

module.exports = [
  {
    method: "GET",
    url: "/api/config/get",
    handler: configController.get,
  },
];
