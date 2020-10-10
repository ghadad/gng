const path = require("path");
const mainApp = require(path.resolve(__dirname, "lib/main"));
const buildApi = async function () {
  if (
    !!process.env.NODE_ENV ||
    ["development", "test"].includes(process.env.NODE_ENV)
  ) {
    require("dotenv").config();
    require("dotenv").config({
      path: __dirname + "/../server/.env." + process.env.NODE_ENV,
    });
  }
  const multer = require("fastify-multer");
  const fastify = require("fastify")({
    logger: process.env.NODE_ENV !== "test",
  });
  const jwtOptions = require("./plugins/jwt/jwt-options");
  const oauthOptions = require("./plugins/oauth/options");
  await fastify
    .setErrorHandler(require("./errors/error-handler"))
    .register(require("middie"))
    .register(
      require("fastify-swagger"),
      require("./plugins/swagger/swagger-options")
    )
    .register(require("fastify-cookie"))
    .register(require("fastify-cors"), require("./plugins/cors/cors-options"))
    .register(require("fastify-jwt"), jwtOptions)
    .register(multer.contentParser);
  //   .register(require('./plugins/mongoose/fastify-mongoose'), require('./plugins/mongoose/mongoose-options'))
  /* .register(require('./plugins/ws/fastify-ws'), {
      jwt: jwtOptions,
      pingInterval: require('./plugins/ws/scaleout-options').pingInterval,
      scaleout: require('./plugins/ws/scaleout-options').scaleout,
      handler: require('./routes/ws/ws-handler'),
      dispatcher: require('./routes/ws/ws-dispatcher')
    })
    */
  if (
    oauthOptions.facebook &&
    oauthOptions.facebook.credentials &&
    oauthOptions.facebook.credentials.client &&
    oauthOptions.facebook.credentials.client.id
  ) {
    await fastify.register(require("fastify-oauth2"), oauthOptions.facebook);
  }
  if (
    oauthOptions.google &&
    oauthOptions.google.credentials &&
    oauthOptions.google.credentials.client &&
    oauthOptions.google.credentials.client.id
  ) {
    await fastify.register(require("fastify-oauth2"), oauthOptions.google);
  }
  if (
    oauthOptions.github &&
    oauthOptions.github.credentials &&
    oauthOptions.github.credentials.client &&
    oauthOptions.github.credentials.client.id
  ) {
    await fastify.register(require("fastify-oauth2"), oauthOptions.github);
  }
  if (
    oauthOptions.linkedin &&
    oauthOptions.linkedin.credentials &&
    oauthOptions.linkedin.credentials.client &&
    oauthOptions.linkedin.credentials.client.id
  ) {
    await fastify.register(require("fastify-oauth2"), oauthOptions.linkedin);
  }

  const __app = await mainApp.init({ env: process.env.NODE_ENV });
  const services = require("./services")(__app);
  fastify.decorate("__app", __app);
  fastify.decorate("services", require("./services")(__app));
  fastify.decorateRequest("__app", __app);
  fastify.decorateRequest("services", services);

  await fastify
    .decorate("authenticate", async (request, reply) => {
      if (request.cookies.token) {
        const user = await fastify.jwt.verify(
          request.cookies.token,
          jwtOptions
        );
        request.user = request.services.user.frontUser(user);
      } else {
        await request.jwtVerify(jwtOptions);
      }
    })
    .decorate("verifyToken", async (request, reply) => {
      await request.services.session.verify(request.user);
    })
    .decorate("admin", async (request, reply) => {
      //  const userService = require("./services/user/user-service");
      //   await userService.isAdmin(request.user.user);
    })
    .after(() => {
      // register routes
      const routes = require("./routes");
      routes.forEach((route) => {
        route.preValidation = [];
        if (route.authenticate !== false) {
          route.preValidation = [fastify.authenticate, fastify.verifyToken];
        }
        if (route.admin) {
          route.preValidation.push(fastify.admin);
        }
        fastify.route(route);
      });
    });

  return fastify;
};

module.exports = buildApi;
