class ConfigController {
  get(request, reply) {
    reply.send(request.__app.config);
  }
}

module.exports = new ConfigController();
