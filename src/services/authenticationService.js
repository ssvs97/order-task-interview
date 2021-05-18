import User from "../models/users";
import {
  isEmpty,
  isEmail,
  isMobilePhone,
  isLength,
  sendErrorMessage,
  isType,
} from "../utils/util";
import UserService from "../services/usersService";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

export default class AuthenticationService {
  static async validateSignUp(data) {
    const { firstName, lastName, email, password, phoneNumber } = data;

    if (isEmpty(firstName)) sendErrorMessage("first name is required");
    if (isEmpty(lastName)) sendErrorMessage("last name is required");
    if (isEmpty(phoneNumber)) sendErrorMessage("phone number is required");

    this.validateEmailAndPassword(data);

    if (!isType(firstName, "string"))
      sendErrorMessage("first name must be string");
    if (!isType(lastName, "string"))
      sendErrorMessage("last name must be string");
    if (!isType(phoneNumber, "string"))
      sendErrorMessage("phone number must be string");

    if (!isEmail(email)) sendErrorMessage("invalid email");
    const user = await UserService.findUserByEmail(email);
    if (user) sendErrorMessage("email already exist");

    if (!isLength(password, 6))
      sendErrorMessage("password less than 6 characters");

    if (isMobilePhone(phoneNumber))
      sendErrorMessage(
        "invalid phone number, must contain 02 in the beginning"
      );
  }

  static async validateEmailAndPassword(data) {
    const { email, password } = data;

    if (isEmpty(email)) sendErrorMessage("email is required");
    if (isEmpty(password)) sendErrorMessage("password is required");

    if (!isType(email, "string")) sendErrorMessage("email must be string");
    if (!isType(password, "string"))
      sendErrorMessage("password must be string");
  }

  static async createUser(data) {
    try {
      await new User({
        ...data,
      }).save();
    } catch (error) {
      console.log(error);
    }
  }

  static async findByCredentials(email, password) {
    if (!isEmail(email)) sendErrorMessage("invalid email");

    const user = await UserService.findUserByEmail(email);
    if (!user) throw sendErrorMessage("email does not exist");

    const isPassword = await compare(password, user.password);
    if (!isPassword) sendErrorMessage("wrong password");

    return user;
  }

  static async generateAuthToken(user) {
    try {
      const token = sign(
        { _id: user.id.toString() },
        process.env.JWT_PRIVATE_KEY
      );
      this.saveToken(user, token);
      return token;
    } catch (error) {
      console.log(error);
    }
  }

  static async saveToken(user, token) {
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return user;
  }

  static async validateToken(_id, token) {
    const user = await User.findOne({ _id, "tokens.token": token });
    return user;
  }
}
