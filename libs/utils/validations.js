import Joi from "joi";
import passwordComplexity from "joi-password-complexity";
const validate = (data) => {
    const schema = Joi.object({
        username: Joi.string().required().label("Username"),
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
        image: Joi.string().allow("").optional().label("image"),
    });
    return schema.validate(data);
};
const validate2 = (data) => {
    const schema = Joi.object({
        username: Joi.string().required().label("Username"),
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().allow("").optional().label("Password"),
        image: Joi.string().allow("").optional().label("image"),
    });
    return schema.validate(data);
};
const loginValidate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password"),
    });
    return schema.validate(data);
};

export { validate, loginValidate, validate2 };
