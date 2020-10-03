const queryStringJsonSchema = require("../../../config/greet").schema;
const bodyJsonSchema = {
  type: "object",
  properties: { line: { type: "string" }, ...queryStringJsonSchema },
  required: ["line"],
};

const paramsJsonSchema = {
  type: "object",
  properties: {
    par1: { type: "string" },
    par2: { type: "number" },
  },
};

const headersJsonSchema = {
  type: "object",
  properties: {
    "x-foo": { type: "string" },
  },
  required: ["x-foo"],
};

module.exports = {
  body: bodyJsonSchema,
  querystring: queryStringJsonSchema,
  params: paramsJsonSchema,
  headers: headersJsonSchema,
};
