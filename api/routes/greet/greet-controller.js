class SubscriptionController {
  async create(request, reply) {
    const payload = request.body;
    const result = await request.__app.couchDb.create("lines", payload);
    reply.send(result);
  }

  async update(request, reply) {
    const payload = request.body;
    const result = await request.__app.couchDb.upsert("lines", payload);
    reply.send(result);
  }

  async query(request, reply) {
    let lines = await request.services.greet.query(request.query);
    return { items: lines.docs };
  }

  async generate(request, reply) {
    console.log("request.query", request.query);
    let lines = await request.services.greet.generate(request.query);
    return { lines };
  }

  async delete(request, reply) {
    const payload = request.body;
    const result = await request.__app.couchDb.delete(
      "lines",
      payload._id,
      payload._rev
    );
    reply.send(result);
  }
}

module.exports = new SubscriptionController();
