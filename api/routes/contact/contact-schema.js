const S = require("fluent-schema");

const contact = S.object()
  .prop("contactName", S.string().required())
  .prop("mobileId", S.string())
  .prop("email", S.string().format(S.FORMATS.EMAIL))
  .prop("props", S.object())
  .prop(
    "events",
    S.object()
      .prop("subject", S.string().required())
      .prop("eventDate", S.boolean())
      .prop("recurring", S.boolean())
      .prop("props", S.object())
  );

module.exports = {
  save: {
    body: contact,
  },
};
