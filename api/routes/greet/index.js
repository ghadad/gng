const schema = require("./greet-schema");
const greetController = require("./greet-controller");
module.exports = [
  {
    method: "GET",
    url: "/api/greet/generate",
    schema: {
      querystring: schema.querystring,
    },
    handler: greetController.generate,
  },
  {
    method: "GET",
    url: "/api/greet/query",
    schema: {
      querystring: schema.querystring,
    },
    handler: greetController.query,
  },
  {
    method: "GET",
    url: "/api/greet/props",
    handler: () => schema.querystring,
  },
  {
    method: "POST",
    url: "/api/greet",
    schema: { body: schema.body },
    handler: greetController.create,
  },
  {
    method: "DELETE",
    url: "/api/greet",
    handler: greetController.delete,
  },
  {
    method: "PUT",
    url: "/api/greet",
    schema: { body: schema.bodyJsonSchema },
    handler: greetController.update,
  },
];
