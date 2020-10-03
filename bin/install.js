require("dotenv").config();
const yargs = require("yargs");

var argv = yargs.usage("Usage: $0 -e dev").option("env", {
  alias: "e",
  describe: "env code [dev|qa|prod]",
  type: "string",
  demand: true,
}).argv;

require(__dirname + "/../api/lib/main")
  .init(argv)
  .then(async (app) => {
    await app.couchDb.createDbIfNotExists("User");
    await app.couchDb.createDbIfNotExists("lines");
  })
  .catch((e) => console.log(e));
