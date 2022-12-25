const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const password = (value: string, helpers) => {
  if (value.length < 8) {
    return helpers.message("password must be at least 8 characters");
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message("password must contain at least 1 letter and 1 number");
  }
  return value;
};

const phone = (value: string, helpers) => {
  if (value.substring(0, 3) != "+91") return helpers.message("Phone number does not start with +91");

  if (value.length != 13) return helpers.message("Invalid Phone number");
  return value;
};

export {objectId, password, phone};
