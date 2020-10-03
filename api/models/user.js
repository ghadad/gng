const S = require("fluent-schema");
const CouchModel = require("./couchModel");

const schema = S.object()
  .prop("_id", S.string().required())
  .prop("username", S.string().required())
  .prop("email", S.string().required())
  .prop("is_active", S.boolean().required())
  .prop("is_username_set", S.boolean().required())
  .prop("is_password_set", S.boolean().required())
  .prop("avatar_url", S.string())
  .prop("connections", S.array().items(S.string()));

class User extends CouchModel {
  constructor(data) {
    super(data, "User", schema);
  }
}

module.exports = User;
