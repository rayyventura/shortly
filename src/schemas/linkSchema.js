import joi from "joi";

const linkSchema = joi.object({
  url: joi.string().uri().required(),
});

export default linkSchema;
