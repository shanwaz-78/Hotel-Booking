import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import express from "express";
import routes from "./routes/index.js";

const app = express();

app.use(helmet({ strictTransportSecurity: true }));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api/users", routes.userRoute);
app.use("/api/hotels", routes.hotelRoute);

export default app;
