class ContactController {
  async save(request, reply) {
    const payload = request.body;
    let user = await request.services.user.get(request.user.email);
    user.contacts = user.contacts || [];
    let found = false;
    if (request.params.pos && user.contacts[request.params.pos]) {
      user.contacts[request.params.pos] = payload;
    } else {
      user.contacts.forEach((c) => {
        if (
          (c.email && c.email === payload.email) ||
          (c.contactName && c.contactName === payload.contactName) ||
          (c.mobileId && c.mobileId === payload.mobileId)
        ) {
          Object.assign(c, payload);
          found = true;
        }
      });
      if (!found) user.contacts.push(payload);
    }

    await request.services.user.upsert(user);
    reply.send(user);
  }

  async delete(request, reply) {
    let user = await request.services.user.get(request.user.email);
    user.contacts = user.contacts || [];
    if (user.contacts[request.params.pos]) {
      user.contacts.splice(request.params.pos, 1);
      await request.services.user.upsert(user);
      reply.send(user);
    }
  }
}

module.exports = new ContactController();
