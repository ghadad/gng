module.exports = function (app) {
  return {
    user: require("./user")(app),
    line: require("./line")(app),
    greet: require("./greet")(app),
  };
};
