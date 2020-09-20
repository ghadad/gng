class PingController {
  ping(request, reply, next) {
    throw "121212";
    reply.send({
      result: "pong",
    });
  }
}

module.exports = new PingController();
