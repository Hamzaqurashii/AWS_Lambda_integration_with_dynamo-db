export default {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["name", "lastName", "age", "email", "address"],
} as const;
