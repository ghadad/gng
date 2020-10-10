const errorSchema = require("../.common/error-schema");
const authController = require("./user-controller");
const authSchema = require("./user-schema");

module.exports = [
  {
    method: "POST",
    url: "/api/user/profile",
    schema: {
      body: authSchema.register.body,
    },
    handler: authController.register,
  },
  {
    authenticate: true,
    method: "DELETE",
    url: "/api/user/delete",
    schema: {
      response: {
        200: authSchema.delete.response[200],
        409: errorSchema.response[409],
        500: errorSchema.response[500],
      },
    },
    handler: authController.delete,
  },
];
