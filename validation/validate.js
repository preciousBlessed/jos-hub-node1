const Joi = require("joi");

// create a querySchema for validation
const createSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: ["com", "net", "hub"],
      },
    })
    .required(),
  password: Joi.string().min(4).max(4).required(),
});

const updateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: {
      allow: ["com", "net", "hub", "ng"],
    },
  }),
  age: Joi.number().min(15).max(140),
  password: Joi.string().min(4).max(4),
  transactions: Joi.object({
    transactionsCount: Joi.number(),
    transactionsHistory: Joi.array().default(Array()),
  }),
});

module.exports = {
  createSchema,
  updateSchema,
};

// console.log(module);

//auth Schema
//login
//signup
