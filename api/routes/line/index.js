const schema = require("./line-schema");
const lineController = require("./line-controller");
module.exports = [
  {
    method: "GET",
    url: "/api/line",
    schema: {
      // querystring: schema.querystring,
      response: {
        200: {
          type: "object",
          properties: {
            items: { type: "array" },
            count: { type: "integer" },
          },
        },
      },
    },
    handler: lineController.getAll,
  },
  {
    method: "GET",
    url: "/api/line/props",
    handler: () => schema.querystring,
  },
  {
    method: "POST",
    url: "/api/line",
    schema: { body: schema.body },
    handler: lineController.create,
  },
  {
    method: "DELETE",
    url: "/api/line",
    schema: { body: schema.body },
    handler: lineController.delete,
  },
  {
    method: "PUT",
    url: "/api/line",
    schema: { body: schema.bodyJsonSchema },
    handler: lineController.update,
  },
];
