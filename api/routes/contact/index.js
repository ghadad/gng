const errorSchema = require("../.common/error-schema");
const contactController = require("./contact-controller");
const contactSchema = require("./contact-schema");

module.exports = [
  {
    method: "POST",
    url: "/api/contact",
    schema: contactSchema.add,
    handler: contactController.add,
  },
  {
    method: "GET",
    url: "/api/contact",
    schema: {
      response: {
        409: errorSchema.response[409],
        500: errorSchema.response[500],
      },
    },
    handler: contactController.reset,
  },
  {
    method: "PUT",
    url: "/api/contact",
    schema: {
      schema: contactSchema.add,
      response: {
        409: errorSchema.response[409],
        500: errorSchema.response[500],
      },
    },
    handler: contactController.activate,
  },
  {
    authenticate: true,
    method: "DELETE",
    url: "/api/contact",
    schema: {
      response: {
        409: errorSchema.response[409],
        500: errorSchema.response[500],
      },
    },
    handler: contactController.delete,
  },
];
