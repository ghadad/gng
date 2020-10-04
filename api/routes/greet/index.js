const schema = require("./greet-schema");
const greetController = require("./greet-controller");
module.exports = [
  {
    authenticate: true,
    method: "GET",
    url: "/api/greet/generate",
    schema: {
      querystring: schema.querystring,
    },
    handler: greetController.generate,
  },
  {
    authenticate: true,
    method: "GET",
    url: "/api/greet/query",
    schema: {
      querystring: schema.querystring,
    },
    handler: greetController.query,
  },
  {
    authenticate: true,
    method: "GET",
    url: "/api/greet/props",
    handler: () => schema.querystring,
  },
  {
    authenticate: true,
    method: "POST",
    url: "/api/greet",
    schema: { body: schema.body },
    handler: greetController.create,
  },
  {
    authenticate: true,
    method: "DELETE",
    url: "/api/greet",
    handler: greetController.delete,
  },
  {
    authenticate: true,
    method: "PUT",
    url: "/api/greet",
    schema: { body: schema.bodyJsonSchema },
    handler: greetController.update,
  },
];
