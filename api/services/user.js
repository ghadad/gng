const userModel = require("../models/user");
const sessionModel = require("../models/session");

const bcrypt = require("bcrypt");
const saltRounds = 5;

class User {
  constructor(app) {}
  echo() {
    console.log("Hello from user service");
  }

  async register(data) {
    await userModel.createDb("User");
    data._id = data.email;
    if (data.password != data.passwordConfirm)
      throw new Error("password not equals to confirmPassword");

    data.password = await bcrypt.hash(data.password, saltRounds);
    delete data.passwordConfirm;
    const user = new userModel(data);
    await user.create();
    // await codeService.generateCode(user, "user_activation", !data.is_active);
    return this.fronUser(user);
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
}

module.exports = (app) => new User(app);
