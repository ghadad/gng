const sessionModel = require("../models/session");

class Session {
  constructor(app) {}
  echo() {
    console.log("Hello from session service");
  }
  async save(data) {
    //await sessionModel.createDb("Session");

    const sm = new sessionModel({
      ttl: data.ttl || 60 * 60,
      _id: data.email,
      token: data.token,
    });
    await sm.upsert();
  }
  async clear(user) {
    const sm = new sessionModel({ _id: user.email });
    await sm.delete();
  }

  async verify(user) {
    console.log("user on verify:", user);
    const sm = new sessionModel({ _id: user.email });
    await sm.get();
    return user;
  }
}

module.exports = (app) => new Session(app);
