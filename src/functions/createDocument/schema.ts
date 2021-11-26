export default {
  type: "object",
  properties: {
    id: { type: "string" },
    firstName: { type: "string" },
    lastName: { type: "string" },
    age: { type: "string" },
    email: { type: "string" },
    address: { type: "string" },
  },
  required: [ "lastName", "age", "email", "address"],
} as const;
