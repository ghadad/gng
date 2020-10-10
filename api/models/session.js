const S = require("fluent-schema");
const CouchModel = require("./couchModel");

const schema = S.object()
  .prop("_id", S.string().required())
  .prop("token", S.string().required())
  .prop("created", S.string().required())
  .prop("ttl", S.boolean().required());

class Session extends CouchModel {
  constructor(data) {
    super(data, "Session", schema);
  }
}

module.exports = Session;
