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

  async getAll(request, reply) {
    const items = await request.__app.couchDb.getAll("lines");
    let newItems = [];
    for (let i of items) {
      newItems.push(request.services.line.test(i));
    }
    return { count: items.length, items: newItems };
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
