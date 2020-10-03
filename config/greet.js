const lineSchema = {
  child: { type: "boolean", mandatory: true, group: "age" },
  infant: { type: "boolean", mandatory: true, group: "age" },
  girl: { type: "boolean", mandatory: true, group: "gender" },
  boy: { type: "boolean", mandatory: true, group: "gender" },
  teen: { type: "boolean", mandatory: true, group: "age" },
  male: { type: "boolean", mandatory: true, group: "gender" },
  female: { type: "boolean", mandatory: true, group: "gender" },
  gran: { type: "boolean", mandatory: true, group: "age" },
  gramps: { type: "boolean", group: "age" },
  old: { type: "boolean", mandatory: true, group: "age" },
  wedding: { type: "boolean", group: "event" },
  sad: { type: "boolean", group: "general" },
  happy: { type: "boolean", group: "general" },
  couple: { type: "boolean", group: "gender" },
  career: { type: "boolean", group: "general" },
  love: { type: "boolean", group: "general" },
  newyear: { type: "boolean", group: "event" },
  passover: { type: "boolean", group: "event" },
  anniversary: { type: "boolean", group: "general" },
  birthday: { type: "boolean", mandatory: true, group: "event" },
  eos: { type: "boolean", mandatory: true, group: "event" },
  start: { type: "boolean", mandatory: true, group: "order" },
  end: { type: "boolean", mandatory: true, group: "order" },
};
let schema = {};
Object.keys(lineSchema).forEach((e) => {
  schema[e] = { prop: e, ...lineSchema[e] };
});

module.exports = {
  schema,
};
