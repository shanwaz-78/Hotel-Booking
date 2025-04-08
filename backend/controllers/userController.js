import services from "../services/index.js";
import { validateLoginDetails } from "../validation/validators.js";

const loginController = (req, res) => {
  const isDetailsValid = validateLoginDetails(req.body, res);
  if (isDetailsValid) {
    return services.userServices.loginService(req.body, res);
  }
};

export default { loginController };
