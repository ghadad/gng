class Line {
  app;
  constructor(app) {
    this.app = app;
  }
  echo() {
    console.log("Hello from greet service");
  }
  async query(props = {}, limit = 100) {
    return await this.app.couchDb.find("lines", {
      selector: props,
      limit: limit,
    });
  }

  async generate(props = {}, limit = 100) {
    let extend = {};
    let must = this.app.lodash.pickBy(props, (v, k) => {
      if (this.app.$_.get(this.app.config.greet.schema[k], "mandatory"))
        return true;
      extend[k] = v;
    });

    let first = await this.app.couchDb.find("lines", {
      selector: { start: true, ...must },
      fields: ["line"],
      limit: 1,
    });

    const midQ = {
      start: {
        $or: [
          {
            $exists: false,
          },
          {
            $exists: true,
            $eq: false,
          },
        ],
      },
      end: {
        $or: [
          {
            $exists: false,
          },
          {
            $exists: true,
            $eq: false,
          },
        ],
      },
    };

    let middle = await this.app.couchDb.find("lines", {
      selector: { ...midQ, ...must },
      fields: ["line"],
      limit: 3,
    });

    let last = await this.app.couchDb.find("lines", {
      selector: { end: true, ...must },
      fields: ["line"],
      limit: 1,
    });

    return [...first.docs, ...middle.docs, ...last.docs];
  }
}

module.exports = (app) => new Line(app);
