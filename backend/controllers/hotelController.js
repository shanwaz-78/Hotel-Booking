import services from "../services/index.js";
import { validateHotelBooking } from "../validation/validators.js";

const bookHotelController = (req, res) => {
  const isValidDetails = validateHotelBooking(req.body, res);
  if (isValidDetails) {
    return services.bookHotelService.bookHotelService(req.body, res);
  }
};

const getAllHotelsController = (_, res) => {
  return services.bookHotelService.getAllHotelService(res);
};

export default { bookHotelController, getAllHotelsController };
