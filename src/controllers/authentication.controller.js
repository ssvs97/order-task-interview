import UserService from "../services/authenticationService";

module.exports = class Authntication {
  static async signUp(request, response) {
    try {
      await UserService.validateSignUp(request.body);

      await UserService.createUser(request.body);

      response.send({ message: "sign up successfully" });
    } catch (error) {
      response.status(error.status).send({ error: error.message });
    }
  }

  static async login(request, response) {
    try {
      await UserService.validateEmailAndPassword(request.body);

      const user = await UserService.findByCredentials(
        request.body.email,
        request.body.password
      );

      const token = await UserService.generateAuthToken(user);

      return response.send({ token });
    } catch (error) {
      response.status(error.status).send({ error: error.message });
    }
  }
};
