import "dotenv/config";
import { createServer } from "http";
import app from "./app.js";

const PORT = process.env.PORT || 8080; 

const server = createServer(app);
server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});

server.on("error", (error) => {
  console.error(`Server failed to start: ${error.message}`);
});
