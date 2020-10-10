const CouchDb = require("../lib/dal/couchdb");
const couchDb = new CouchDb();
couchDb.connect(process.env.COUCH_URL);

const AJv = require("ajv");
const ajv = new AJv({ allErrors: true });

let validator = {};
class CouchModel {
  constructor(data, modelName, schema = {}) {
    if (validator[modelName]) this.validate = validator[modelName];
    else this.validate = validator[modelName] = ajv.compile(schema.valueOf());
    this.modelName = modelName.toLowerCase();
    this.data = Object.assign({}, data);
  }

  static async createDb(db) {
    return await couchDb.createDbIfNotExists(db.toLowerCase());
  }

  getSchema() {
    return this.validate;
  }
  validate() {
    let valid = this.validate(data);
    if (!valid) return { valid: false, errors: this.validate.errors };
    return { valid: true, errors: [] };
  }
  async create() {
    this.data.cretaed = __app.ts();
    return await couchDb.create(this.modelName, this.data).catch((e) => {
      if (e.statusCode == 409) {
        throw new Error(
          `Cannot create ${this.modelName} ${this.data._id} - allready taken`
        );
      }
    });
  }

  async upsert() {
    this.data.cretaed = __app.ts();
    return await couchDb.upsert(this.modelName, this.data);
  }

  async update() {}

  async get() {
    return await couchDb.get(this.modelName, this.data._id);
  }
  async delete() {
    return await couchDb.delete(this.modelName, this.data._id);
  }
  static async query() {}
  static async getById(db, id) {
    return await couchDb.get(db, id);
  }
}

module.exports = CouchModel;
