const consola = require("consola");

class ApiServer {
  constructor() {
    if (
      !!process.env.NODE_ENV ||
      ["development", "test"].includes(process.env.NODE_ENV)
    ) {
      require("dotenv").config();
      require("dotenv").config({
        path: __dirname + "../.env." + process.env.NODE_ENV,
      });
    }
    this.fastifyBuilder = require("../../api/api");
    this.fastify = null;
  }

  async up(
    port = process.env.PORT || 3001,
    host = process.env.HOST || "localhost"
  ) {
    process.once("SIGINT", () => {
      this.down();
    });

    this.fastify = await this.fastifyBuilder();
    try {
      const address = await this.fastify.listen(port, host);
      this.fastify.swagger();
      consola.success(
        `API SERVER '${`${require("os").hostname()}_${
          require("process").pid
        }`}' is listening at: ${address}`
      );
    } catch (err) {
      consola.error(err);
      process.exit(1);
    }
    return this.fastify;
  }

  async down() {
    await this.fastify.close();
  }
}

module.exports = new ApiServer();
