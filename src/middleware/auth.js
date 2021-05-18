import { verify } from "jsonwebtoken";
import { sendErrorMessage, isEmpty } from "../utils/util";
import AuthenticationService from "../services/authenticationService";

const auth = async (request, response, next) => {
  try {
    const token = request.header("Authorization");

    if (isEmpty(token)) sendErrorMessage("token required", 401);

    const decode = verify(token, process.env.JWT_PRIVATE_KEY);

    const user = await AuthenticationService.validateToken(decode._id, token);
    if (!user) sendErrorMessage("invalid token");

    request.user = user;
    request.token = token;

    next();
  } catch (error) {
    response.status(error.status).send({ error: error.message });
  }
};

export default auth;
