const userModel = require("../models/user");
const sessionModel = require("../models/session");
var uniqid = require("uniqid");
const EmailFactory = require("./email/email-factory");
const bcrypt = require("bcrypt");
const saltRounds = 5;

class User {
  constructor(app) {}

  echo() {
    console.log("Hello from user service");
  }

  async get(id) {
    const um = new userModel({ _id: id });
    const user = await um.get();
    return user;
  }

  async upsert(data) {
    const um = new userModel(data);
    const user = await um.upsert();
    return user;
  }

  async register(data) {
    await userModel.createDb("User");
    console.log(EmailFactory.getService());
    data._id = data.email;
    if (data.password != data.passwordConfirm)
      throw new Error("password not equals to confirmPassword");

    data.password = await bcrypt.hash(data.password, saltRounds);
    delete data.passwordConfirm;
    data.activationCode = uniqid("", Date.now());
    const user = new userModel(data);
    await user.create();

    // await codeService.generateCode(user, "user_activation", !data.is_active);

    return { success: true };
  }

  async login(data) {
    const user = await userModel.getById("user", data.email);
    const match = await bcrypt.compare(data.password, user.password);
    if (match) return this.frontUser(user);
    throw new Error("password not match .. please try again");
  }

  frontUser(user) {
    return { email: user.email, token: user.token };
  }
  sendActivationLink(data) {
    return data;
  }
}

module.exports = (app) => new User(app);
