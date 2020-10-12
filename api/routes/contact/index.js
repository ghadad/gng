const errorSchema = require("../.common/error-schema");
const contactController = require("./contact-controller");
const contactSchema = require("./contact-schema");

module.exports = [
  {
    method: "POST",
    url: "/api/contact",
    schema: contactSchema.save,
    handler: contactController.save,
  },
  {
    method: "PUT",
    url: "/api/contact/:pos",
    schema: {
      schema: contactSchema.save,
      response: {
        409: errorSchema.response[409],
        500: errorSchema.response[500],
      },
    },
    handler: contactController.save,
  },
  {
    authenticate: true,
    method: "DELETE",
    url: "/api/contact/:pos",
    schema: {
      response: {
        409: errorSchema.response[409],
        500: errorSchema.response[500],
      },
    },
    handler: contactController.delete,
  },
];
