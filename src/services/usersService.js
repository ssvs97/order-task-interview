import User from "../models/users";

export default class UserService {
  static async findUserByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }
}
