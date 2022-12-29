const crypto = require("node:crypto");
const models = require("../models/index");

const assertValidPassword = (pass) => {
    if (pass.length < 8) {
        throw new Error("Password must be at least 8 characters long");
    }
    // validate it has one lower case letter
    if (!pass.match(/[a-z]/)) {
        throw new Error("Password must have at least one lower case letter");
    }
    // validate it has one upper case letter
    if (!pass.match(/[A-Z]/)) {
        throw new Error("Password must have at least one upper case letter");
    }
    // validate it has one number
    if (!pass.match(/[0-9]/)) {
        throw new Error("Password must have at least one number");
    }
};

const assertEmailIsValid = (email) => {
    // must validate a valid email
    const emailRegex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid = email.match(emailRegex);
    if (!isValid) {
        throw new Error("Email is invalid");
    }
};

const encryptPassword = (password) => {
    const hash = crypto
      .createHmac("sha512", "no salt for now // TODO: REALLY NEED TO ADD SALT?")
      .update(password)
      .digest("base64");
    return hash;
  };

module.exports = {
    assertValidPassword,
    assertEmailIsValid,
    encryptPassword,
};