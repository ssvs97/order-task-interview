import { isEmpty, isEmail, isMobilePhone, isLength } from "validator";

exports.isEmail = (email) => {
  return isEmail(email);
};

exports.isEmpty = (data) => {
  return !data || isEmpty(data.toString(), { ignore_whitespace: true });
};

exports.isType = (data, type) => {
  return typeof data == type;
};

exports.isMobilePhone = (phoneNumber) => {
  return isMobilePhone(phoneNumber, ["ar-EG"]);
};

exports.isLength = (data, min) => {
  return isLength(data, { min });
};

exports.sendErrorMessage = (message, status = 400) => {
  const error = new Error(message);
  error.status = status;
  throw error;
};
